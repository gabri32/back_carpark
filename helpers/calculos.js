/**
 * Funciones genericas para calculos 
 */


const calcularValorHora = ({ fecha_ini, fecha_salida, valor_hora, valor_extra }) => {
  if(!fecha_ini|| !fecha_salida|| !valor_hora|| !valor_extra)
  {
    throw new Error("datos para calculo incompletos")
  }
  const inicio = new Date(fecha_ini);
  const salida = new Date(fecha_salida);
  const diferenciaMs = salida - inicio;
  const horasDiff = diferenciaMs / (1000 * 60 * 60);
  const horas = horasDiff < 1 ? 1 : horasDiff
  let total = 0;

  if (horas <= 1) {
    total = horas * valor_hora;
  } else {
    const horasNormales = 1;
 
    const horasExtras = Math.ceil(horas) - 1;
    total = (horasNormales * valor_hora) + (horasExtras * valor_extra);
  }

  return {
    horas: Math.ceil(horas),
    total: Math.round(total)
  };
};


export {
  calcularValorHora
}
