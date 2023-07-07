import './terminate'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { app, screen, BrowserWindow, protocol, ipcMain } from 'electron'
import { readFileSync, writeFileSync } from 'fs'
import { fs, chmod, constants } from 'fs'

import {
  execShellCommand,
  getFileName,
  log,
  getSerialDevicesInfo,
  wait,
  delay,
  permitAccess,
} from './utils'

import GPIOService from './services/GPIOService'
import OPCUAService from './services/OPCUAService'
import DataService from './services/DataService/DataService'
import BillValidatorController from './controllers/BillValidatorController'
import CoinAcceptorController from './controllers/CoinAcceptorController'
import BankTerminalController from './controllers/BankTerminalController'

/* ----------------------------------------------------------------------- */
let mConfig = null
let settings = null
let mainWindow = null
let isOPCUAConnected = false
let isCoinAcceptorConnected = false
let isBillValidatorConnected = false
let isBankTerminalConnected = false

/* ----------------------------------------------------------------------- */
const TAG = getFileName(__filename)

/* ----------------------------------------------------------------------- */
const isDev = process.env.NODE_ENV !== 'production'

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } },
])

/* ----------------------------------------------------------------------- */
console.log(' ')
console.log(' ')
console.log(' ')
log(
  TAG,
  '\x1B[1;36m*******************************************************************************\x1b[0m'
)
log(
  TAG,
  '\x1B[1;36m**************************** - START ALLES PANEL - ****************************\x1b[0m'
)
log(
  TAG,
  '\x1B[1;36m*******************************************************************************\x1b[0m'
)
log(
  TAG,
  `\x1B[1;36m****************************     MODE IS ${
    isDev ? 'DEV ' : 'PROD'
  }    ******************************\x1b[0m`
)
log(
  TAG,
  '\x1B[1;36m*******************************************************************************\x1b[0m'
)
console.log(' ')

/* ----------------------------------------------------------------------- */
/* */
getSerialDevicesInfo('USB').then((ports) => {
  if (ports.length) {
    log(TAG, 'Serial Devices:')
    ports.forEach((el) => {
      log(TAG, JSON.stringify(el.path))

      // permitAccess(el.path)
      // execShellCommand(`kill -9 $(fuser ${el.path})`)
    })
  }
})

/* ----------------------------------------------------------------------- */
/* */
const GPIO = new GPIOService()
GPIO.on('temperature', (value) => {
  log(TAG, 'Panel Temperature change =>', value)
  sendEventToView(mainWindow, 'temperature', value)
})
GPIO.on('humidity', (value) => {
  log(TAG, 'Panel humidity change =>', value)
  sendEventToView(mainWindow, 'humidity', value)
})

/* ----------------------------------------------------------------------- */

const opcURL = 'opc.tcp://192.168.1.2:4840/'
let OPCUAClient = new OPCUAService(opcURL)

/* leodimark */
/* OPCUAClient.on('change', (payload) => {
  isOPCUAConnected = true
  sendEventToView(mainWindow, 'OPCUA', JSON.stringify(payload))
}) */

/* dev */
ipcMain.on('async-payload-start', (event, options) => {
  if (options.isPayload) {
    OPCUAClient.on('change', (payload) => {
      isOPCUAConnected = true
      sendEventToView(mainWindow, 'OPCUA', JSON.stringify(payload))
    })
    const params = {
      isPayloadReply: true,
      index: mConfig.index,
    }
    event.sender.send('async-payload-reply', params)
  }
})
/*     */

/* ----------------------------------------------------------------------- */
/* */
const BillValidator = new BillValidatorController()
BillValidator.on('connect', () => (isBillValidatorConnected = true))
BillValidator.on('stacked', (bill) => {
  sendEventToView(mainWindow, 'banknote', bill)
})
/* ----------------------------------------------------------------------- */
/* */
const CoinAcceptor = new CoinAcceptorController()
CoinAcceptor.on('connect', () => (isCoinAcceptorConnected = true))
CoinAcceptor.on('accepted', (coin) => sendEventToView(mainWindow, 'coin', coin))

