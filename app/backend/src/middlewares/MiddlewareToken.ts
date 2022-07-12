import { NextFunction, Request, Response } from 'express';
import HelperLogin from '../helpers/HelperToken';

class MiddlewareToken {
  static async tokenValidator(req: Request, res: Response, next: NextFunction)
    : Promise<Response | void> {
    try {
      const { authorization } = req.headers;
      const tkn = authorization as string;
      const user = await HelperLogin.tokenValidator(tkn);
      if (user === null) {
        return res.status(401).json({ message: 'Token must be a valid token' });
      }
      next();
    } catch (error) {
      return res.status(401).json({ message: error });
    }
  }
}

export default MiddlewareToken;
