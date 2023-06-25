import { Request, Response, Router } from 'express';
import { Accommodations } from 'src/entities/Accommodations.entities';
import axios from 'axios';

const router = Router();

router.post('/', async (req: Request<Accommodations>, res: Response) => {
  try {
    const { shipID, departureDate }: Accommodations = req.body;

    const response = await axios.post(`http://localhost:80/servivuelo/accommodations`, {
      shipID: shipID,
      departureDate: departureDate,
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error al enviar los datos a la ruta accommodations' });
  }
});

export default router;
