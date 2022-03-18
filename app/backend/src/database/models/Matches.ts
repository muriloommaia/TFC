import { DataTypes, Model } from 'sequelize';
import db from '.';
import { IModelSequelizeMatches } from '../interfaces/ModelsSequelize';
// import OtherModel from './OtherModel';

class Matches extends Model implements IModelSequelizeMatches {
  homeTeamGoals: number;

  awayTeam: number;

  awayTeamGoals: number;

  inProgress: boolean;

  homeTeam: number;
}

Matches.init({
  // ... Campos
  homeTeam: {
    type: DataTypes.INTEGER,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
  },
  awayTeam: {
    type: DataTypes.INTEGER,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
  tableName: 'matchs',
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
