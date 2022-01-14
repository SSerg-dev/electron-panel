/**
 * Command.ts
 *
 * @copyright 2021 Alles Good
 *
 */
import { SYNC } from './Constants'

/**
 * Class Command
 *
 * An abstract class of device command logic.
 *
 * @version 1.0.0
 */
class Command {
  cmd: number
  device: any

  /**
   * Command constructor.
   *
   * @param {Number} cmd
   * @param {Object} device
   */
  constructor(cmd: number, device: any) {
    /* Command code. */
    this.cmd = cmd
    /* Parent device object. */
    this.device = device
  }

  /* Logics methods -------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Preparing command to send.
   *
   * @param {Any} params
   */
  request = (params: any = Buffer.from([])): Buffer =>
    this.assemble(Buffer.from(params))

  /**
   * Processing command response.
   *
   * @param {Buffer} data
   */
  response = (data: Buffer): any => data

  /* Utils methods --------------------------------------------------------- */
  /* ----------------------------------------------------------------------- */

  /**
   * Assemble command packet.
   *
   * @param {Buffer} params
   */
  assemble = (params: Buffer = Buffer.from([0])) => {

    let cmd = Buffer.concat([
      Buffer.from([SYNC, this.device.adr]),
      Buffer.from([params.length + 6]),
      Buffer.from([this.cmd])
    ])
    
    console.log('cmd-->', cmd) // cmd--> <Buffer 02 04 06 30>
    
    if (params.length) {
      cmd = Buffer.concat([cmd, params])
    }
    /* Assemble full packet data. */
    let result = Buffer.concat([cmd, this.device.getCRC16(cmd)])
    console.log('++assemble result-->', result) // ++assemble result--> <Buffer 02 04 06 30 44 3f> 

    return  result
  }
}

export default Command 
