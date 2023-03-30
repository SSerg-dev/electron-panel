import './terminate'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import { app, screen, BrowserWindow, ipcMain } from 'electron'
import { exec } from 'child_process'

import {
  execShellCommand,
  getFileName,
  log,
  getSerialDevicesInfo,
  setIPToLocalSubnet
} from './utils'
import OPCUAService from './services/OPCUAService'
import GPIOService from './services/GPIOService'
import RedisService from './services/RedisService/RedisService'
import BillValidatorController from './controllers/BillValidatorController'
import CoinAcceptorController from './controllers/CoinAcceptorController'
import BankTerminalController from './controllers/BankTerminalController'
import { pathToFileURL } from 'url'
import * as path from 'path'
import { readFileSync, writeFileSync } from 'fs'

/* ----------------------------------------------------------------------- */
let mConfig: any
let mainWindow: any
let isOPCUAConnected = false
let isCoinAcceptorConnected = false
let isBillValidatorConnected = false
let isBankTerminalConnected = false

/* ----------------------------------------------------------------------- */
/* */
const isDevelopment = process.env.NODE_ENV !== 'production'
/* */
const TAG = getFileName(__filename)

/* console.log(Array.from(("ru")).map((x) => char.ConvertFromUtf32(x + 0x1F1A5))) */
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
    isDevelopment ? 'DEV ' : 'PROD'
  }    ******************************\x1b[0m`
)
log(
  TAG,
  '\x1B[1;36m*******************************************************************************\x1b[0m'
)
console.log(' ')

/* ----------------------------------------------------------------------- */
/* */
getSerialDevicesInfo('USB').then(ports => {
  //ports.forEach( (el: any) => execShellCommand(`kill -9 $(fuser ${el.path})`))
})

/* ----------------------------------------------------------------------- */
/* */
const GPIO = new GPIOService()
GPIO.on('temperature', value => {
  log(TAG, 'Panel Temperature change =>', value)
  sendEventToView(mainWindow, 'temperature', value)
})
GPIO.on('humidity', value => {
  log(TAG, 'Panel humidity change =>', value)
  sendEventToView(mainWindow, 'humidity', value)
})

/* ----------------------------------------------------------------------- */
/* */
const opcURL =
  'opc.tcp://' +
  String(isDevelopment ? '192.168.1.2' : setIPToLocalSubnet(2)) +
  ':4840'
let OPCUAClient = new OPCUAService(opcURL)
OPCUAClient.on('change', (payload: any) => {
  isOPCUAConnected = true
  sendEventToView(mainWindow, 'OPCUA', JSON.stringify(payload))
})

/* ----------------------------------------------------------------------- */
/* */
const BillValidator = new BillValidatorController()
BillValidator.on('connect', () => (isBillValidatorConnected = true))
BillValidator.on('stacked', bill =>
  sendEventToView(mainWindow, 'banknot', bill)
)

/* ----------------------------------------------------------------------- */
/* */
const CoinAcceptor = new CoinAcceptorController()
CoinAcceptor.on('connect', () => (isCoinAcceptorConnected = true))
CoinAcceptor.on('accepted', coin => sendEventToView(mainWindow, 'coin', coin))

/* ----------------------------------------------------------------------- */
/* */
let bankTerminal = new BankTerminalController()
bankTerminal.on('connect', () => (isBankTerminalConnected = true))
bankTerminal.on('enrolled', terminal =>
  sendEventToView(mainWindow, 'emoney', terminal)
)
/* ----------------------------------------------------------------------- */
/* dev */
const redis = new RedisService()

/* ----------------------------------------------------------------------- */

const idle = async (config: any) => {
  if (
    !mConfig ||
    mConfig.type !== config.type ||
    mConfig.index !== config.index
  ) {

    OPCUAClient.start(config.type, config.index)

    // crutch :((
    ipcMain.on('async-relaunch-start', (event: any, options: any) => {
      OPCUAClient = new OPCUAService(opcURL)
      OPCUAClient.on('change', (payload: any) => {
        isOPCUAConnected = true
        sendEventToView(mainWindow, 'OPCUA', JSON.stringify(payload))
      })
      OPCUAClient.start(config.type, +options.index)
    })

  }
  /* dev hidden */
  
  /* if (config.bill_validator) {
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
  } */

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

  if (config.bank_terminal) {
    const options = {
      type: config.bank_terminal.hardware,
      number: config.index,
      currency: config.currency
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

  /* ----------------------------------------------------------------------- */
  ipcMain.on('async-relaunch-app', (event: any, options: any) => {
    // ----------------------------------
    if (options.isRelaunch) {
      app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
      app.quit()

      // app.relaunch({
      //   args: process.argv.slice(1),
      //   execPath: process.env.PORTABLE_EXECUTABLE_FILE
      // })
      // app.quit()

      // if (process.platform !== 'darwin') {
      //   app.quit()
      //   app.relaunch({ args: process.argv.slice(1).concat(['--relaunch']) })
      //   app.exit(0)
      // }
    }
    // ----------------------------------
  })
}

/* ----------------------------------------------------------------------- */
/* */
let settings: any = {}
try {
  let rawdata

  rawdata = readFileSync('./configs/settings-current.json')
  if (!rawdata.length) {
    rawdata = readFileSync('./configs/settings.json')
    log(TAG, 'SETTINGS FROM settings.json')
  }

  settings = JSON.parse(rawdata.toString())
  log(TAG, 'SETTINGS', JSON.stringify(settings))
  idle(settings)

  redis.start(settings)
  CoinAcceptor.on('current-coin', coin => redis.calcCoin(coin))
  BillValidator.on('current-bill', bill => redis.calcBill(bill))
} catch (err) {
  log(TAG, "Application dont't started, cause setting file is wrong:", err)
  setTimeout(process.exit(1), 2000)
}

/* ----------------------------------------------------------------------- */

/* */
ipcMain.on('reset', (evt, data) => {
  execShellCommand('killall login')
})

/* */
ipcMain.on('reboot', (evt, data) => {
  execShellCommand('reboot')
})

/* */
ipcMain.on('cash_enabler', (evt, data) => {
  const flag = data === 'true' ? true : false
  isBillValidatorConnected && BillValidator.enabler(flag)
  isCoinAcceptorConnected && CoinAcceptor.enabler(flag)
})

/* */
ipcMain.on('async-config-message', (evt, data) => {
  let config: any
  // log(TAG, 'Config from renderer:', data)

  writeConfig(data)

  try {
    config = JSON.parse(data)
    idle(config)
  } catch (err) {
    log(TAG, 'Get config error:', err)
  }
})

/* */
ipcMain.handle('country', async (evt, data) => {
  log(TAG, 'Data from renderer', 'Open panel door')
  /*let countries: any
	try {
		const rawdata = await readFileSync("./configs/countries.json")
		countries = JSON.parse(rawdata.toString())
	} catch (err) {
		return
	}
	const country = countries[data]
	if (country) {
		return JSON.stringify(country)
	} else {
		throw new Error("Requested country code is not present")
	}*/
})

/* */
ipcMain.on('door1', (evt, data) => {
  log(TAG, 'Data from renderer', 'Open panel door')
  GPIO.openDoor1()
})

/* */
ipcMain.on('door2', (evt, data) => {
  log(TAG, 'Data from renderer', 'Open vacuum door')
  GPIO.openDoor2()
})

/* */
ipcMain.on('OPCUA', async (evt, data) => {
  log(TAG, 'Trying to send data from renderer to B&R...')
  try {
    data = JSON.parse(data)
    const status = await OPCUAClient.send(data.node, data.value)
    log(
      TAG,
      'Data from renderer to B&R is sent:',
      `status=${status}, ${data.node} = ${data.value}`
    )
  } catch (err) {
    log(TAG, 'Send data to R&B Error:', err)
  }
})

/* ----------------------------------------------------------------------- */
/* */
app.commandLine.appendSwitch('ignore-certificate-errors', 'true')
app.commandLine.appendSwitch('disable-features', 'OutOfBlinkCors')
app.commandLine.appendSwitch('--enable-logging')

/* */
app.on('ready', () => {
  createWindow()
  log(TAG, 'Created window')

  app.on('activate', function() {
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
  const externalDisplay = displays.find(display => {
    const { width, height } = display.size;
    return width < height && display.bounds.x !== 0 || display.bounds.y !== 0
  })
  const { width, height } = screen.getPrimaryDisplay().size

  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      contextIsolation: false,
    },
    x: isDevelopment ? externalDisplay?.bounds.x : 0,
    y: isDevelopment ? externalDisplay?.bounds.y : 0,
    frame: false,
    show: true
  })

  if (isDevelopment) {
    mainWindow.loadURL(process.env.WEBPACK_DEV_SERVER_URL as string)
  } else {
    createProtocol('app')
    mainWindow.loadURL('app://./index.html')
  }
  //log(TAG, process.env.WEBPACK_DEV_SERVER_URL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show()
    exec(
      "xinput -set-prop 6 'Coordinate Transformation Matrix' 0 1 0 -1 0 1 0 0 1"
    )
    sendEventToView(mainWindow, 'settings', JSON.stringify(settings))
  })

  mainWindow.webContents.openDevTools()

  mainWindow.webContents.on('did-finish-load', () => {
    sendEventToView(mainWindow, 'settings', JSON.stringify(settings))
  })
} // end createWindow

const sendEventToView = (view: any, evt: string, data: string) => {
  view && view !== null && view.webContents.send(evt, data)
}
function toUpperCase(arg0: string) {
  throw new Error('Function not implemented.')
}

function writeConfig(data: any) {
  writeFileSync('./configs/settings-current.json', data)   
}
