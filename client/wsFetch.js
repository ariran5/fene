import { overload } from '../utils/fnOverload.js'
/**
 * 
 * @param {string} sign аналог path
 * @param  {Object} options
 * @param  {Function} cb выполняется при поступлении данных
 * 
 * @returns {Function} Отписка от получения данных
 */
export async function wsFetch(...args){
  const [sign, options = {}, cb] = overload([String, Object, Function], ...args)
  
  const handle = event => {
    cb(event.data)
  }

  this.addEventListener('message', handle)

  if (this.readyState === WebSocket.CONNECTING) {
    await new Promise(res => {
      this.addEventListener('open', function q() {
        res()
        this.removeEventListener('open', q)
      })
    })
  }

  this.send(JSON.stringify({
    sign,
    body: options.body ?? ''
  }))


  return () => {
    this.send({
      sign,
      type: 'delete'
    })
    this.removeEventListener('message', handle)
  }
}