import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    strict: false,
    strictObjectIDCoercion: true,
    mongodb: {collection: "info_prueba"}
  }
})
export class CronogramaPagos extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true
  })
  id: string;

  @property({
    type: 'date',
  })
  fechaInicio: string;

  @property({
    type: 'date',
  })
  fechaVencimiento: string;

  @property({
    type: 'number',
  })
  diasCuota: number;

  @property({
    type: 'number',
  })
  saldoInicial: number;

  @property({
    type: 'number',
  })
  saldoFinal: number;

  @property({
    type: 'number',
  })
  cuota: number;

  @property({
    type: 'number',
  })
  interesCuota: number;

  @property({
    type: 'number',
  })
  capitalCuota: number;

  @property({
    type: 'number',
  })
  seguroBien: number;

  @property({
    type: 'number',
  })
  seguroDesgravamen: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<CronogramaPagos>) {
    super(data);
  }
}

// export interface CronogramaPagosRelations {
//   // describe navigational properties here
// }

// export type CronogramaPagosWithRelations = CronogramaPagos & CronogramaPagosRelations;
