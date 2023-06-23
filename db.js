const {MongoClient} = require('mongodb');

const uri = "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.0";
const client = new MongoClient(uri);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};
 

async function main(){    
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

async function createListing(newListing){
    try {
        await client.connect()
      const result = await client.db("gfg").collection("student").insertOne(newListing);
      console.log(`New listing created with the following id: ${result.insertedId}`);
      return result.insertedId
    } catch (e) {
      console.error(e)
      return e.toString()
    } finally {
        client.close()
    }
  }

  async function getCollections() {
    try {
        await client.connect();
      const db = client.db('gfg');
      const collections = await db.collections();
      ;
      const jsoncollection = collections[0].find()

      const nc = await jsoncollection.toArray()
  
      return nc
    } catch (e) {      
      console.error(e);
      return e.toString()
    } finally {
        client.close()
    }
  }

module.exports = {main, createListing, getCollections}