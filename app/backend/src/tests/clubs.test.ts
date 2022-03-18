import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Clubs from '../database/models/Clubs';
import { ClubsType } from '../domain';
import { MessagesStatus, StatusCode } from '../utils/utils';
import { clubsFindAllMock } from './mocks/clubsMocks';
import { correctLogin, invalidToken } from './mocks/loginMocks';
import chaiHttp = require('chai-http');
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /clubs', () => {
  let chaiHttpResponse: Response;
  describe('findAllVerification', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Clubs, "findAll")
        .resolves(clubsFindAllMock as unknown as Model<ClubsType>[]);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);

      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Clubs.findAll as sinon.SinonStub).restore();
    })

    it('Verify when the token is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .set('Authorization', invalidToken);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.invalidToken);
    });
    it('Verify when the token doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.tokenNotFound);
    });

    it('Verify if return is correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a('array');
      expect(chaiHttpResponse.body[0].clubName).to.be.equal(clubsFindAllMock[0].clubName);
      expect(chaiHttpResponse.body).deep.equal(clubsFindAllMock);
    });
  })
  describe('findById verification', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Clubs, "findByPk")
        .resolves(clubsFindAllMock[0] as unknown as Model<ClubsType>);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);

      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    })

    it('Verify when the token is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .set('Authorization', invalidToken);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.invalidToken);
    });
    it('Verify when the token doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.tokenNotFound);
    });

    it('Verify if return is correct', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/1')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a.property('id');
      expect(chaiHttpResponse.body).to.be.a.property('clubName');
      expect(chaiHttpResponse.body.clubName).to.be.equal(clubsFindAllMock[0].clubName);
      expect(chaiHttpResponse.body.id).to.be.equal(clubsFindAllMock[0].id);
    });
  });
  describe('findById verification', () => {
    let token: string;
    before(async () => {
      Sinon
        .stub(Clubs, "findByPk")
        .resolves(null as unknown as Model<ClubsType>);

      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);

      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Clubs.findByPk as sinon.SinonStub).restore();
    })

    it('Verify bad request status when the id club doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/clubs/50')
        .set('Authorization', token);

      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.clubNotFound);
    });

  });

});