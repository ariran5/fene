// const cacheWSRequests = new WeakMap()
const signs = new Map()

export function listen(ws, request){
  const {
    sign,
    type,
    body
  } = request
  console.log(sign);

  const cache = signs.get(sign) ?? []

  if (type === 'delete') {
    signs.delete(sign)
    return
  }

  cache.push({ws, body})
  
  signs.set(sign, cache)
}

export function dispatch(sign, data){
  const arr = signs.get(sign)

  arr.forEach(item => {
    const {
      ws,
      body
    } = item

    ws.send(JSON.stringify(data))
  })
}