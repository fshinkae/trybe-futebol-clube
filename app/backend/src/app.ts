import * as express from 'express';
import RoutesLogin from './routes/RoutesLogin';
import RotesTeams from './routes/RoutesTeams';
import RoutesMatches from './routes/RoutesMatches';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();
    this.config();
    this.app.use(express.json());
    this.routes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }

  private routes(): void {
    const login = new RoutesLogin();
    const teams = new RotesTeams();
    const matches = new RoutesMatches();
    this.app.use('/login', login.router);
    this.app.use('/teams', teams.router);
    this.app.use('/matches', matches.router);
  }
}

export { App };

// A execução dos testes de cobertura depende dessa exportação
export const { app } = new App();
