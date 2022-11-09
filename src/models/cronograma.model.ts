import {Entity, model, property} from '@loopback/repository';

@model()
export class Cronograma extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  id_cronograma: string;

  @property({
    type: 'string',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'string',
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
  numeroCuota: number;

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


  constructor(data?: Partial<Cronograma>) {
    super(data);
  }
}

export interface CronogramaRelations {
  // describe navigational properties here
}

export type CronogramaWithRelations = Cronograma & CronogramaRelations;
