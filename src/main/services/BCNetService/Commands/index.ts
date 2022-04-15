/**
 * index.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

import Ack from './Ack'
import GetStatus from './GetStatus'
import Identification from './Identification'
import Nak from './Nak'
import Poll from './Poll'
import Reset from './Reset'
import SetSecurity from './SetSecurity'
import Request from './Request'
// 
 
 export default (device: any) => {
     return {
        Ack: new Ack(device),
        GetStatus : new GetStatus(device),
        Identification : new Identification(device),
        Nak : new Nak(device),
        Poll : new Poll(device),
        Reset : new Reset(device),
        SetSecurity : new SetSecurity(device),
        Request : new Request(device),
     }
 }
 
 /* End of file index.ts */
