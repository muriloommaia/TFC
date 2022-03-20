import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Matches from '../database/models/Matches';
import { MatchesType } from '../domain';
import { StatusCode } from '../utils/utils';
import { matchesFindAllMock } from './mocks/matchesMocks';
import chaiHttp = require('chai-http');
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /matchs', () => {
  let chaiHttpResponse: Response;
  describe('GET /matchs', () => {
    before(async () => {
      Sinon
        .stub(Matches, "findAll")
        .resolves(matchesFindAllMock as unknown as Model<MatchesType>[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Verify if return is correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs')

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesFindAllMock);

    });
  })
});