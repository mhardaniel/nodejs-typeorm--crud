import config from './config/config.js';
import { AppDataSource } from './data-source.js';
import createApp from './app.js';

AppDataSource.initialize()
  .then(async () => {
    const app = await createApp();

    app.listen(config.port);

    console.log(
      `Express server has started on port ${config.port}. Open http://localhost:${config.port}/api/products to see results`,
    );
  })
  .catch((error: Error) => console.log(error));
