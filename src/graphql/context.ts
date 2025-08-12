import { ProductAPI } from './datasources/product-api';

export type DataSourceContext = {
  dataSources: {
    productAPI: ProductAPI;
  };
};
