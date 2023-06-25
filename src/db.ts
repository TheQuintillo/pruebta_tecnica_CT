import { MongoClient } from 'mongodb';

async function connectToDB() {
  const uri = 'mongodb://localhost:27017';
  const dbName = 'trainEngine'; // URL de conexión a MongoDB

  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Conexión exitosa a MongoDB');
    return client.db(dbName); // Devuelve la instancia de la base de datos
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

export default connectToDB;
