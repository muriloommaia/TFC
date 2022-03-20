import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Matches from '../database/models/Matches';
import { MatchesType } from '../domain';
import { StatusCode } from '../utils/utils';
import { matchesFindAllMock, matchesProgressFalse, matchesProgressTrue } from './mocks/matchesMocks';
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
    it('Verify if return is correct when the route is /match?inProgress=random', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs?inProgress=random')

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesFindAllMock);

    });
  })
  describe('GET /matchs?inProgress=true', () => {
    before(async () => {
      Sinon
        .stub(Matches, "findAll")
        .resolves(matchesProgressTrue as unknown as Model<MatchesType>[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Verify if return is correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs?inProgress=true')

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesProgressTrue);

    });
  });
  describe('GET /matchs?inProgress=false', () => {
    before(async () => {
      Sinon
        .stub(Matches, "findAll")
        .resolves(matchesProgressFalse as unknown as Model<MatchesType>[]);
    });

    after(() => {
      (Matches.findAll as sinon.SinonStub).restore();
    })

    it('Verify if return is correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/matchs?inProgress=false')

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body).to.be.deep.equal(matchesProgressFalse);

    });
  });
});