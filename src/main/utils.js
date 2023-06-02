import { exec } from 'child_process'
import { format } from 'date-fns'
import { networkInterfaces } from 'os'
import { chmod } from 'fs'

import { SerialPort } from 'serialport'

export const getFileName = (filename) => {
  return filename.split(/[\\/]/).pop().toUpperCase() //split('.'))[0]
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

export const log = (from = '', text = '', data = '') => {
  const sDate = format(new Date(), 'dd.MM.yy HH:mm:ss')
  const sFrom = '[' + String(from || '') + ']'
  const sText = String(text || '').trim()
  const sData = typeof data === 'object' ? JSON.stringify(data) : data
  console.log(
    colors.thin.red + sDate,
    colors.bold.white + sFrom,
    colors.thin.yellow + sText,
    colors.thin.green + sData,
    colors.reset
  )
}

export const wait = (ms) => new Promise((res) => setTimeout(res, ms))

export const getLocalIP = () => {
  let ret
  try {
    ret = networkInterfaces()['eth0'][0]['address'] || '192.168.1.100'
  } catch (err) {
    ret = '192.168.1.100'
  }
  return ret
}

export const execShellCommand = (cmd) => {
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        // console.warn(error);
      }
      resolve(stdout ? stdout : stderr)
    })
  })
}

export const getSerialDevicesInfo = async (toSearch) => {
  let portInfo = []
  try {
    portInfo = await SerialPort.list()
    //const info = portInfo.filter((port) => port.pnpId !== undefined)
    portInfo = portInfo.filter((port) => port.path.includes(toSearch))
  } catch (err) {
    console.log('SerialPort list Error:', err) 
  }
  return portInfo
}

