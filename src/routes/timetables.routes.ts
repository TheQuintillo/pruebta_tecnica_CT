import { Request, Response, Router } from 'express';
import { Parameters, CTSearch } from '../types';
import axios from 'axios';

const router = Router();

router.post('/', async (req: Request<Parameters>, res: Response) => {
  try {
    const { journeys, passenger }: Parameters = req.body;

    console.log(...journeys);

    const queryParams = new URLSearchParams({
      adults: passenger.adults.toString(),
      childrens: passenger.childrens.toString(),
      total: passenger.total.toString(),
    }).toString();

    console.log(queryParams);

    const response = await axios.post(
      `http://localhost:80/servivuelo/timetables?${queryParams}`,
      ...journeys,
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar los datos a la ruta timetables' });
  }
});

export default router;
