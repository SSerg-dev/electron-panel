import { exec } from 'child_process'
import { format } from 'date-fns'
import { networkInterfaces } from 'os'

const serialport = require('serialport')

export const getFileName = (filename: string) => {
  return filename!
    .split(/[\\/]/)!
    .pop()!
    .toUpperCase() //split('.'))[0]
}

const colors = {
  reset: '\x1b[0m',
  thin: {
    white: '\x1B[0;37m',
    red: '\x1B[0;31m',
    yellow: '\x1B[0;33m',
    green: '\x1B[0;32m'
  },
  bold: {
    white: '\x1B[1;37m',
    red: '\x1B[1;31m',
    yellow: '\x1B[1;33m',
    green: '\x1B[1;32m'
  }
}

export const log = function(from: any = '', text: any = '', data: any = '') {
  const sDate = format(new Date(), 'dd.MM.yy HH:mm:ss')
  const sFrom = '[' + String(from || '') + ']'
  const sText = String(text || '').trim()
  const sData = data
    ? typeof data === 'object'
      ? JSON.stringify(data)
      : data
    : ''
  console.log(
    colors.thin.red + sDate,
    colors.bold.white + sFrom,
    colors.thin.yellow + sText,
    colors.thin.green + sData,
    colors.reset
  )
}

export const wait = (ms: number) =>
  new Promise((res: any) => setTimeout(res, ms))

export const getLocalIP = (): string => {
  let ret
  try {
    ret = networkInterfaces()['eth0'][0]['address'] || '192.168.1.100'
  } catch (err) {
    ret = '192.168.1.100'
  }
  return ret
}

export const setIPToLocalSubnet = (num: number | string): string =>
  getLocalIP()
    .split('.')
    .slice(0, -1)
    .concat(String(num))
    .join('.')

export const execShellCommand = (cmd: string) => {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        //console.warn(error);
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

export const getSerialDevicesInfo = async (toSearch: string) => {
  let portInfo
  try {
    const SerialPort = serialport.SerialPort

    portInfo = await SerialPort.list()
    portInfo = portInfo.filter((port: any) => port.pnpId !== undefined)
    return portInfo.filter((port: any) => port.path.indexOf(toSearch) > -1)
  } catch (err) {
    console.log('SerialPort list Error:', err)
    return []
  }
}


/* export const setControllerTime = async (dateTime: string) => {
  const dateTimeString = dateTime
  const timestamp = new Date(dateTimeString).getTime() / 1000

  exec(`sudo date -u --date=@${timestamp}`, (error, stdout, stderr) => {
    if (stderr) {
      console.error(`Error setting system date and time: ${stderr}`)
      return
    }
    const sDate = format(new Date(), 'dd.MM.yy HH:mm:ss')
    console.log('System date and time set successfully.', stdout, sDate)
    
  })

} */ 

