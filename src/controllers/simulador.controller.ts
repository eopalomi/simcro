import {inject} from '@loopback/core';

import {
  get, post, Request, response,
  ResponseObject, RestBindings
} from '@loopback/rest';

import moment from 'moment';

/**
 * OpenAPI response for ping()
 */
const PING_RESPONSE: ResponseObject = {
  description: 'Cronograma de Pagos',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        title: 'CronogramaResponse',
        properties: {
          greeting: {type: 'string'},
          date: {type: 'string'},
          url: {type: 'string'},
          headers: {
            type: 'object',
            properties: {
              'Content-Type': {type: 'string'},
            },
            additionalProperties: true,
          },
        },
      },
    },
  },
};

export class SimuladorController {
  constructor(@inject(RestBindings.Http.REQUEST) private req: Request) { }

  // Map to `GET /ping`
  @get('/hello_cronog')
  @response(200, PING_RESPONSE)
  ping(): object {
    // Reply with a greeting, the current time, the url, and request headers
    return {
      greeting: 'Hello from LoopBack cronog',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  // Map to `GET /ping`
  @post('/simcro')
  @response(200, PING_RESPONSE)
  simuladorCronograma(): object {
    // Reply with a greeting, the current time, the url, and request headers
    let tea = this.calcularTea(15, 1800.00, 25000.00, new Date('2022-09-10'), new Date('2022-11-10'));

    console.log("TEA CALCULADA", tea);

    return {
      greeting: 'Hello from LoopBack',
      date: new Date(),
      url: this.req.url,
      headers: Object.assign({}, this.req.headers),
    };
  }

  calcularTea(plazo: number, cuota: number, montoFinanciar: number, fecha_inicio: Date, fecha_vencimiento: Date): number {
    let cantidadCuotas = new Array(plazo).fill(0);
    let tasaSimulada: number = 9.999999;
    let tasaCalculada: number = tasaSimulada / 2;
    let iteraciones: number = 0;
    let a = moment().hours();

    while (iteraciones < 100) {

      let saldoCapital = montoFinanciar;
      let numeroCuota: number = 0;
      let fechaInicio: Date;
      let fechaVencimiento: Date;
      let interesesCuota: number;
      let diasCuota: number;

      cantidadCuotas.forEach((rs, idx, arr) => {
        numeroCuota = idx + 1;

        if (numeroCuota === 1) {
          fechaInicio = moment(fecha_inicio, 'YYYY-MM-DD').toDate();
          fechaVencimiento = moment(fecha_vencimiento, 'YYYY-MM-DD').toDate();
          diasCuota = this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
        } else {
          fechaInicio = fechaVencimiento;
          fechaVencimiento = moment(fechaVencimiento, 'YYYY-MM-DD').add(1, 'months').toDate();
          diasCuota = this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
        };

        interesesCuota = saldoCapital * ((1 + tasaSimulada) ** (diasCuota / 360) - 1);
        saldoCapital = saldoCapital - (cuota - interesesCuota);

        console.log("Fecha Inicio", fechaInicio, "Fecha Vencimiento", fechaVencimiento, this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento), interesesCuota, "tea", tasaSimulada);
      });



      if (Math.abs(saldoCapital) < 0.25) {
        console.log("Saldo Capital Final", saldoCapital, Math.abs(saldoCapital));
        break;
      }

      if (saldoCapital > 0) {
        tasaSimulada = tasaSimulada - tasaCalculada;
      } else {
        tasaSimulada = tasaSimulada + tasaCalculada;
      };

      tasaCalculada = tasaCalculada / 2;

      iteraciones += 1;
      console.log("iteraciones", iteraciones);
    };

    return tasaSimulada;
  }

  obtenerDiasEntreDosFechas(fechaInicial: Date, fechaFinal: Date): number {
    const milisengundosEnUnDia = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(fechaFinal) - Number(fechaInicial)) / milisengundosEnUnDia);
  }

}
