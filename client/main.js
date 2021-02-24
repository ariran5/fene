class wsRequest {

}

class wsResponse {

}


function toJson(j){return JSON.stringify(j)}
/**
 * 
 * @param {WebSocket} socket 
 */
export function createInstruments(socket){
  const returns = {}

  returns.wsFetch = function wsFetch(sign, ...args){
    if (args[0].toString() === '[object Object]') {
      var options = args[0]
      var cb = args[1]
    } else if (args[0] instanceof Function) {
      var options = {}
      var cb = args[0]
    }

    const handle = event => {
      cb(event.data)
    }

    socket.addEventListener('message', handle)

    if (socket.readyState < 1) {
      socket.addEventListener('open', function q() {
        socket.send(toJson({
          sign,
          body: options.body ?? ''
        }))

        removeEventListener('open', q)
      })

    } else {
      socket.send(toJson({
        sign,
        body: options.body ?? ''
      }))
    }

    return () => {
      socket.send({
        sign,
        type: 'delete'
      })
      socket.removeEventListener('message', handle)
    }
  }

  return returns
}