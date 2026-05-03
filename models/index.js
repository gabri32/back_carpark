import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../db/database.js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);

const db = {};

// Leer todos los archivos del directorio
const files = fs.readdirSync(__dirname)
  .filter(file => {
    return (
      file !== basename &&
      file.endsWith('.js')
    );
  });

for (const file of files) {
  const { default: model } = await import(path.join(__dirname, file));
  const modelInstance = model(sequelize, DataTypes);
  db[modelInstance.name] = modelInstance;
}
console.log(db)
// Relaciones (si tienes asociaciones después)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;