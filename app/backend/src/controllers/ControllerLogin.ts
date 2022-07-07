import { Request, Response } from 'express';
import ServiceLogin from '../services/ServiceLogin';

class ControllerLogin {
  static async loginSuccess(req: Request, res: Response): Promise<Response | void> {
    try {
      const { email } = req.body;
      const user = await ServiceLogin.loginValidator(email);
      return res.status(200).json(user);
    } catch (error) {
      res.status(401).json({ message: 'Incorrect email or password' });
    }
  }

  static async loginValidator(req: Request, res: Response): Promise<Response | void> {
    const tkn = req.headers.authorization;
    if (!tkn) {
      return res.status(401).json({ message: 'Token not provided' });
    }
    const user = await ServiceLogin.tokenValidator(tkn as string);
    return res.status(200).json(user);
  }
}

export default ControllerLogin;
