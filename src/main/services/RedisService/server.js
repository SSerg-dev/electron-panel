/* // express
import express from 'express'
const app = new express()
app.use(express.json())

// Client
import { Client } from 'redis-om'

REDIS_URL='redis://localhost:6379'
const url = process.env.REDIS_URL
const client = await new Client().open(url)

export default client
 */
/* 
import { createClient } from 'redis'
const client = createClient()
client.on('error', err => console.log('Redis Client Error', err))
await client.connect()
await client.set('key', 'value')
const value = await client.get('key')
 */

export function plus(x, y) {
  return (x + y) * 1000
}


/* import { createClient } from 'redis'

export default function plus() {
const client = createClient()
client.on('error', err => console.log('Redis Client Error', err))
await client.connect()
await client.set('key', 'REDIIISSSS')
const value = await client.get('key')

return value
} */

