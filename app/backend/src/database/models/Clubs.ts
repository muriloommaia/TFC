import { DataTypes, Model } from 'sequelize';
import db from '.';
import { IModelSequelizeClubs } from '../interfaces/ModelsSequelize';
import Matches from './Matches';
// import OtherModel from './OtherModel';

class Clubs extends Model implements IModelSequelizeClubs {
  clubName: string;

  id: number;
  // public <campo>!: <tipo>;
}

Clubs.init({
  // ... Campos
  id: {
    type: DataTypes.INTEGER,
    field: 'id',
    primaryKey: true,
  },
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
  foreignKey: 'id', as: 'matches',
});

Matches.belongsTo(Clubs, {
  foreignKey: 'homeTeam', as: 'homeClub',
});
Matches.belongsTo(Clubs, {
  foreignKey: 'awayTeam', as: 'awayClub',
});
// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });
// sql:'SELECT `id`, `home_team` AS `homeTeam`, `home_team_goals` AS `homeTeamGoals`, `away_team` AS `awayTeam`, `away_team_goals` AS `awayTeamGoals`, `in_progress` AS `inProgress`, `club_id` AS `ClubId` FROM `matchs` AS `Matches`;'

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
