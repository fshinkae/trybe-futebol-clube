import * as sinon from 'sinon';
import * as mocha from 'mocha'; 

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const { expect } = chai

import { app } from '../app';
import { Response } from 'superagent';
import ModelUser from '../database/models/ModelUser';
import { userMock } from './mock/UserMock';


describe('Testing routes by /login', () => {

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
    .stub(ModelUser, 'findOne')
    .resolves(userMock as ModelUser)
  });

  after(() => {
    (ModelUser.findOne as sinon.SinonStub).restore()
  });

  it('testing method POST in /login if return status 200 and user object and token',async () => {
    const input = { email: 'admin@admin.com', password: 'super_senha'}
    const { user: {id, username, role, email }, token } = chaiHttpResponse.body as any;
    chaiHttpResponse = (await chai.request(app).post('/login').send(input));

    // status HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(200);

    // id test:
    expect(id).to.exist;

    // username tests:
    expect(username).to.exist;
    expect(username).to.be.equal('Admin');

    //role tests:
    expect(role).to.exist;
    expect(role).to.be.equal('admin');
    
    // email tests:
    expect(email).to.exist;
    expect(email).to.be.equal('admin@admin.com');

    //token tests:
    expect(token).to.exist;
    expect(token).to.be.a.string;
  });

  it('testing method POST in /login if returns ERROR and message when input no have body', async () => {
    const { message } = chaiHttpResponse.body;

    chaiHttpResponse = (await chai.request(app).post('/login'))

    // response HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(400);

    // message tests:
    expect(message).to.exist;
    expect(message).to.be.a.string;
    expect(message).to.be.equal('All fields must be filled');
  })

  it('testing method POST in /login if returns ERROR and message when input body without password', async () => {
    const input = { email: 'admin@admin.com' };
    const { message } = chaiHttpResponse.body;

    chaiHttpResponse = (await chai.request(app).post('/login').send(input))

    // response HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(400);

    // message tests:
    expect(message).to.exist;
    expect(message).to.be.a.string;
    expect(message).to.be.equal('All fields must be filled');
  })

  it('testing method POST in /login if returns ERROR and message when input o without email', async () => {
    const input = { password: 'super_senha' };
    const { message } = chaiHttpResponse.body;

    chaiHttpResponse = (await chai.request(app).post('/login').send(input))

    // response HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(400);

    // message tests:
    expect(message).to.exist;
    expect(message).to.be.a.string;
    expect(message).to.be.equal('All fields must be filled');
  })

  it('testing method GET in /login returns a valid token ', async () => {
    const input = { email: 'admin@admin.com', password: 'super_senha'}
    const firstResponse = await chai.request(app).post('/login').send(input);
    const { token } = firstResponse.body as any;

    chaiHttpResponse = await chai.request(app).get('/login/validate').set('authorization', token)

    // response HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(200);

    // body test:
    expect(chaiHttpResponse.body).to.be.equal('admin');
  })
})
