const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// hexadecimal-task
// 6MVTA74j0GPWFmWP

// check new branch
// for meddleware
app.use(cors());
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello from server')
})

const uri = "mongodb+srv://hexadecimal-task:6MVTA74j0GPWFmWP@cluster0.u7gnog9.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run() {
    try {


        await client.connect()
        const userCollection = client.db("hexadecimal").collection("users");
        console.log('data base is connected')
        app.get('/users', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query)
            const result = await cursor.toArray()
            res.json(result)
        })


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log('server is running on ', port)
})