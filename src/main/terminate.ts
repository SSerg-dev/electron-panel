//process.setMaxListeners(20)

process.on('beforeExit', code => {
    // Can make asynchronous calls
    console.log(`Process will exit with code: ${code}`)
    setTimeout(() => {
        process.exit(code)
    }, 1500)
})

process.on('exit', code => {
    // Only synchronous calls
    console.log(`Process exited with code: ${code}`)
})

process.on('SIGTERM', () => {
    console.log(`Process ${process.pid} received a SIGTERM signal`)
    setTimeout(() => {
        process.exit(0)
    }, 1500)
});

process.on('SIGINT', () => {
    console.log(`Process ${process.pid} has been interrupted`)
    setTimeout(() => {
        process.exit(0)
    }, 1500)
})

process.on('uncaughtException', err => {
    console.log(`Uncaught Exception: ${err.message}`)
    setTimeout(() => {
        process.exit(1)
    }, 1500)
})

process.on('unhandledRejection', (reason, promise) => {
    console.log('Unhandled rejection at ', promise, `reason: ${reason}`)
    setTimeout(() => {
        process.exit(1)
    }, 1500)
})

