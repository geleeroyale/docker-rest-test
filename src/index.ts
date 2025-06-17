import express, { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 4444;

app.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({ status: 'ok' });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Health API listening on port ${PORT}`);
});
