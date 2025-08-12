import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import path from 'path';

import config from './config/config.js';
import { AppDataSource } from './data-source.js';
import productRoutes from './routes/productRoute.js';
import { errorHandler } from './middleware/errorHandler.js';

import { apolloServer } from './graphql/apollo-server.js';
import { expressMiddleware } from '@as-integrations/express4';
import { ProductAPI } from './graphql/datasources/product-api.js';

const __dirname = path.resolve();

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
    app.use('/api/products', productRoutes);

    await apolloServer.start();
    app.use(
      '/graphql',
      expressMiddleware(apolloServer, {
        context: async () => {
          return {
            dataSources: {
              productAPI: new ProductAPI(),
            },
          };
        },
      }),
    );

    // Global error handler (should be after routes)
    app.use(errorHandler);

    if (process.env.NODE_ENV === 'production') {
      app.use(express.static(path.join(__dirname, '/shadcn/dist')));
      app.get('*', (req: Request, res: Response) => {
        res.sendFile(path.resolve(__dirname, 'shadcn', 'dist', 'index.html'));
      });
    }

    // start express server
    app.listen(config.port);

    console.log(
      `Express server has started on port ${config.port}. Open http://localhost:${config.port}/products to see results`,
    );
  })
  .catch((error) => console.log(error));
