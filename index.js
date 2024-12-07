
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// middleware

app.use( cors());
app.use(express.json());

// chillGamer
// 5DaiOscr0eTVnqNf






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nsvzy.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

console.log(uri);


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const gameCollection = client.db('gameDB').collection('game');
    const reviewCollection = client.db('gameDB').collection('reviews');

    app.get('/game', async(req, res) => {
      const  cursor = gameCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.post('/game', async (req, res) => {
      const newGame = req.body;
      console.log(newGame);
      const result = await gameCollection.insertOne(newGame);
      res.send(result);

    })



    // review related apis

    app.post('/reviews', async(req, res) => {
      console.log('POST /reviews called', req.body);
      const newReview = req.body;
      console.log('create new review', newReview);
      const result = await reviewCollection.insertOne(newReview);
      res.send(result);
    })

    // app.post('/reviews', async (req, res) => {
    //   try {
    //     const newReview = req.body;
    //     console.log('Received review data:', newReview);
    
    //     // Insert the review into the database
    //     const result = await reviewCollection.insertOne(newReview);
    
    //     // Send a success response
    //     res.status(200).json({ success: true, result });
    //   } catch (error) {
    //     console.error('Error saving review:', error);
    //     res.status(500).json({ success: false, error: 'Internal Server Error' });
    //   }
    // });
    







    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




app.get('/',(req, res) => {
    res.send('Chill Gamer server is running')
})


app.listen(port, () =>  {
    console.log(`Chill Gamer server is running on port: ${port}`);
})
