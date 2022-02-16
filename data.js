const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://dev:opQn8C4dd7WQjajP@carcluster.u5h1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db('cars');
    const col = database.collection('cars-all');
    await col.createIndex({make: 'text', model: 'text', category: "string"});
    console.log('done')
  } finally {
    await client.close();
  }
}
run().catch(console.dir);