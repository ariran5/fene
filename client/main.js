class wsRequest {

}

class wsResponse {

}

import { wsFetch } from './wsFetch.js'


function toJson(...args){return JSON.stringify(...args)}
/**
 * 
 * @param {WebSocket} socket 
 */
export function createInstruments(socket){
  const returns = {}

  returns.wsFetch = wsFetch.bind(socket)

  return returns
}