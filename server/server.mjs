import WebSocket from 'ws'
import { listen, dispatch } from './observer.mjs'

const wss = new WebSocket.Server({ port: 9876 })

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    const json = JSON.parse(message)
    listen(ws, json)

    setTimeout(() => {
      dispatch(json.sign, 'Контент')
      
      dispatch(json.sign, 'Контент qwe')
      setTimeout(() => {
        
        dispatch(json.sign, 'Контент2')

      }, 1000);
    }, 3000);
  })
})


