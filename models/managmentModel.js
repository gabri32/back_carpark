export default (sequelize, DataTypes) => {
  const Motos = sequelize.define('Motos', {
  id_moto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  placa: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha_ingreso: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fecha_salida: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  valor_salida: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dia_mes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mes: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  schema: 'parqueadero',     
  tableName: 'motos',        
  timestamps: false,         
});

  return Motos;
};