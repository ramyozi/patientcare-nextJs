import { MongoClient } from 'mongodb';
//.env

const client = new MongoClient(process.env.MONGODB_URI,
{
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
export async function setUpDb(db) {
  db.collection('users').createIndex({ email: 1 }, { unique: true });
}

export default async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db("Authenticate");
  await setUpDb(req.db);
  return next();
}
