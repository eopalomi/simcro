
import {AnyObject} from '@loopback/repository';
import moment from 'moment';
import {v4 as uuid} from 'uuid';
import {Cronograma} from '../models';

let CronogramaPagos = (plazo: number, tea: number, cuota: number, montoFinanciar: number, fecha_inicio: Date, fecha_vencimiento: Date): Cronograma[] => {
  let cantidadCuotas = new Array(plazo).fill(0);
  let CronogramaPago: Cronograma[] = [];
  let saldoCapital = montoFinanciar;
  let saldoInicial: number;
  let saldoFinal: number;
  let numeroCuota: number = 0;
  let fechaInicio: Date;
  let fechaVencimiento: Date;
  let interesesCuota: number;
  let capitalCuota: number;
  let diasCuota: number;
  let id_uuid: string = uuid();

  cantidadCuotas.forEach((rs, idx, arr) => {
    numeroCuota = idx + 1;

    if (numeroCuota === 1) {
      fechaInicio = moment(fecha_inicio, 'YYYY-MM-DD').toDate();
      fechaVencimiento = moment(fecha_vencimiento, 'YYYY-MM-DD').toDate();
      diasCuota = obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
      saldoInicial = saldoCapital;
    } else {
      fechaInicio = fechaVencimiento;
      fechaVencimiento = moment(fechaVencimiento, 'YYYY-MM-DD').add(1, 'months').toDate();
      diasCuota = obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
      saldoInicial = saldoFinal;
    };


    interesesCuota = saldoInicial * ((1 + (tea / 100)) ** (diasCuota / 360) - 1);
    capitalCuota = (cuota - interesesCuota);
    saldoFinal = saldoInicial - capitalCuota;

    if (numeroCuota === plazo) {
      capitalCuota = saldoInicial;
      cuota = capitalCuota + interesesCuota;
      saldoFinal = 0.00
    };

    CronogramaPago.push({
      id_cronograma: id_uuid,
      numeroCuota: numeroCuota,
      fechaInicio: moment(fechaInicio, 'YYYY-MM-DD').toISOString().substring(0, 10),
      fechaVencimiento: moment(fechaVencimiento, 'YYYY-MM-DD').toISOString().substring(0, 10),
      diasCuota: diasCuota,
      saldoInicial: Number(saldoInicial.toFixed(2)),
      saldoFinal: Number(saldoFinal.toFixed(2)),
      cuota: Number(cuota.toFixed(2)),
      interesCuota: Number(interesesCuota.toFixed(2)),
      capitalCuota: Number(capitalCuota.toFixed(2)),
      seguroBien: 0.00,
      seguroDesgravamen: 0.00,
      getId: function () {
        throw new Error('Function not implemented.');
      },
      getIdObject: function (): Object {
        throw new Error('Function not implemented.');
      },
      toJSON: function (): Object {
        throw new Error('Function not implemented.');
      },
      toObject: function (options?: AnyObject | undefined): Object {
        throw new Error('Function not implemented.');
      }
    })
  });

  return CronogramaPago;
}

let obtenerDiasEntreDosFechas = (fechaInicial: Date, fechaFinal: Date): number => {
  const miliSegundosEnUnDia = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs(Number(fechaFinal) - Number(fechaInicial)) / miliSegundosEnUnDia);
};

export {CronogramaPagos};

