import { exec } from "child_process"
import { EventEmitter } from 'events'
import { wait } from '../utils'

const DOOR_1 = 17 //gpio17
const DOOR_2 = 18 //gpio18
const INPUT = "in", OUTPUT = "out"
const HIGH = 1, LOW = 0

class GPIOService extends EventEmitter {
    door1: boolean = false
    door2: boolean = false
    tp: number = 0
    hm: number = 0

    constructor() {
        super()
        this.idleLoop()
        this.gpioInit()
    }

    private gpioInit = async () => {
        try {
            await this.pinMode(DOOR_1, OUTPUT)
            await this.digitalWrite(DOOR_1, LOW)
        } catch(err) {}
        try {
            await this.pinMode(DOOR_2, OUTPUT)
            await this.digitalWrite(DOOR_2, LOW)
        } catch(err) {}
    }

    private pinMode = (pin: number, dir: string) => new Promise<any>((resolve, reject) => {
        let cmd = `echo "${pin}" > /sys/class/gpio/unexport`
        //console.log(cmd)
        exec(cmd, () => {
            cmd = `echo "${pin}" > /sys/class/gpio/export`
            //console.log(cmd)
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    //console.error(`exec error: ${error}`)
                    reject(error)
                }
                //stdout && console.log(`stdout: ${stdout}`)
                //stderr && console.error(`stderr: ${stderr}`)
                cmd = `echo "${dir}" > /sys/class/gpio/gpio${pin}/direction`
                //console.log(cmd)
                exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        //console.error(`exec error: ${error}`)
                        reject(error)
                    }
                    //stdout && console.log(`stdout: ${stdout}`)
                    //stderr && console.error(`stderr: ${stderr}`)
                    resolve()
                })
            })
        })
    })

    private digitalWrite = (pin: number, val: number) => new Promise<any>((resolve, reject) => {
        let cmd = `echo "${val}" > /sys/class/gpio/gpio${pin}/value`
        //console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                //console.error(`exec error: ${error}`)
                reject(error)
            }
            //stdout && console.log(`stdout: ${stdout}`)
            //stderr && console.error(`stderr: ${stderr}`)
            resolve()
        })
    })

    private digitalRead = (pin: number, val: number) => new Promise<any>((resolve, reject) => {
        let cmd = `cat /sys/class/gpio/gpio${pin}/value`
        //console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                //console.error(`exec error: ${error}`)
                reject(error)
            }
            //stdout && console.log(`stdout: ${stdout}`)
            //stderr && console.error(`stderr: ${stderr}`)
            resolve(stdout)
        })
    })

    // 1. Put your dht11-overlay.dtb @ /boot/overlays/
    // 2. Add "dtoverlay=dht11,gpiopin=27" in /boot/config.txt
    // 3. Connect DHT21 sensor with 3.3V, GND, and GPIO27 on Pi
    // 4. Reboot Pi, and use lsmod to see following modules
    // - industrialio.ko
    // - kfifo_buf.ko
    // - dht11.ko
    // 5. I can see the iio folder appeared at "/sys/devices/platform/dht11@1b/iio:device0/"
    private read_am2301_tp = () => new Promise<any>((resolve, reject) => {
        let cmd = "cat /sys/devices/platform/dht11@1b/iio\:device0/in_temp_input"
        //console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
                //console.error(`exec error: ${error}`);
                reject(error)
            }
            //stdout && console.log(`stdout: ${stdout}`);
            //stderr && console.error(`stderr: ${stderr}`);
            if ( /\d/.test(stdout) ) {
                const parsed = Math.ceil(parseInt(stdout, 10)/1000)
                if ( parsed !== this.tp ) {
                    this.tp = parsed
                    this.emit("temperature", this.tp)
                }
            }
            resolve(this.tp)
        })
    })

    private read_am2301_hm = () => new Promise<any>((resolve, reject) => {
        let cmd = "cat /sys/devices/platform/dht11@1b/iio\:device0/in_humidityrelative_input"
        //console.log(cmd)
        exec(cmd, (error, stdout, stderr) => {
            if (error) {
               // console.error(`exec error: ${error}`);
                reject(error)
            }
            //stdout && console.log(`stdout: ${stdout}`);
            //stderr && console.error(`stderr: ${stderr}`);
            if ( /\d/.test(stdout) ) {
                const parsed = Math.ceil(parseInt(stdout, 10)/1000)
                if ( parsed !== this.hm ) {
                    this.hm = parsed
                    this.emit("humidity", this.hm)
                }
            }
            resolve(this.hm)
        })
    })

    private idleLoop = async () => {
        try {
            await this.read_am2301_tp()
        } catch(err) {}
        try {
            await this.read_am2301_hm()
        } catch(err) {}
        await wait(1000)
        this.idleLoop()
    }

    public openDoor1 = async () => {
        if ( this.door1 === true ) return
        this.door1 = true
        try {
            await this.digitalWrite(DOOR_1, HIGH)
            await wait(5000)
            await this.digitalWrite(DOOR_1, LOW)
        } catch(err) {}
        this.door1 = false
    }

    public openDoor2 = async () => {
        if ( this.door2 === true ) return
        this.door2 = true
        try {
            await this.digitalWrite(DOOR_2, HIGH)
            await wait(5000)
            await this.digitalWrite(DOOR_2, LOW)
        } catch(err) {}
        this.door2 = false
    }

}

export default GPIOService
