import { Model, DataTypes } from 'sequelize';
import getPostgresDb from '@loaders/db';

const sequelize = getPostgresDb();

/**
 * @typedef {import('@main/models').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 */

/**
 * @param {DataTypes} DataTypes
 * @param {Sequelize} sequelize
 * @returns
 */
class Publication extends Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    Publication.belongsTo(models.users, {
      foreignKey: 'student_id',
    });
  }
}

Publication.init(
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    student_id: {
      allowNull: false,
      type: DataTypes.TEXT,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    year: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    schema: 'users',
    modelName: 'publications',
    tableName: 'publications',
  },
);

export default Publication;