/* ----------------------------------------------------------------------- */
/* */
const bankTerminal = new BankTerminalController()
bankTerminal.on('connect', () => (isBankTerminalConnected = true))
bankTerminal.on('enrolled', (terminal) =>
  sendEventToView(mainWindow, 'emoney', terminal)
)

/* ----------------------------------------------------------------------- */
/* */

const loadConfig = async () => {
  try {
    let rawdata = readFileSync('./configs/settings-current.json', 'utf-8')
    // let rawdata = readFileSync('/alles/panel/configs/settings-current.json', 'utf-8')

    if (!rawdata.length) {
      rawdata = readFileSync('./configs/settings-default.json', 'utf-8')
      // rawdata = readFileSync('/alles/panel/configs/settings-default.json', 'utf-8')
      log(TAG, 'SETTINGS FROM settings-default.json')
    }

    const settings = JSON.parse(rawdata.toString())
    log(TAG, 'SETTINGS', JSON.stringify(settings))

    return settings
  } catch (err) {
    log(TAG, 'loadConfig():', err)
    return err
  }
}

/* ----------------------------------------------------------------------- */
/* */
const saveConfig = async (data) => {
  try {
    writeFileSync('./configs/settings-current.json', data)
    // writeFileSync('/alles/panel/configs/settings-current.json', data)
  } catch (err) {
    log(TAG, 'saveConfig():', err)
    return err
  }
}

/* ----------------------------------------------------------------------- */
/* */
const startup = async (config) => {
  if (
    !mConfig ||
    mConfig.type !== config.type ||
    mConfig.index !== config.index
  ) {
    OPCUAClient.start(config.type, config.index)

    /* dev */
    // crutch :((
    ipcMain.on('async-relaunch-start', (event, options) => {
      OPCUAClient.on('change', (payload) => {
        isOPCUAConnected = true
        sendEventToView(mainWindow, 'OPCUA', JSON.stringify(payload))
      })
      OPCUAClient.start(config.type, +options.index)
    })
  }

  /* ----------------------------------------------------------------------- */
  /* */

  // console.log('$$ background.js: 204 config.coin_acceptor')

  if (config.coin_acceptor) {
    if (
      !mConfig ||
      mConfig.coin_acceptor.installed !== config.coin_acceptor.installed
    ) {
      if (config.coin_acceptor.installed === true) {
        CoinAcceptor.start(config.currency, config.coin_acceptor.enable_coins)
      } else {
        isCoinAcceptorConnected && CoinAcceptor.stop()
      }
    }
  }

  /* ----------------------------------------------------------------------- */
  /* */

  delay(4000)

  // console.log('$$ background.js: 224 bill_validator')

  if (config.bill_validator) {
    if (
      !mConfig ||
      mConfig.bill_validator.installed !== config.bill_validator.installed
    ) {
      if (config.bill_validator.installed === true) {
        BillValidator.start(0, config.bill_validator.enable_bills)
      } else {
        isBillValidatorConnected && BillValidator.stop()
      }
    }
  }

  /* ----------------------------------------------------------------------- */
  /* */
  if (config.bank_terminal) {
    const options = {
      type: config.bank_terminal.hardware,
      number: config.index,
      currency: config.currency,
    }

    if (
      !mConfig ||
      mConfig.bank_terminal.installed !== config.bank_terminal.installed
    ) {
      if (config.bank_terminal.installed === true) {
        bankTerminal.start(options)
      } else {
        isBankTerminalConnected && bankTerminal.stop()
      }
    }
  }

  mConfig = config
}
/* ----------------------------------------------------------------------- */

// initUSBDevices

/* ----------------------------------------------------------------------- */

const data = new DataService()

/* Main */
;(async () => {
  try {
    settings = await loadConfig()
    startup(settings)
    data.start(settings)
    CoinAcceptor.on('current-coin', (coin) => data.calcCoin(coin))
    BillValidator.on('current-bill', (bill) => data.calcBill(bill))
  } catch (err) {
    log(TAG, "Application dont't started, cause setting file is wrong:", err)
    setTimeout(() => {
      process.exit(1)
    }, 2000)
  }
})()

