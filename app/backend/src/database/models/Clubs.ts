import { Model, DataTypes } from 'sequelize';
import db from '.';
import { IModelSequelizeClubs } from '../interfaces/ModelsSequelize';
import Matches from './Matches';
// import OtherModel from './OtherModel';

class Clubs extends Model implements IModelSequelizeClubs {
  clubName: string;
  // public <campo>!: <tipo>;
}

Clubs.init({
  // ... Campos
  clubName: {
    type: DataTypes.STRING,
  },
}, {
  // ... Outras configs
  underscored: true,
  sequelize: db,
  // modelName: 'example',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */
Clubs.hasMany(Matches, {
  foreignKey: 'home_team',
});
Clubs.hasMany(Matches, {
  foreignKey: 'away_team',
});
Matches.belongsTo(Clubs);
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
