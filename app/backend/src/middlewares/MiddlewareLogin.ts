import { Request, Response, NextFunction } from 'express';
import * as bcryptjs from 'bcryptjs';
import ModelUser from '../database/models/ModelUser';

class MiddlewareLogin {
  static emailValidator(req: Request, res: Response, next: NextFunction): Response | void {
    const { email } = req.body;
    const emailRegex = /\S+@\S+.\S+/;

    if (email === '' || !email) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    next();
  }

  static async passwordValidator(req: Request, res: Response, next: NextFunction) {
    // https://stackoverflow.com/questions/40076638/compare-passwords-bcryptjs
    const { email, password } = req.body;
    const user = await ModelUser.findOne({ where: { email } });

    if (password === '' || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }

    if (user) {
      const passwordValidator = await bcryptjs.compare(password, user.password);
      if (!passwordValidator) {
        return res.status(401).json({ message: 'Incorrect email or password' });
      }
    }
    next();
  }
}

export default MiddlewareLogin;
