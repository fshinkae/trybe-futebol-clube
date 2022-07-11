import * as sinon from 'sinon';

// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/19480
import 'chai-http';
import * as chai from 'chai';
chai.use(require('chai-http'));

import { app } from '../app';
import ModelTeams from '../database/models/ModelTeams'
import { findAllTeams, findTeamById } from './mock/TeamsMock';

import { Response } from 'superagent';

describe('Testing routes by /teams', () => {
    let chaiHttpResponse: Response;
  
    before(async () => {
      sinon
        .stub(ModelTeams, "findAll")
        .resolves(findAllTeams as ModelTeams[]);
  
      sinon.stub(ModelTeams, "findOne").resolves(findTeamById as ModelTeams)
    });
  
    after(()=>{
      (ModelTeams.findAll as sinon.SinonStub).restore();
      (ModelTeams.findOne as sinon.SinonStub).restore();
    })
  
    it('testing if return GET http status 200 return id and teamName', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams');
      const { id, teamName } = chaiHttpResponse.body[0] as any;
      const { id: id2, teamName: tm2 } = chaiHttpResponse.body[1] as any;
  
      expect(chaiHttpResponse.status).toBe(200);
      expect(chaiHttpResponse.body.length).toBe(16);
      expect(id).not.toBeNull();
      expect(id).toBe(1);
      expect(teamName).not.toBeNull();
      expect(teamName).toBe('Avaí/Kindermann');
      expect(id2).not.toBeNull();
      expect(id2).toBe(2);
      expect(tm2).not.toBeNull();
      expect(tm2).toBe('Bahia');
  
    });
  
    it('testing if return GET http status 200 return teams by id', async () => {
      chaiHttpResponse = await chai.request(app).get('/teams/1')
  
      const { id, teamName } = chaiHttpResponse.body as any;
  
      expect(chaiHttpResponse.status).toBe(200);
      expect(id).not.toBeNull;
      expect(id).toBe(1);
      expect(teamName).not.toBeNull;
      expect(teamName).toBe('Avaí/Kindermann');
    });
  });