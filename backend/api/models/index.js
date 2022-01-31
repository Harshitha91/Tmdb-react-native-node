import Sequelize from 'sequelize'
import config from '../config/config.js'
import Movie from './movie.js'

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  )
}

let model
model = Movie(sequelize, Sequelize.DataTypes)
db[model.name] = model

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

export default db
