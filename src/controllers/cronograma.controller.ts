import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Cronograma} from '../models';
import {CronogramaRepository} from '../repositories';

export class CronogramaController {
  constructor(
    @repository(CronogramaRepository)
    public cronogramaRepository : CronogramaRepository,
  ) {}

  @post('/cronogramas')
  @response(200, {
    description: 'Cronograma model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cronograma)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cronograma, {
            title: 'NewCronograma',
            exclude: ['id'],
          }),
        },
      },
    })
    cronograma: Omit<Cronograma, 'id'>,
  ): Promise<Cronograma> {
    return this.cronogramaRepository.create(cronograma);
  }

  @get('/cronogramas/count')
  @response(200, {
    description: 'Cronograma model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cronograma) where?: Where<Cronograma>,
  ): Promise<Count> {
    return this.cronogramaRepository.count(where);
  }

  @get('/cronogramas')
  @response(200, {
    description: 'Array of Cronograma model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cronograma, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cronograma) filter?: Filter<Cronograma>,
  ): Promise<Cronograma[]> {
    return this.cronogramaRepository.find(filter);
  }

  @patch('/cronogramas')
  @response(200, {
    description: 'Cronograma PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cronograma, {partial: true}),
        },
      },
    })
    cronograma: Cronograma,
    @param.where(Cronograma) where?: Where<Cronograma>,
  ): Promise<Count> {
    return this.cronogramaRepository.updateAll(cronograma, where);
  }

  @get('/cronogramas/{id}')
  @response(200, {
    description: 'Cronograma model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cronograma, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Cronograma, {exclude: 'where'}) filter?: FilterExcludingWhere<Cronograma>
  ): Promise<Cronograma> {
    return this.cronogramaRepository.findById(id, filter);
  }

  @patch('/cronogramas/{id}')
  @response(204, {
    description: 'Cronograma PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cronograma, {partial: true}),
        },
      },
    })
    cronograma: Cronograma,
  ): Promise<void> {
    await this.cronogramaRepository.updateById(id, cronograma);
  }

  @put('/cronogramas/{id}')
  @response(204, {
    description: 'Cronograma PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() cronograma: Cronograma,
  ): Promise<void> {
    await this.cronogramaRepository.replaceById(id, cronograma);
  }

  @del('/cronogramas/{id}')
  @response(204, {
    description: 'Cronograma DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.cronogramaRepository.deleteById(id);
  }
}
