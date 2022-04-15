export default function sleep(ms) {
  return new Promise(resolve => {
    setTimeout(() => resolve(), ms)
  })
}

// sleep(4000).then(() => {
//   console.log('run after 4 sec')
// })
