import * as express from 'express';
import { Parameters, CTSearch } from './types';
import timetableRouter from './routes/timetables.routes';
import stationsRouter from './routes/stations.routes';
import accommodationsRouter from './routes/accommodations.routes';
import pricesRouter from './routes/prices.routes';
import connectToDB from './db';

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Ruta POST para enviar datos a la ruta timetables del mock server

app.use('/timetables', timetableRouter);
app.use('/stations', stationsRouter);
app.use('/accommodations', accommodationsRouter);
app.use('/prices', pricesRouter);

app.post('/', (req, res) => {
  const body: Parameters = req.body;

  res.send('Hello World!');
});

connectToDB()
  .then(database => {
    app.set('database', database);
<<<<<<< HEAD

=======
>>>>>>> a09aa964bc9d38b975934486d0141c7db902f7ec
    const port = 3000;
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  })
  .catch(error => {
    console.error('Error al iniciar la aplicación:', error);
  });