/* ----------------------------------------------------------------------- */
/* Electron */
app.commandLine.appendSwitch('ignore-certificate-errors')
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
app.commandLine.appendSwitch('in-process-gpu')
app.commandLine.appendSwitch('ignore-gpu-blacklist')
app.commandLine.appendSwitch('enable-logging')

/* ----------------------------------------------------------------------- */
/* Helpers */
const sendEventToView = (view, evt, data) => {
  view && view !== null && view.webContents.send(evt, data)
}

/* ----------------------------------------------------------------------- */
/* Messages from Renderer*/

/* */
ipcMain.on('reset', (evt, data) => {
  log(TAG, '"reset" from renderer')
  execShellCommand('killall login')
})

/* */
ipcMain.on('reboot', (evt, data) => {
  log(TAG, '"reboot" from renderer')
  execShellCommand('reboot')
})

/* */
ipcMain.on('cash_enabler', (evt, data) => {
  log(TAG, '"cash_enabler" from renderer', data)
  const flag = data === 'true' ? true : false
  isBillValidatorConnected && BillValidator.enabler(flag)
  isCoinAcceptorConnected && CoinAcceptor.enabler(flag)
})

/* */
ipcMain.on('async-config-message', async (evt, data) => {
  // log(TAG, '"save new config data" from renderer', data)
  try {
    await saveConfig(data)
    const config = JSON.parse(data)
    startup(config)
  } catch (err) {
    log(TAG, 'Get config error:', err)
  }
})

/* */
ipcMain.on('door1', (evt, data) => {
  log(TAG, '"open door #1" from renderer')
  GPIO.openDoor1()
})

/* */
ipcMain.on('door2', (evt, data) => {
  log(TAG, '"open door #2" from renderer')
  GPIO.openDoor2()
})

/* */
ipcMain.on('OPCUA', async (evt, data) => {
  log(TAG, 'Trying to send data from renderer to B&R...', JSON.stringify(data))
  try {
    data = JSON.parse(data)
    const status = await OPCUAClient.send(data.node, data.value)
    log(TAG, 'Data sent:', `status=${status}, ${data.node} = ${data.value}`)
  } catch (err) {
    log(TAG, 'Send data to R&B Error:', err)
  }
})

/* */
ipcMain.on('', (event, options) => {
  log(TAG, '"async-relaunch-app" from renderer', options)
  if (options.isRelaunch) {
    app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
    app.quit()
  }
})

ipcMain.handle('settings', async (event, options) => {
  log(TAG, '"settings" from renderer', options)
  return JSON.stringify(settings)
})

/* ----------------------------------------------------------------------- */
/* Create Main Window */
/* */
app.on('ready', () => {
  createWindow()
  log(TAG, 'Created window')

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

/* */
const createWindow = () => {
  // Create the browser window.
  const displays = screen.getAllDisplays()
  // console.log(displays)
  const externalDisplay = displays.find((display) => {
    const { width, height } = display.size
    return (width < height && display.bounds.x !== 0) || display.bounds.y !== 0
  })
  //const { width, height } = screen.getPrimaryDisplay().size

  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    //x: isDev && externalDisplay && externalDisplay.bounds ? externalDisplay.bounds.x : 0,
    //y: isDev && externalDisplay && externalDisplay.bounds ? externalDisplay.bounds.y : 0,
    x: 3840, //externalDisplay.bounds.x,
    y: 0,
    frame: false,
    show: false,
  })

  if (isDev) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    mainWindow.webContents.openDevTools()
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // ------------------------------------
  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize()
    mainWindow.show()
    execShellCommand(
      "xinput -set-prop 6 'Coordinate Transformation Matrix' 0 1 0 -1 0 1 0 0 1"
    )
    //sendEventToView(mainWindow, 'settings', JSON.stringify(settings))
  })

  mainWindow.webContents.on('did-finish-load', () => {
    //sendEventToView(mainWindow, 'settings', JSON.stringify(settings))
  })
  // -----------------------------------
} // end createWindow
