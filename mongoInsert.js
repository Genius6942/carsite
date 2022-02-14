const { MongoClient } = require("mongodb");
const argv = require('minimist')(process.argv.slice(2));
// Replace the uri string with your MongoDB deployment's connection string.
const uri = 'mongodb+srv://dev:opQn8C4dd7WQjajP@carcluster.u5h1o.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const database = client.db(typeof argv.db === 'string' ? argv.db : 'cars');
    const col = database.collection(typeof argv.col === 'string' ? argv.col : 'cars-all');
    // remove all from collection
    await col.deleteMany({});
    await col.insertMany(require(typeof argv.file === 'string' ? argv.file : './data.json'));
    console.log('done')
  } finally {
    await client.close();
  }
}
run().catch(console.dir);