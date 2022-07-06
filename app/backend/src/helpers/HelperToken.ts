import { SignOptions, sign } from 'jsonwebtoken';
import { readFileSync } from 'fs';

class LoginToken {
  private static _token: string;

  private static _secret: string = readFileSync('jwt.evaluation.key', 'utf8');

  private static _jwtConfig: SignOptions = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };

  static async tokenGenerator(user: object): Promise<string> {
    this._token = sign(user, this._secret, this._jwtConfig);

    return this._token;
  }
}

export default LoginToken;
