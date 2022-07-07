import { SignOptions, sign, verify } from 'jsonwebtoken';
import { readFileSync } from 'fs';

class LoginToken {
  private static _token: string;

  private static _secret: string = readFileSync('src/jwt.evaluation.key', 'utf8');

  private static _jwtConfig: SignOptions = {
    expiresIn: '10h',
    algorithm: 'HS256',
  };

  static async tokenGenerator(user: object): Promise<string> {
    this._token = sign(user, this._secret, this._jwtConfig);

    return this._token;
  }

  static async tokenDecoded(tkn: string) {
    const tokenVerify = verify(tkn, this._secret, this._jwtConfig);
    return tokenVerify;
  }
}

export default LoginToken;
