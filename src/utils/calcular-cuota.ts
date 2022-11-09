import moment from 'moment';

let calcularCuota = (plazo: number, tea: number, montoFinanciar: number, fecha_inicio: Date, fecha_vencimiento: Date): number => {
  let cantidadCuotas = new Array(plazo).fill(0);
  let cuotaSimulada: number = 100000;
  let cuotaCalculada: number = cuotaSimulada / 2;
  let iteraciones: number = 0;

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
        diasCuota = obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
      } else {
        fechaInicio = fechaVencimiento;
        fechaVencimiento = moment(fechaVencimiento, 'YYYY-MM-DD').add(1, 'months').toDate();
        diasCuota = obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento);
      };

      interesesCuota = saldoCapital * ((1 + (tea / 100)) ** (diasCuota / 360) - 1);
      saldoCapital = saldoCapital - (cuotaSimulada - interesesCuota);
      if (numeroCuota === plazo)
        console.log("Fecha Inicio", fechaInicio, "Fecha Vencimiento", fechaVencimiento, obtenerDiasEntreDosFechas(fechaInicio, fechaVencimiento), saldoCapital, "cuota", cuotaSimulada);
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

let obtenerDiasEntreDosFechas = (fechaInicial: Date, fechaFinal: Date): number => {
  const milisengundosEnUnDia = 24 * 60 * 60 * 1000;

  return Math.round(Math.abs(Number(fechaFinal) - Number(fechaInicial)) / milisengundosEnUnDia);
};

export {calcularCuota};

