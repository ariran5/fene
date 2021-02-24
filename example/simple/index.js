import { createInstruments } from '../../client/main.js'

+async function(){
  
  await new Promise(res => {
    document.addEventListener('DOMContentLoaded', event => res(event))
  })
  
  const socket = new WebSocket('ws://localhost:9876')
  console.log(socket);
  const {
    wsFetch
  } = createInstruments(socket)

  wsFetch('getBody', data => {
    console.log(data)
  })
  // socket.onopen = function() {
  //   console.log("Соединение установлено.")
  // }
  
  // socket.onclose = function(event) {
  //   if (event.wasClean) {
  //     console.log('Соединение закрыто чисто')
  //   } else {
  //     console.log('Обрыв соединения') // например, "убит" процесс сервера
  //   }
  //   console.log('Код: ' + event.code + ' причина: ' + event.reason)
  // }
  
  // socket.onmessage = function(event) {
  //   console.log("Получены данные " + event.data)
  // }
  
  // socket.onerror = function(error) {
  //   console.log("Ошибка " + error.message)
  // }

}()