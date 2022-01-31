import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Movie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Movie.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      title: { type: DataTypes.STRING, allowNull: true },
      release_date: { type: DataTypes.STRING, allowNull: true },
      popularity: { type: DataTypes.STRING, allowNull: true },
      vote_average: { type: DataTypes.STRING, allowNull: true },
      poster_path: { type: DataTypes.STRING, allowNull: true },
    },
    {
      timestamps: false,
      freezeTableName: true,
      sequelize,
      modelName: 'Movie',
    },
  )
  return Movie
}
