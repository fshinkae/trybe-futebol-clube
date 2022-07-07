import { userMock } from './mock/UserMock';
import { app } from '../app';
import { Response } from 'superagent';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));

const { expect } = chai

const niceReq = {
    email: 'admin@admin.com',
    password: 'secret_admin'
}

const badReq = {
    email: 'xablau@xablau.com',
    password: 'any'
}

const reqWithoutEmail = {
    email: '',
    password: 'secret_admin'
}

const reqWithoutPassword = {
    email: 'admin@admin.com',
    password: ''
}

const mockUser = userMock;
let res: Response;

describe('Testing routes by /login', async() => {

    it('testing if return http status 200', async () => {
        res = await chai.request(app)
          .post('/login')
          .send(niceReq);
        expect(res.status).to.equal(200);
        expect(res.body).to.have.property('token');
        expect(res.body).to.have.property('user');
      });
    
      it('testing if without email return http status 400', async () => {
        res = await chai.request(app)
          .post('/login')
          .send(reqWithoutEmail);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('All fields must be filled');
      });
    
      it('testing if request without password return http status 400', async () => {
        res = await chai.request(app)
          .post('/login')
          .send(reqWithoutPassword);
        expect(res.status).to.equal(400);
        expect(res.body.message).to.equal('All fields must be filled');
      });
    
      it('testing if bad request return http status 401', async () => {
        res = await chai.request(app)
          .post('/login')
          .send(badReq);
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Incorrect email or password');
      });
    });
    
    describe('Testing routes login/validate', () => {
      it('testing if validate token return http status 200', async () => {
        res = await chai.request(app)
          .post('/login')
          .send(niceReq)
    
        const { role , token } = res.body;
    
        return chai.request(app)
          .get('/login/validate')
          .set('authorization', token)
          .then((Response) => {
            expect(Response.status).equal(200);
            expect(Response.body).equal("admin");
          })
      });
    
      it('testing if validate token return http status 401', async () => {
        return chai.request(app)
          .get('/login/validate')
          .then((Response) => {
            expect(Response.status).equal(401);
            expect(Response.body.message).equal('Token not provided');
          });
      });
 })
