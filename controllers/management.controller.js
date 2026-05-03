import { Query } from 'pg';
import { sequelize } from '../db/database.js';
import { DataTypes } from 'sequelize';

import db from '../models/index.js'
/**
 * controller que maneja todo lo relacionado con la gestión del parqueadero
 * 
 */


const Registro = async (req, res) => {
    try {
        const { placa } = req.body;

        // Validar que se recibieron los datos necesarios
        if (!placa) {
            throw new Error('Faltan datos obligatorios: id_usuario o course_data');
        }
        const fecha = new Date()
        const dia = fecha.getDay()
        const mes = fecha.getMonth()
        const anio = fecha.getFullYear()
        // Crear un nuevo registro en la base de datos
        const nuevoRegistro = await db.Motos.create({
            placa: '12345',
            fecha_ingeso: fecha,
            dia_mes: dia,
            mes: mes,
            anio: anio
        })

       console.log(nuevoRegistro)
       return nuevoRegistro

    } catch (error) {
        console.error('Error en Registro:', error);
       throw error
    }

}



export{
Registro
};