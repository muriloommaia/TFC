import * as chai from 'chai';
import { Model } from 'sequelize/types';
import { Response } from 'superagent';
import { app } from '../app';
import Users from '../database/models/Users';
import { User } from '../domain';
import { MessagesStatus, StatusCode } from '../utils/utils';
import { correctLogin, findEmailCorrect, findEmailWrong, invalidToken, loginWithoutEmail, loginWithoutPass, wrongLoginEmail, wrongLoginPass, wrongLoginPassLength } from './mocks/loginMocks';
import chaiHttp = require('chai-http');
import Sinon = require('sinon');

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes da rota /login', () => {
  let chaiHttpResponse: Response;
  describe('Verifications field', () => {

    before(async () => {
      Sinon
        .stub(Users, "findOne")
        .resolves(findEmailCorrect as unknown as Model<User>);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })

    it('Verify when the user send a request without the email field', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginWithoutEmail);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.allFieldsFilled);
    });
    it('Verify when the user send a request without the password field', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(loginWithoutPass);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.allFieldsFilled);
    });
    it('Verify when the user send a request with the wrong type email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(wrongLoginEmail);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.incorrectEmail);
    });
    it('Verify when the user send a request with the wrong password length', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(wrongLoginPassLength);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.incorrectPassword);
    });
    it('Verify when the user send a request with the wright email but wrong password', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(wrongLoginPass);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal(MessagesStatus.incorrectPassword);
    });
  })
  describe('Verification login', () => {

    before(async () => {
      Sinon
        .stub(Users, "findOne")
        .resolves(findEmailCorrect as unknown as Model<User>);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    it('Verify if the login is possible', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.body).to.be.a.property('user');
      expect(chaiHttpResponse.body.user).to.be.a.property('id').equal(findEmailCorrect.id)
      expect(chaiHttpResponse.body.user).to.be.a.property('role').equal(findEmailCorrect.role);
      expect(chaiHttpResponse.body.user).to.be.a.property('username').equal(findEmailCorrect.username);
    });
  })
  describe('Verification db', () => {

    before(async () => {
      Sinon
        .stub(Users, "findOne")
        .resolves(findEmailWrong as unknown as Model<User>);
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    it('Verify when db to not has the email', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.unauthorized);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body).to.be.a.property('message').to.be.equal(MessagesStatus.incorrectEmail);

    });
  })
});

describe('Test rota login/validate', () => {
  let chaiHttpResponse: Response;
  let token: string;
  describe('Verification login', () => {

    before(async () => {
      Sinon
        .stub(Users, "findOne")
        .resolves(findEmailCorrect as unknown as Model<User>);
      chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .send(correctLogin);

      token = chaiHttpResponse.body.token;
    });

    after(() => {
      (Users.findOne as sinon.SinonStub).restore();
    })
    it('Verify status is ok when all is wright', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', `${token}`);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.ok);
      expect(chaiHttpResponse.text).to.be.a.equal('user');
    });
    it('Verify status is 400 when the Authorization doesn\'t exist', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate');
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body).to.be.a.property('message').to.be.equal(MessagesStatus.tokenNotFound);
    });
    it('Verify status is 400 when the Authorization exist but it\'s wrong', async () => {
      token = invalidToken;
      chaiHttpResponse = await chai
        .request(app)
        .get('/login/validate')
        .set('Authorization', token);
      expect(chaiHttpResponse.status).to.be.equal(StatusCode.badRequest);
      expect(chaiHttpResponse.body).to.be.a.property('message');
      expect(chaiHttpResponse.body).to.be.a.property('message').to.be.equal(MessagesStatus.invalidToken);
    });
  })
})