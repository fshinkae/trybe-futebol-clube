import { SignOptions, sign, verify } from 'jsonwebtoken';
// import { readFileSync } from 'fs';
// import dotenv from 'dotenv';

class LoginToken {
  private static _token: string;

  private static _secret: string = process.env.JWT_SECRET as string;

  private static _jwtConfig: SignOptions = {
    expiresIn: '7d',
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

  static async tokenValidator(tkn: string) {
    try {
      return verify(tkn, this._secret);
    } catch (error) {
      return null;
    }
  }
}

export default LoginToken;
