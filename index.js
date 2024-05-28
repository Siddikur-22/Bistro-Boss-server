const express = require('express')
const app = express();
const cors = require('cors');
require('dotenv').config()
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


// user BistroUser
// pass : SzR29oSWztc7xFZ2





const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1elrylu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

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

        const MenuCollection = client.db("BistroDp").collection("menu");
        const cartCollection = client.db("BistroDp").collection("carts");

        // 1st data load
        app.get('/menu', async(req, res) => {
            const result = await MenuCollection.find().toArray();
            res.send(result)
        })

        // carts collection

        app.post('/carts',async(req,res)=>{
            const cartItem = req.body;
            const result = await cartCollection.insertOne(cartItem);
            res.send(result);
        })



        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




//Port show
app.get('/', (req, res) => {
    res.send("Bistro Boss is Sitting")
})

app.listen(port, () => {
    console.log(`Bistro Boss is stting on port ${port}`);
})


/**
 * --------------------------
 *      Naming convention 
 * -------------------------
 * app.get('/user')
 * app.get('/user/:id')
 * app.post('/users')
 * app.put("/user/:id")
 * app.patch("/user/:id")
 * app.delete("/users/:id")
 */