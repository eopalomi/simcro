import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

// const config = {
//   name: 'bd_local_mongo',
//   connector: 'mongodb',
//   url: '',
//   host: 'localhost',
//   port: 27017,
//   user: '',
//   password: '',
//   database: 'cronograma_db',
//   useNewUrlParser: true
// };

const config = {
  name: 'bd_local_mongo',
  connector: 'mongodb',
  url: 'mongodb://admin:mongoFortt22@10.3.3.122:27020/cronograma_db?authSource=admin',
  // host: '10.3.3.122',
  // port: 27020,
  // user: 'admin',
  // password: 'mongoFortt22',
  // database: 'cronograma_db',
  tls: true,
  useNewUrlParser: true
};


// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class BdLocalMongoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'bd_local_mongo';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.bd_local_mongo', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
