import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import path from 'path';

import config from './config/config.js';
import { AppDataSource } from './data-source.js';
import { ProductRoutes } from './routes/productRoute.js';
import { errorHandler } from './middleware/errorHandler.js';

const __dirname = path.resolve();

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes

    ProductRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next,
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined,
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        },
      );
    });

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
