import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Clubs from '../database/models/Clubs';
import Matches from '../database/models/Matches';
import { ClubsType, MatchesType } from '../domain';
import { MessagesStatus, StatusCode } from '../utils/utils';
import { oneClub } from './mocks/clubsMocks';
import { correctLogin } from './mocks/loginMocks';
import { createMatchCorrect, createMatchProgressFalse, createMatchSameTeam, createMatchSuccess, createMatchTeamNoExistent, matchesFindAllMock, matchesProgressFalse, matchesProgressTrue, updateMatchGoals } from './mocks/matchesMocks';
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
  describe('POST /matchs', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Matches, "create")
        .resolves(createMatchSuccess as unknown as Model<MatchesType>);

      Sinon
        .stub(Clubs, "findByPk")
        .resolves(null as unknown as Model<ClubsType>);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Matches.create as sinon.SinonStub).restore();
      (Clubs.findByPk as sinon.SinonStub).restore();
    })

    it('Verify when te match has the same team', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(createMatchSameTeam)
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.sameTeamMatch);
    });
    it('Verify when the club doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(createMatchTeamNoExistent)
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.teamNotFound);
    });
  });
  describe('POST /matchs', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Matches, "create")
        .resolves(createMatchSuccess as unknown as Model<MatchesType>);

      Sinon
        .stub(Clubs, "findByPk")
        .resolves(oneClub as unknown as Model<ClubsType>);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin)
      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Matches.create as sinon.SinonStub).restore();
      (Clubs.findByPk as sinon.SinonStub).restore();
    })

    it('Verify when the progress is false', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(createMatchProgressFalse)
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.inProgressTrue);
    });
    it('Verify success create', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/matchs')
        .send(createMatchCorrect)
        .set('Authorization', token)

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.created);
      expect(chaiHttpResponse.body).to.be.deep.equal(createMatchSuccess);
    });
  });
  describe('PATCH /matchs/:id/finish', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Matches, "update")
        .resolves(1 as unknown as [number, Model<MatchesType>[]]);
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })

    it('Verify when the club doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/5/finish')

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.matchFinished);
    });
  });
  describe('Update a match /matchs/:id/finish', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Matches, "update")
        .resolves(1 as unknown as [number, Model<MatchesType>[]]);
    });

    after(() => {
      (Matches.update as sinon.SinonStub).restore();
    })

    it('Verify when the club doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .patch('/matchs/5')
        .send(updateMatchGoals)

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.deep.equal({ id: 5, ...updateMatchGoals });
    });
  });
});