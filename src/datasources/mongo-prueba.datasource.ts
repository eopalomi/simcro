import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongoPrueba',
  connector: 'mongodb',
  // url: 'mongodb+srv://acceso:acceso1234.@cluster0.friyyh2.mongodb.net/?retryWrites=true&w=majority',
  url: '',
  host: 'localhost',
  port: 27017,
  user: '',
  password: '',
  database: 'prueba'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongoPruebaDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongoPrueba';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongoPrueba', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
