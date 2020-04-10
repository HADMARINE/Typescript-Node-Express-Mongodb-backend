import { Router } from 'express';
import welcome from '@src/pages/Welcome';
import moment from 'moment';
const router = Router();

router.all('/', (req, res) => {
  res.send(
    welcome(
      'TS-NODE-EXPRESS-MONGO BACKEND',
      `TIMENOW: ${moment().format(
        'YYYY-MM-DD HH:mm:ss',
      )}<br/> See api info on <a href="/info"><b>GET /info</b></a>`,
    ),
  );
});

router.all('/time', (req, res) => {
  res.send(moment().format('YYYY-MM-DD_HH:mm:ss'));
});

router.get('/info', (req, res) => {
  const data = {
    v0: 'deprecated',
    v1: 'production',
  };
  res.send(data);
});

export default router;
