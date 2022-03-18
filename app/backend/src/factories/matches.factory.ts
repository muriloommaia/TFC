import MatchesController from '../controllers/matches.controller';
import MatchesModel from '../models/matches.model';
import MatchesService from '../services/matches.service';

const matchesFactory = (): MatchesController => {
  const matchesModel = new MatchesModel();
  const matchesService = new MatchesService(matchesModel);
  const matchesController = new MatchesController(matchesService);
  return matchesController;
};

export default matchesFactory;
