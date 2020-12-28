import schema from './schema/design.mjs'
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import mongodb from 'mongodb';

const { MongoClient } = mongodb
 
var app = express();
app.use(express.static('public'))
const uri = "mongodb+srv://mongo_kaushik:mongo123@cluster0.ahrfk.mongodb.net/<dbname>?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true });

let db
client.connect((err)=>{
  if(err) throw err;

  db = client.db('restdb')
  app.listen(4000, () => console.log('Now browse to localhost:4000/graphql'));
})


app.get('/hello', (req, res) => res.send('Hello Express'))

app.get('/data',(req, res) => {
  db.collection('links').find({}).toArray((err,links)=>{
    if(err) throw err;

    res.json(links)
})
})

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,

}));
