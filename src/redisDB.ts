import { createClient } from 'redis';

const client = createClient({ url: 'redis://localhost' });
client.connect();
console.log('Conexión establecida con Redis');

export default client;
