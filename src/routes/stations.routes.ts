import { Router } from 'express';
import { createClient } from 'redis';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const key = 'stations';
    const client = req.app.get('redis'); // Clave para buscar en Redis
    const cachedData = await client.get(key);

    if (cachedData) {
      res.send(JSON.parse(cachedData));
      console.log('Uso Redis para la búsqueda');
    } else {
      const db = req.app.get('database');

      const trainStations = await db
        .collection('journey_destination_tree')
        .aggregate([
          {
            $lookup: {
              from: 'supplier_station_correlation',
              localField: 'destinationCode',
              foreignField: 'code',
              as: 'suppliers',
            },
          },
          {
            $project: {
              _id: 0,
              destinationCode: '$destinationTree',
              trainStations: '$suppliers.code',
            },
          },
        ])
        .toArray();

      // Guardar los datos en Redis
      client.set(key, JSON.stringify(trainStations));
      console.log('Guarde los datos en Redis');
      res.send(trainStations);
    }
  } catch (err) {
    res.send(err);
  }
});

router.post('/filter', async (req, res) => {
  try {
    const db = req.app.get('database');
    const destination = req.body.destination;

    const documents = await db
      .collection('journey_destination_tree')
      .find({
        $or: [
          { destinationCode: { $regex: destination, $options: 'i' } },
          { destinationTree: { $regex: destination, $options: 'i' } },
        ],
      })
      .toArray();

    res.send(documents);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

router.post('/filterProvider', async (req, res) => {
  try {
    const db = req.app.get('database');
    const destination = req.body.destination;

    const documents = await db
      .collection('supplier_station_correlation')
      .find(
        { suppliers: { $regex: destination, $options: 'i' } },
        { projection: { code: 1, _id: 0 } },
      )
      .toArray();

    console.log(documents);
    res.send(documents);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
