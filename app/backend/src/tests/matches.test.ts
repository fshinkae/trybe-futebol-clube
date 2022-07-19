import * as sinon from 'sinon';
import * as chai from 'chai';
import * as mocha from 'mocha';

// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelMatches from '../database/models/ModelMatches';
import ModelUser from '../database/models/ModelUser';
import ModelTeams from '../database/models/ModelTeams'

import  { allMatchesMock, inProgressMatchesMock, createMatchesMock, updateMatchesMock} from './mock/MatchesMock';

import { Response } from 'superagent';

import {userMock} from'./mock/UserMock';
import  { allTeamsMock } from './mock/TeamsMock'

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing routes by /matches', () => {

    let chaiHttpResponse: Response;

    beforeEach(async () => {
        sinon.stub(ModelMatches, 'findAll').resolves(allMatchesMock as any);
        sinon.stub(ModelMatches, 'findOne').resolves(inProgressMatchesMock as any);
        sinon.stub(ModelMatches, 'create').resolves(createMatchesMock as any)
        sinon.stub(ModelMatches, 'update').resolves(updateMatchesMock as any)
        sinon.stub(ModelUser, 'findOne').resolves(userMock as ModelUser) // Ajuda trybe
        sinon.stub(ModelTeams, 'findByPk').resolves(allTeamsMock as any) // Ajuda trybe
      });
    
      afterEach(() => {
        (ModelMatches.findAll as sinon.SinonStub).restore();
        (ModelMatches.findOne as sinon.SinonStub).restore();
        (ModelMatches.create as sinon.SinonStub).restore();
        (ModelMatches.update as sinon.SinonStub).restore();
        (ModelUser.findOne as sinon.SinonStub).restore(); // Ajuda trybe
        (ModelTeams.findByPk as sinon.SinonStub).restore(); // Ajuda trybe
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

  it('Testing method POST in /matches return status 200 and create correctly matches', async () => {
    const input = { email: 'admin@admin.com', password: 'secret_admin'}
    const firstResponse = await chai.request(app).post('/login').send(input);
    const { token } = firstResponse.body;

    const inputMatch = {
      'homeTeam': 16,
      'awayTeam': 8,
      'homeTeamGoals': 2,
      'awayTeamGoals': 2,
      'inProgress': true,
  }
    chaiHttpResponse = await chai.request(app).post('/matches').send(inputMatch).set('Authorization', token)


    expect(chaiHttpResponse.status).to.be.equal(201);
    expect(chaiHttpResponse.body.id).to.exist;
    expect(chaiHttpResponse.body.homeTeam).to.exist;
    expect(chaiHttpResponse.body.awayTeam).to.exist;
    expect(chaiHttpResponse.body.homeTeamGoals).to.exist;
    expect(chaiHttpResponse.body.awayTeamGoals).to.exist;
    expect(chaiHttpResponse.body.inProgress).to.exist;
    expect(chaiHttpResponse.body.inProgress).to.be.equal(true);

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
