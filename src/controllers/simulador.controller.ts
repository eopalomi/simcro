import {inject} from '@loopback/core';

import {
  get, post, Request, requestBody, response,
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
  simuladorCronograma(
    @requestBody({
      description: 'informacion requerida',
      required: true,
      content: {
        'application/json': {
          schema: {
            type: 'object',
            required: ['tipo', 'plazo', 'montoFinanciar', 'fecha_inicio','fecha_vencimiento'],
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
  ): object {
    // Reply with a greeting, the current time, the url, and request headers
    //let tea = this.calcularTea(15, 1800.00, 25000.00, new Date('2022-09-10'), new Date('2022-11-10'));

    
    let cronogramaPagos !: any;
    //let cronogramaPagos = this.cronogramaPago(15, 30, cuota, 25000.00, new Date('2022-09-10'), new Date('2022-11-10'));
    

    if (bodyRequest.tipo === '01'){
      console.log('entro 01');
      // let cuota = this.calcularCuota(15, 30.00, 25000.00, new Date('2022-09-10'), new Date('2022-11-10'));
      let cuota = this.calcularCuota(bodyRequest.plazo, bodyRequest.tea, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));
      cronogramaPagos = this.cronogramaPago(bodyRequest.plazo, bodyRequest.tea, cuota, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));
    };

    if (bodyRequest.tipo==='02'){
      // let tea = this.calcularTea(15, 1800.00, 25000.00, new Date('2022-09-10'), new Date('2022-11-10'));
      // let tea = this.calcularTea(bodyRequest.plazo, bodyRequest.cuota, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));
      // cronogramaPagos = this.cronogramaPago(bodyRequest.plazo, tea, bodyRequest.cuota, bodyRequest.montoFinanciar, new Date(bodyRequest.fecha_inicio), new Date(bodyRequest.fecha_vencimiento));
    };

    // console.log("TEA CALCULADA", tea);
    // console.log("CUOTA CALCULADA", cuota);
    // console.log("CRONOGRAMA DE PAGOS", cronogramaPagos);
    console.log("BODY REQUEST", bodyRequest);

    // return {
    //   greeting: 'Hello from LoopBack',
    //   date: new Date(),
    //   url: this.req.url,
    //   headers: Object.assign({}, this.req.headers),
    // };
    return cronogramaPagos;
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
        if (numeroCuota === plazo)
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

  cronogramaPago(plazo: number, tea: number, cuota:number, montoFinanciar: number, fecha_inicio: Date, fecha_vencimiento: Date): object[] {
    let cantidadCuotas = new Array(plazo).fill(0);
    let cronogramaPago: object[] = [];
    let saldoCapital = montoFinanciar;
    let saldoInicial:number;
    let saldoFinal:number;
    let numeroCuota: number = 0;
    let fechaInicio: Date;
    let fechaVencimiento: Date;
    let interesesCuota: number;
    let capitalCuota: number;
    let diasCuota: number;

    cantidadCuotas.forEach((rs, idx, arr) => {
      numeroCuota = idx + 1;

      if (numeroCuota === 1) {
        fechaInicio = moment(fecha_inicio, 'YYYY-MM-DD').toDate();
        fechaVencimiento = moment(fecha_vencimiento, 'YYYY-MM-DD').toDate();
        diasCuota = this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
        saldoInicial = saldoCapital;
      } else {
        fechaInicio = fechaVencimiento;
        fechaVencimiento = moment(fechaVencimiento, 'YYYY-MM-DD').add(1, 'months').toDate();
        diasCuota = this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
        saldoInicial = saldoFinal;
      };

      
      interesesCuota = saldoInicial * ((1 + (tea/100)) ** (diasCuota / 360) - 1);
      capitalCuota = (cuota - interesesCuota);
      saldoFinal = saldoInicial - capitalCuota;

      if (numeroCuota === plazo){
        capitalCuota = saldoInicial;
        cuota = capitalCuota + interesesCuota;
        saldoFinal = 0.00
      };


      cronogramaPago.push({
        numeroCuota: numeroCuota,
        fechaInicio: moment(fechaInicio, 'YYYY-MM-DD').toISOString().substring(0, 10),
        fechaVencimiento: moment(fechaVencimiento, 'YYYY-MM-DD').toISOString().substring(0, 10),
        diasCuota: diasCuota,
        saldoInicial: Number(saldoInicial.toFixed(2)),
        saldoFinal: Number(saldoFinal.toFixed(2)),
        cuota: Number(cuota.toFixed(2)),
        interesesCuota: Number(interesesCuota.toFixed(2)),
        capitalCuota: Number(capitalCuota.toFixed(2)),
        seguroBien: 0.00,
        seguroDesgravamen: 0.00
       })

    });

    return cronogramaPago;
  }

  calcularCuota(plazo: number, tea: number, montoFinanciar: number, fecha_inicio: Date, fecha_vencimiento: Date): number {
    let cantidadCuotas = new Array(plazo).fill(0);
    let cuotaSimulada: number = 100000;
    let cuotaCalculada: number = cuotaSimulada / 2;
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

        interesesCuota = saldoCapital * ((1 + (tea/100)) ** (diasCuota / 360) - 1);
        saldoCapital = saldoCapital - (cuotaSimulada - interesesCuota);
        if (numeroCuota === plazo)
        console.log("Fecha Inicio", fechaInicio, "Fecha Vencimiento", fechaVencimiento, this.obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento), saldoCapital, "cuota", cuotaSimulada);
      });



      if (Math.abs(saldoCapital) < 0.25) {
        console.log("Saldo Capital Final", saldoCapital, Math.abs(saldoCapital));
        break;
      }

      if (saldoCapital < 0) {
        cuotaSimulada = cuotaSimulada - cuotaCalculada;
      } else {
        cuotaSimulada = cuotaSimulada + cuotaCalculada;
      };

      cuotaCalculada = cuotaCalculada / 2;

      iteraciones += 1;
      console.log("iteraciones", iteraciones);
    };

    return cuotaSimulada;
  }

  obtenerDiasEntreDosFechas(fechaInicial: Date, fechaFinal: Date): number {
    const milisengundosEnUnDia = 24 * 60 * 60 * 1000;

    return Math.round(Math.abs(Number(fechaFinal) - Number(fechaInicial)) / milisengundosEnUnDia);
  }

}
