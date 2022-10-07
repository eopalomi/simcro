import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class Cronograma extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: false,
    required: true,
  })
  idCronograma: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaVencimiento: string;

  @property({
    type: 'number',
    required: true,
  })
  diasCuota: number;

  @property({
    type: 'number',
    required: true,
  })
  saldoInicial: number;

  @property({
    type: 'number',
    required: true,
  })
  saldoFinal: number;

  @property({
    type: 'number',
    required: true,
  })
  cuota: number;

  @property({
    type: 'number',
    required: true,
  })
  interesCuota: number;

  @property({
    type: 'number',
    required: true,
  })
  capitalCuota: number;

  @property({
    type: 'number',
    required: true,
  })
  seguroBien: number;

  @property({
    type: 'number',
    required: true,
  })
  seguroDesgravamen: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Cronograma>) {
    super(data);
  }
}

export interface CronogramaRelations {
  // describe navigational properties here
}

export type CronogramaWithRelations = Cronograma & CronogramaRelations;
