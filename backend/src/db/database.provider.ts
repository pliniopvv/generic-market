import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/users/users.entity';
export const entities = [User, Product];

// export const dataSourceConfig = {
//   type: 'mysql',
//   host: 'localhost',
//   port: 3306,
//   username: 'root',
//   password: 'root',
//   database: 'test',
//   entities: entities,
//   synchronize: true,
// };

export const dataSourceConfig = {
  type: 'sqlite',
  database: '../database.db',
  entities: entities,
  synchronize: true,
};
