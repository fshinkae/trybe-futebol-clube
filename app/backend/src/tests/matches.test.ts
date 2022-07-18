import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelMatches from '../database/models/ModelMatches';

import  { allMatchesMock, inProgressMatchesMock, createMatchesMock, updateMatchesMock} from './mock/MatchesMock';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing routes by /matches', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon.stub(ModelMatches, 'findAll').resolves(allMatchesMock as any);
        sinon.stub(ModelMatches, 'findOne').resolves(inProgressMatchesMock as any);
        sinon.stub(ModelMatches, 'create').resolves(createMatchesMock as any)
        sinon.stub(ModelMatches, 'update').resolves(updateMatchesMock as any)
      });
    
      after(() => {
        (ModelMatches.findAll as sinon.SinonStub).restore();
        (ModelMatches.findOne as sinon.SinonStub).restore();
        (ModelMatches.create as sinon.SinonStub).restore();
        (ModelMatches.update as sinon.SinonStub).restore();
      });

  it('Testing method GET in /matches return status 200 and correct object', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')
    // status HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(200);

    // length length of object:
    expect(chaiHttpResponse.body.length).to.be.equal(48)
  });

  it('Testing method GET in /matches return correctly items by object', async () => {
    chaiHttpResponse = await chai.request(app).get('/matches')

    // Testing first item of object:
    expect(chaiHttpResponse.body[0].id).to.exist;
    expect(chaiHttpResponse.body[0].id).to.be.equal(1);
    expect(chaiHttpResponse.body[0].homeTeam).to.exist;
    expect(chaiHttpResponse.body[0].homeTeam).to.be.equal(16);
    expect(chaiHttpResponse.body[0].homeTeamGoals).to.exist;
    expect(chaiHttpResponse.body[0].homeTeamGoals).to.be.equal(1);
    expect(chaiHttpResponse.body[0].awayTeam).to.exist;
    expect(chaiHttpResponse.body[0].awayTeam).to.be.equal(8);
    expect(chaiHttpResponse.body[0].awayTeamGoals).to.exist;
    expect(chaiHttpResponse.body[0].awayTeamGoals).to.be.equal(1);
    expect(chaiHttpResponse.body[0].inProgress).to.exist;
    expect(chaiHttpResponse.body[0].inProgress).to.be.equal(false);
    expect(chaiHttpResponse.body[0].teamHome.teamName).to.exist;
    expect(chaiHttpResponse.body[0].teamHome.teamName).to.be.equal('São Paulo');
    expect(chaiHttpResponse.body[0].teamAway.teamName).to.exist;
    expect(chaiHttpResponse.body[0].teamAway.teamName).to.be.equal('Grêmio');


    // Testing second items of object:
    expect(chaiHttpResponse.body[1].id).to.exist;
    expect(chaiHttpResponse.body[1].id).to.be.equal(2);
    expect(chaiHttpResponse.body[1].homeTeam).to.exist;
    expect(chaiHttpResponse.body[1].homeTeam).to.be.equal(9);
    expect(chaiHttpResponse.body[1].homeTeamGoals).to.exist;
    expect(chaiHttpResponse.body[1].homeTeamGoals).to.be.equal(1);
    expect(chaiHttpResponse.body[1].awayTeam).to.exist;
    expect(chaiHttpResponse.body[1].awayTeam).to.be.equal(14);
    expect(chaiHttpResponse.body[1].awayTeamGoals).to.exist;
    expect(chaiHttpResponse.body[1].awayTeamGoals).to.be.equal(1);
    expect(chaiHttpResponse.body[1].inProgress).to.exist;
    expect(chaiHttpResponse.body[1].inProgress).to.be.equal(false);
    expect(chaiHttpResponse.body[1].teamHome.teamName).to.exist;
    expect(chaiHttpResponse.body[1].teamHome.teamName).to.be.equal('Internacional');
    expect(chaiHttpResponse.body[1].teamAway.teamName).to.exist;
    expect(chaiHttpResponse.body[1].teamAway.teamName).to.be.equal('Santos');
  });

  // it.only('Testing method POST in /matches return status 200 and create correctly matches', async () => {

  //   chaiHttpResponse = await chai.request(app).post('/matches').send({
  //       "homeTeam": 16,
  //       "awayTeam": 8,
  //       "homeTeamGoals": 2,
  //       "awayTeamGoals": 2,
  //       "inProgress": true,
  //   }).set({
  //     Authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJBZG1pbiIsInJvbGUiOiJhZG1pbiIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNjU4MTY2NTI0LCJleHAiOjE2NTg3NzEzMjR9.xNuZlyRjV8rEvzAsCdROkMndQOA_dgDbMIt5coTyM-U'
  //   });
    
    

  //   expect(chaiHttpResponse.status).to.be.equal(201);
    // expect(chaiHttpResponse.body.id).to.exist;
    // expect(chaiHttpResponse.body.id).to.be.equal(1);
    // expect(chaiHttpResponse.body.homeTeam).to.exist;
    // expect(chaiHttpResponse.body.homeTeam).to.be.equal(16);
    // expect(chaiHttpResponse.body.awayTeam).to.exist;
    // expect(chaiHttpResponse.body.awayTeam).to.be.equal(8);
    // expect(chaiHttpResponse.body.homeTeamGoals).to.exist;
    // expect(chaiHttpResponse.body.homeTeamGoals).to.be.equal(2);
    // expect(chaiHttpResponse.body.awayTeamGoals).to.exist;
    // expect(chaiHttpResponse.body.awayTeamGoals).to.be.equal(2);
    // expect(chaiHttpResponse.body.inProgress).to.exist;
    // expect(chaiHttpResponse.body.inProgress).to.be.equal(true);

  // });

  it('POST /matches cria uma partida com sucesso.', async () => {
    const chaiHttpResponseLogin = await chai.request(app).post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin'
    });
    const { token } = chaiHttpResponseLogin.body as any;
    chaiHttpResponse = await chai.request(app).post('/matches').send({
        "homeTeam": 16,
        "awayTeam": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
        "inProgress": true
    }).set({ 'authorization': token })

    const {
      id,
      homeTeam,
      homeTeamGoals,
      awayTeam,
      awayTeamGoals,
      inProgress
    } = chaiHttpResponse.body as any;

    expect(chaiHttpResponse.status).to.be.equal(201);
    console.log(chaiHttpResponse.body)
    expect(id).to.exist;
    expect(id).to.be.equal(1);
    expect(homeTeam).to.exist;
    expect(homeTeam).to.be.equal(16);
    expect(awayTeam).to.exist;
    expect(awayTeam).to.be.equal(8);
    expect(homeTeamGoals).to.exist;
    expect(homeTeamGoals).to.be.equal(2);
    expect(awayTeamGoals).to.exist;
    expect(awayTeamGoals).to.be.equal(2);
    expect(inProgress).to.exist;
    expect(inProgress).to.be.equal(true);
  });

  it('Testing method UPDATE in /matches/:id/finish return status 200', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    // status HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(200);
  });

  it('Testing method UPDATE in /matches/:id/finish return correct message', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1/finish')
    // status message:
    expect(chaiHttpResponse.body.message).to.be.equal('Finished');
  });

  it('Testing method UPDATE in /matches/:id return correct status and object', async () => {
    chaiHttpResponse = await chai.request(app).patch('/matches/1').send({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
    // status HTTP test:
    expect(chaiHttpResponse.status).to.be.equal(200);

    // Object test:
    // console.log(chaiHttpResponse.body);
    expect(chaiHttpResponse.body.id).to.exist;
    expect(chaiHttpResponse.body.id).to.be.equal('1');
    expect(chaiHttpResponse.body.homeTeamGoals).to.exist;
    expect(chaiHttpResponse.body.homeTeamGoals).to.be.equal(3);
    expect(chaiHttpResponse.body.awayTeamGoals).to.exist;
    expect(chaiHttpResponse.body.awayTeamGoals).to.be.equal(1);

  });
  
});
