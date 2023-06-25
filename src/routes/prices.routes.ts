import { Request, Response, Router } from 'express';
import { Prices } from 'src/entities/Prices.entity';
import axios from 'axios';

const router = Router();

router.post('/', async (req: Request<Prices>, res: Response) => {
  try {
    const { shipID, departureDate, accommodation }: Prices = req.body;
    const { pax, bonus }: Prices = req.body;

    const queryParams = new URLSearchParams({
      pax: pax.toString(),
      ...(bonus && { bonus: bonus.toString() }),
    }).toString();

    const response = await axios.post(`http://localhost:80/servivuelo/prices?${queryParams}`, {
      shipID: shipID,
      departureDate: departureDate,
      accommodation: accommodation,
    });

    res.json(response.data);
  } catch (err) {
    res.json(err);
  }
});

export default router;
