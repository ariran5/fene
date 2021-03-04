import WebSocket from 'ws'
import {
  parse,
  defaultFieldResolver,
  defaultTypeResolver
} from 'graphql'
import root, { subs } from './rootResolvers.mjs'
import {
  graphqlRequest,
  parseSchema,
  subscribeRequest,
} from './graph.mjs'

const wss = new WebSocket.Server({ port: 9876 })

const queries = `
  input Hello {
    message: String
  }

  type HelloObj {
    helloText(ids: ID): String
    chandeId: Int
  }

  type UserInfo {
    name: String
    surname: String
  }

  type User {
    id: ID!
    access: Int
    info: UserInfo
  }

  type Query {
    hello(id: ID): HelloObj
    goodby: Int
    user: User!
    watchQwe: User
  }

  type Mutation {
    setMessage(message: String): Query
  }
  
  type Subscription {
    user: User
  }
`
const schema = parseSchema(queries);

// console.log(schema);

// const queriesCache = new WeakMap()
// console.log(parse(`{ 
//   hello(id: 1) {
//     helloText(ids: 22)
//     chandeId @delete
//   } 
//   goodby
//   user {
//     id
//     access
//   }
// }`));

wss.on('connection', function connection(ws) {
  // queriesCache.set(ws, {
  //   queries: []
  // })

  ws.on('message', async (message) => {
    const { query } = JSON.parse(message)

    const document = parse(query)
    
    switch (document.definitions[0].operation) {
      case 'subscription':
        subscribeRequest({
          schema,
          document,
          rootValue: subs,
        }, (data) => {
          ws.send(JSON.stringify(data))
        })
        break;
    
      default:
        ws.send(JSON.stringify(
          await graphqlRequest({
            schema,
            source: document,
            rootValue: root,
            contextValue: {query},
            // fieldResolver:resolver
          })
        ))
        break;
    }
  })


  ws.on('close', () => {
    // queriesCache.delete(ws)
  })
})