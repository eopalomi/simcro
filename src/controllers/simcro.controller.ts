import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param, post, requestBody,
  response
} from '@loopback/rest';
import {Cronograma} from '../models';
import {CronogramaRepository} from '../repositories';
import {calcularCuota} from '../utils/calcular-cuota';
import {CronogramaPagos} from '../utils/cronograma-utils';


export class SimcroController {
  constructor(
    @repository(CronogramaRepository)
    public cronogramaRepository: CronogramaRepository,
  ) { }

  // @post('/simcro2')
  // @response(200, {
  //   description: 'Cronograma model instance',
  //   content: {'application/json': {schema: getModelSchemaRef(Cronograma)}},
  // })
  // async create(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Cronograma, {
  //           title: 'NewCronograma',
  //           exclude: ['id'],
  //         }),
  //       },
  //     },
  //   })
  //   cronograma: Omit<Cronograma, 'id'>,
  // ): Promise<Cronograma> {
  //   // let cuota = calcularCuota(bodyRequest.plazo, bodyRequest.tea, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));

  //   // CronogramaPagosPagos = CronogramaPagosPago(bodyRequest.plazo, bodyRequest.tea, cuota, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));

  //   return this.cronogramaRepository.create(cronograma);
  // }

  @post('/simcro')
  @response(200, {
    description: 'Cronograma model instance',
    content: {'application/json': {schema: getModelSchemaRef(Cronograma)}},
  })
  async simcro(
    @requestBody({
      description: 'informacion requerida',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['tipo', 'plazo', 'montoFinanciar', 'fecha_inicio', 'fecha_vencimiento'],
            properties: {
              tipo: {
                type: 'string',
              },
              plazo: {
                type: 'number',
              },
              tea: {
                type: 'number',
              },
              cuota: {
                type: 'number',
              },
              montoFinanciar: {
                type: 'number',
              },
              fecha_inicio: {
                type: 'string',
              },
              fecha_vencimiento: {
                type: 'string',
              }
            },
          },
        }
      }
    }) bodyRequest: any
  ): Promise<object> {
    let cuota = calcularCuota(bodyRequest.plazo, bodyRequest.tea, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));

    let cronogramaPagos: Cronograma[] = await CronogramaPagos(bodyRequest.plazo, bodyRequest.tea, cuota, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));

    return this.cronogramaRepository.createAll(cronogramaPagos);
  }

  @get('/simcro/count')
  @response(200, {
    description: 'Cronograma model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cronograma) where?: Where<Cronograma>,
  ): Promise<Count> {
    return this.cronogramaRepository.count(where);
  }

  @get('/simcro')
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

  // @patch('/cronogramas')
  // @response(200, {
  //   description: 'Cronograma PATCH success count',
  //   content: {'application/json': {schema: CountSchema}},
  // })
  // async updateAll(
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Cronograma, {partial: true}),
  //       },
  //     },
  //   })
  //   cronograma: Cronograma,
  //   @param.where(Cronograma) where?: Where<Cronograma>,
  // ): Promise<Count> {
  //   return this.cronogramaRepository.updateAll(cronograma, where);
  // }

  @get('/simcro/{id}')
  @response(200, {
    description: 'Cronograma model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cronograma, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cronograma, {exclude: 'where'}) filter?: FilterExcludingWhere<Cronograma>
  ): Promise<Cronograma[]> {
    // return this.cronogramaRepository.findById(id, filter);
    return this.cronogramaRepository.find({where: {id_cronograma: id}});
  }

  // @patch('/cronogramas/{id}')
  // @response(204, {
  //   description: 'Cronograma PATCH success',
  // })
  // async updateById(
  //   @param.path.string('id') id: string,
  //   @requestBody({
  //     content: {
  //       'application/json': {
  //         schema: getModelSchemaRef(Cronograma, {partial: true}),
  //       },
  //     },
  //   })
  //   cronograma: Cronograma,
  // ): Promise<void> {
  //   await this.cronogramaRepository.updateById(id, cronograma);
  // }

  // @put('/cronogramas/{id}')
  // @response(204, {
  //   description: 'Cronograma PUT success',
  // })
  // async replaceById(
  //   @param.path.string('id') id: string,
  //   @requestBody() cronograma: Cronograma,
  // ): Promise<void> {
  //   await this.cronogramaRepository.replaceById(id, cronograma);
  // }

  // @del('/cronogramas/{id}')
  // @response(204, {
  //   description: 'Cronograma DELETE success',
  // })
  // async deleteById(@param.path.string('id') id: string): Promise<void> {
  //   await this.cronogramaRepository.deleteById(id);
  // }
}
