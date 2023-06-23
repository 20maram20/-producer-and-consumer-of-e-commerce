import express from "express";
import connectDB from "./db.js";
import Product from "./product.js";
import Kafka from "kafka-node";

const app = express();
app.use(express.json());

connectDB();
const client = new Kafka.KafkaClient({ kafkaHost: 'kafka:9092' });
const Consumer = Kafka.Consumer;

  
const consumer = new Consumer(
  client,
  [{ topic: 'testtopic', partition: 0 }],
  { autoCommit: true }
);
 consumer.on("message", async function (message) {
    console.log("Received message:", message);
    try {
      const product = new Product(JSON.parse(message.value));
      await product.save();
      console.log("Product saved:", product);
    } catch (error) {
      console.error("Error saving product:", error);
    }
  });
  

app.get('/products', async (req, res) => {
    try {
        const products = await Product.find();
       res.json(products);
    }
    catch (error) {
        res.status(500).send(error.message);
  }
});


app.get('/products/:id', async (req, res) => {   
    try {
        const product = await Product.findById(req.params.id);
        if (!product) throw new Error('Product not found');
       res.json(product);
    }
    catch (error) {
       res.status(500).send(error.message);
    }
});



app.post('/products', async (req, res) => {    
    try {
        const {name, price, quantity} = req.body;
        const product = new Product({name, price, quantity});
        await product.save();
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.put('/products/:id', async (req, res) => {    
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if (!product) throw new Error('Product not found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


app.delete('/products/:id', async (req, res) => {    
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) throw new Error('Product not found');
        res.json({success: true});
    }
    catch (error) {
        res.status(500).send(error.message);
    }
});


const port = 3000;

app.listen(port, () => {
    console.log("API server started on port 3000");
})