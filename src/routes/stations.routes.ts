import { Router } from 'express';

const router = Router();

router.get('/', async (req, res) => {
  try {
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
    res.send(trainStations);
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

    if (documents) {
      const destinationTree = documents.destinationTree;
      console.log(destinationTree);
    } else {
      console.log('No se encontraron registros.');
    }

    console.log(documents);
    res.send(documents);
  } catch (e) {
    console.log(e);
    res.send(e);
  }
});

export default router;
