import mongodb from 'mongodb'

const client = await mongodb.connect('mongodb://localhost:30001' )
const db = client.db('shop')


let helloText = 'Hello world!'
let chandeId = 0

const queries = {
  hello: (args) => {
    console.log(args);
    return {
      helloText: (a) => (console.log(a), helloText),
      chandeId
    }
  },
  goodby: () => 54,
  user: () => {
    return {
      id: '123dfa',
      access: 51331,
      info: {
        name: 'Andry',
        surname: 'Chuchov'
      }
    }
  },
  setMessage(...args){
    const [{message}] = args
    helloText = message
    chandeId++
    return {
      // hello: this.hello(),
      goodby: this.goodby()
    }
  }
};

export const subs = {
  async *user (vars, ctx, gqlReq){
    const userCollection = db.collection('users')
    const changeStream = userCollection.watch()
    
    while (true) {
      yield queries
      await changeStream.next()
    }
  },
}

export default queries