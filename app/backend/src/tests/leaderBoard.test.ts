import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Matches from '../database/models/Matches';
import { MatchesType } from '../domain';
import { leaderBoardAllResp, leaderBoardAwayResp, leaderBoardHomeResp } from './mocks/leaderBoardMocks';
import { matchesFindAllMock } from './mocks/matchesMocks';
import chaiHttp = require('chai-http');
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /leaderboard to all, home and away', () => {
  let chaiHttpResponse: Response;
  describe('GET', () => {
    before(async () => {
      Sinon
        .stub(Matches, "findAll")
        .resolves(matchesFindAllMock as unknown as Model<MatchesType>[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Verify if return is correct in the route /leaderboard', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard')

      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardAllResp);

    });
    it('Verify if return is correct in the route /leaderboard/away', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/away')

      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardAwayResp);

    });
    it('Verify if return is correct in the route /leaderboard/home', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/leaderboard/home')

      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(leaderBoardHomeResp);

    });
  });
});