0-][
  const express = require('express')
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config()

const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.get('/', (req, res) => {
  res.send('Welcome, Dhoku Photography!')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2g08s.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  console.log(err);
  const eventCollection = client.db("photography").collection("event");
  console.log('Database Connected');

    app.post('/addService', (req, res) => {
      const event = req.body;
      // console.log(event);
      eventCollection.insertMany(event)
      .then(result => {
        res.send(result.insertMany)
        console.log(result);
      })
    })

    app.get('/serviceEvent', (req, res) => {
      eventCollection.find({})
      .toArray((err, documents) => {
        res.send(documents)
      })
    })
    
});


const port = (process.env.PORT || 4000)
app.listen(port, () => {
  console.log(`Dhoku Server Live Website: http://localhost:${port}`)
})

// 