import LoginToken from '../helpers/HelperToken';
import ModelUser from '../database/models/ModelUser';
import IUser from '../interfaces/IUser';

class ServiceLogin {
  public static async getLoginService(email: string): Promise<IUser> {
    const user = await ModelUser.findOne({ where: { email } });
    return user as IUser;
  }

  public static async loginValidator(email: string) {
    const user = await this.getLoginService(email);
    const formatReturn = {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
    const token = await LoginToken.tokenGenerator(formatReturn);
    return {
      token,
    };
  }

  public static async tokenValidator(tokenAuthorization: string) {
    const tkn = tokenAuthorization;
    const user = await LoginToken.tokenDecoded(tkn);
    return user as IUser;
  }
}

export default ServiceLogin;
