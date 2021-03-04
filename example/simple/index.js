+async function(){
  
  await new Promise(res => {
    document.addEventListener('DOMContentLoaded', event => res(event))
  })
  
  const socket = new WebSocket('ws://localhost:9876')

  socket.addEventListener('close', () => {
    location.reload()
  })

  socket.addEventListener('message', (event) => console.log(event.data))

  document.querySelector('#qwe').onclick = () => {
    socket.send(JSON.stringify({
      // query: `
      // subscription { 
      //   hello(id: 1) {
      //     helloText(ids: 22)
      //     chandeId
      //   }
      //   goodby
      //   user {
      //     id
      //     access
      //   }
      // }`
      query: `
      subscription @time(min: 1) { 
        user {
          id
        }
      }`
    }))
  }

  zxc.onclick = () => {
    socket.send(JSON.stringify({
      query: `
      { 
        hello(id: 1) {
          helloText(ids: 22)
          chandeId
        }
        goodby
        user {
          id
          access
        }
      }`
    }))
  }

  document.querySelector('#asd').onclick = () => {
    socket.send(JSON.stringify({
      query: `
      mutation ChangeMessage{
        setMessage(message: "antony") {hello {chandeId}, goodby}
      }`
    }))
  }
}()