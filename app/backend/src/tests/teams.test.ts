import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import ModelTeams from '../database/models/ModelTeams'
import  { allTeamsMock, oneTeamMock } from './mock/TeamsMock'

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testing routes by /teams', () => {

    let chaiHttpResponse: Response;

    before(async () => {
        sinon
        .stub(ModelTeams, "findAll")
        .resolves(allTeamsMock as ModelTeams[]);

        sinon
        .stub(ModelTeams, "findOne")
        .resolves(oneTeamMock as ModelTeams);
    });

    after(()=>{
        (ModelTeams.findAll as sinon.SinonStub).restore();
        (ModelTeams.findOne as sinon.SinonStub).restore();
    })

    it('Testing method GET in /teams if return status 200 and teams object ', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');

       //  testing status HTTP:
        expect(chaiHttpResponse.status).to.be.equal(200);

       // Testing all object:
        expect(chaiHttpResponse.body.length).to.be.equal(16);
    });


    it('Testing method GET in /teams if return correct id and teamName', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams');

        // Testing first item:
        expect(chaiHttpResponse.body[0].id).to.exist;
        expect(chaiHttpResponse.body[0].id).to.be.equal(1);
        expect(chaiHttpResponse.body[0].teamName).to.be.string;
        expect(chaiHttpResponse.body[0].teamName).to.be.equal('Avaí/Kindermann');

        // Testing second item:
        expect(chaiHttpResponse.body[1].id).to.exist;
        expect(chaiHttpResponse.body[1].id).to.be.equal(2);
        expect(chaiHttpResponse.body[1].teamName).to.be.string;
        expect(chaiHttpResponse.body[1].teamName).to.be.equal('Bahia');

        // Testing third item:
        expect(chaiHttpResponse.body[2].id).to.exist;
        expect(chaiHttpResponse.body[2].id).to.be.equal(3);
        expect(chaiHttpResponse.body[2].teamName).to.be.string;
        expect(chaiHttpResponse.body[2].teamName).to.be.equal('Botafogo');
    });

    it('Testing method GET in /teams/:id if return status 200 and correct items to object ', async () => {
        chaiHttpResponse = await chai.request(app).get('/teams/1');
        // console.log(chaiHttpResponse.body);
        // testing status HTTP:
        expect(chaiHttpResponse.status).to.be.equal(200);

        // Testing object id:
        expect(chaiHttpResponse.body.id).to.exist;
        expect(chaiHttpResponse.body.id).to.be.equal(1);
        // Testing object teamName:
        expect(chaiHttpResponse.body.teamName).to.be.string;
        expect(chaiHttpResponse.body.teamName).to.be.equal('Avaí/Kindermann');
    });
});