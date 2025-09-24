require('dotenv').config();
const cors = require('cors');

const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require('body-parser');


const app = express()
app.use(cors());
const port = 3000
app.use(bodyParser.json());
const url = process.env.MONGO_URI;
const client = new MongoClient(url);
const dbName = "password_manager";


const db = client.db(dbName);

client.connect();




//get all the passwords
app.get('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.find({}).toArray();
    res.json(findResult)
  } catch (error) {
    console.error('Error fetching passwords:', error);
    res.status(500).json({ error: 'Failed to fetch passwords' });
  }
})

//save a new password
app.post('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.insertOne(req.body);
    res.send({ success: true, insertedId: findResult.insertedId })
  } catch (error) {
    console.error('Error saving password:', error);
    res.status(500).json({ error: 'Failed to save password' });
  }
})

//delete a password by id
app.delete('/', async (req, res) => {
  try {
    const db = client.db(dbName);
    const collection = db.collection('documents');
    const findResult = await collection.deleteOne(req.body);
    res.send({ success: true, deletedCount: findResult.deletedCount })
  } catch (error) {
    console.error('Error deleting password:', error);
    res.status(500).json({ error: 'Failed to delete password' });
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
