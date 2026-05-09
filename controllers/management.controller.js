import { Query } from 'pg';
import sequelize from '../db/database.js';
import { DataTypes } from 'sequelize';
import * as calculos from '../helpers/calculos.js'
import db from '../models/index.js';
/**
 * controller que maneja todo lo relacionado con la gestión del parqueadero
 * 
 */


const Registro = async (req) => {
    try {
        console.log(req.body)
        const { placa, gabeta, cascos } = req.body;

        // Validar que se recibieron los datos necesarios
        if (!placa) {
            throw new Error('Faltan datos obligatorios');
        }

        const fecha = new Date()
        const dia = fecha.getDate()
        const mes = (fecha.getMonth() + 1)
        const anio = fecha.getFullYear()
        // Crear un nuevo registro en la base de datos
        const nuevoRegistro = await db.Motos.create({
            placa: placa.toString(),
            fecha_ingreso: fecha,
            dia_mes: dia,
            mes: mes,
            anio: anio,
            gabeta: !gabeta ? 0 : gabeta,
            cascos
        })

        return nuevoRegistro

    } catch (error) {
        console.error('Error en Registro:', error);
        throw error
    }

}
const registrar_salida = async (req) => {
    try {

        const { placa } = req.body
        if (!placa) {
            throw new Error("faltan valores de entrada")
        }
        const moto = await db.Motos.findOne({ where: { placa: placa } })
        // const motoValid = 
        const data = await db.Precio.findOne();
        const fecha_ini = moto.fecha_ingreso;
        const fecha_salida = new Date();
        const valor_hora = data.precio;
        const valor_extra = 600;


        const valor = await calculos.calcularValorHora({ fecha_ini, fecha_salida, valor_hora, valor_extra })
        return valor
    } catch (error) {
        console.log(error)
        throw error
    }
}
const MotosActuales = async () => {
    try {
        const motos = await db.Motos.findAll({})
        return motos
    } catch (error) {
        console.log(error)
        throw error
    }
}
const salidaFinal = async ({ id_moto, valor_salida }) => {
    try {

        const fecha_salida = new Date();

        const [actualizado] = await db.Motos.update(
            {
                valor_salida,
                fecha_salida
            },
            {
                where: { id_moto }
            }
        );

        if (!actualizado) {
            throw new Error('Moto no encontrada');
        }

        return await db.Motos.findByPk(id_moto);

    } catch (error) {
        console.log(error);
        throw error;
    }
};
export {
    Registro,
    registrar_salida,
    MotosActuales,
    salidaFinal
};