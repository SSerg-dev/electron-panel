/**
 * index.ts
 * 
 * @copyright 2021 Alles Good
 * 
 */

//  import Ack from './Ack'
import Download from './Download'
//  import EnableBillTypes from './EnableBillTypes'
//  import ExtractBarcodeData from './ExtractBarcodeData'
//  import GetBillTable from './GetBillTable'
//  import GetCRC32OfTheCode from './GetCRC32OfTheCode'
import GetStatus from './GetStatus'
//  import Hold from './Hold'
//  import Identification from './Identification'
//  import Nak from './Nak'
import Poll from './Poll'
//  import RequestStatistics from './RequestStatistics'
import Reset from './Reset'
import Return from './Return'
//  import SetBarcodeParameters from './SetBarcodeParameters'
import SetSecurity from './SetSecurity'
import Stack from './Stack'
 
 export default (device: any) => {
     return {
        //  Ack: new Ack(device),
        Download : new Download(device),
        //  EnableBillTypes : new EnableBillTypes(device),
        //  ExtractBarcodeData : new ExtractBarcodeData(device),
        //  GetBillTable : new GetBillTable(device),
        //  GetCRC32OfTheCode : new GetCRC32OfTheCode(device),
        GetStatus : new GetStatus(device),
        //  Hold : new Hold(device),
        //  Identification : new Identification(device),
        //  Nak : new Nak(device),
        Poll : new Poll(device),
        //  RequestStatistics : new RequestStatistics(device),
        Reset : new Reset(device),
        Return : new Return(device),
        //  SetBarcodeParameters : new SetBarcodeParameters(device),
        SetSecurity : new SetSecurity(device),
        Stack : new Stack(device)
     }
 }
 
 /* End of file index.ts */
