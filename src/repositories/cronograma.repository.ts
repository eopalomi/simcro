import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {LocalhostPostgresDataSource} from '../datasources';
import {Cronograma, CronogramaRelations} from '../models';

export class CronogramaRepository extends DefaultCrudRepository<
  Cronograma,
  typeof Cronograma.prototype.idCronograma,
  CronogramaRelations
> {
  constructor(
    @inject('datasources.localhost_postgres') dataSource: LocalhostPostgresDataSource,
  ) {
    super(Cronograma, dataSource);
  }
}
