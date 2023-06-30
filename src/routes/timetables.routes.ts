import { Request, Response, Router } from 'express';
import { Parameters, CTSearch } from '../types';
import axios from 'axios';
import { getTimetables } from '../service/servivuelo.service';

const router = Router();

router.post('/', async (req: Request<Parameters>, res: Response) => {
  try {
    const { journeys, passenger, bonus }: Parameters = req.body;

    await getTimetables({ passenger, journeys, bonus }).then(data => {
      res.json(data);
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar los datos a la ruta timetables' });
  }
});

export default router;
