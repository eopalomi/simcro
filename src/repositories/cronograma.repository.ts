import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {BdLocalMongoDataSource} from '../datasources';
import {Cronograma, CronogramaRelations} from '../models';

export class CronogramaRepository extends DefaultCrudRepository<
  Cronograma,
  typeof Cronograma.prototype.id,
  CronogramaRelations
> {
  constructor(
    @inject('datasources.bd_local_mongo') dataSource: BdLocalMongoDataSource,
  ) {
    super(Cronograma, dataSource);
  }
}
