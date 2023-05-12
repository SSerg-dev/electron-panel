import { exec } from "child_process"
import { EventEmitter } from 'events'
import { wait } from '../utils'

const DOOR_1 = 17 //gpio17
const DOOR_2 = 18 //gpio18
const INPUT = "in", OUTPUT = "out"
const HIGH = 1, LOW = 0

class GPIOService extends EventEmitter {
    constructor() {
        super()
        this.door1 = false
        this.door2 = false
        this.tp = 0
        this.hm = 0
        this.idleLoop()
        this.gpioInit()
    }

    async gpioInit() {
        try {
            await this.pinMode(DOOR_1, OUTPUT)
            await this.digitalWrite(DOOR_1, LOW)
        } catch(err) {}
        try {
            await this.pinMode(DOOR_2, OUTPUT)
            await this.digitalWrite(DOOR_2, LOW)
        } catch(err) {}
    }

    pinMode(pin, dir) {
        return new Promise((resolve, reject) => {
            let cmd = `echo "${pin}" > /sys/class/gpio/unexport`
            exec(cmd, () => {
                cmd = `echo "${pin}" > /sys/class/gpio/export`
                exec(cmd, (error, stdout, stderr) => {
                    if (error) {
                        reject(error)
                    }
                    cmd = `echo "${dir}" > /sys/class/gpio/gpio${pin}/direction`
                    exec(cmd, (error, stdout, stderr) => {
                        if (error) {
                            reject(error)
                        } 
                        resolve(true)
                    })
                })
            })
        })
    }

    digitalWrite(pin, val) {
        return new Promise((resolve, reject) => {
            let cmd = `echo "${val}" > /sys/class/gpio/gpio${pin}/value`
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
                resolve(true)
            })
        })
    }

    digitalRead(pin, val) {
        return new Promise((resolve, reject) => {
            let cmd = `cat /sys/class/gpio/gpio${pin}/value`
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
                resolve(stdout)
            })
        })
    }

    // 1. Put your dht11-overlay.dtb @ /boot/overlays/
    // 2. Add "dtoverlay=dht11,gpiopin=27" in /boot/config.txt
    // 3. Connect DHT21 sensor with 3.3V, GND, and GPIO27 on Pi
    // 4. Reboot Pi, and use lsmod to see following modules
    // - industrialio.ko
    // - kfifo_buf.ko
    // - dht11.ko
    // 5. I can see the iio folder appeared at "/sys/devices/platform/dht11@1b/iio:device0/"
    read_am2301_tp() {
        return new Promise((resolve, reject) => {
            let cmd = "cat /sys/devices/platform/dht11@1b/iio\:device0/in_temp_input"
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
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
    }

    read_am2301_hm() {
        return new Promise((resolve, reject) => {
            let cmd = "cat /sys/devices/platform/dht11@1b/iio\:device0/in_humidityrelative_input"
            exec(cmd, (error, stdout, stderr) => {
                if (error) {
                    reject(error)
                }
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
    }

    async idleLoop() {
        try {
            await this.read_am2301_tp()
        } catch(err) {}
        try {
            await this.read_am2301_hm()
        } catch(err) {}
        await wait(1000)
        this.idleLoop()
    }

    async openDoor1() {
        if ( this.door1 === true ) return
        this.door1 = true
        try {
            await this.digitalWrite(DOOR_1, HIGH)
            await wait(5000)
            await this.digitalWrite(DOOR_1, LOW)
        } catch(err) {}
        this.door1 = false
    }

    async openDoor2() {
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
