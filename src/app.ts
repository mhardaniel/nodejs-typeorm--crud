import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import { expressMiddleware } from '@as-integrations/express4';

import productRoutes from './routes/productRoute.js';
import { errorHandler } from './middleware/errorHandler.js';

import { createApolloServer } from './graphql/apollo-server.js';

import path from 'path';

export default async function createApp() {
  const __dirname = path.resolve();
  const app = express();

  app.use(cors());
  app.use(helmet());
  app.use(bodyParser.json());

  app.use('/api/products', productRoutes);

  const apolloServer = await createApolloServer();
  await apolloServer.start();
  app.use('/graphql', expressMiddleware(apolloServer, {}));

  app.use(errorHandler);

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/shadcn/dist')));
    app.get('*', (req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'shadcn', 'dist', 'index.html'));
    });
  }

  return app;
}
