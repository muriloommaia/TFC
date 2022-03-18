import ClubsController from '../controllers/clubs.cotroller';
import ClubsModel from '../models/clubs.model';
import ClubsService from '../services/clubs.service';

const clubsFactory = (): ClubsController => {
  const clubsModel = new ClubsModel();
  const clubsService = new ClubsService(clubsModel);
  const clubsController = new ClubsController(clubsService);
  return clubsController;
};

export default clubsFactory;
