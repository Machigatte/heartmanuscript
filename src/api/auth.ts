import { UserManager } from "oidc-client-ts";

class AuthService {
  public userManager: UserManager;

  constructor() {
    const settings = {
      authority: 'https://auth.neptunia.net.eu.org/application/o/orinote-test/',
      client_id: "TcsOBoqSFur3DpX3K4yFFnPwgQ1a1hzUPoG2xrPm",
      redirect_uri: "http://localhost:3000/login/callback",
      post_logout_redirect_uri: "http://localhost:3000/login",
      scope: "openid profile email offline_access",
      filterProtocolClaims: true,
      loadUserInfo: true
    };
    this.userManager = new UserManager(settings);
  }

  getUser() {
    return this.userManager.getUser();
  }

  login() {
    return this.userManager.signinRedirect();
  }

  loginCallback() {
    return this.userManager.signinCallback();
  }

  logout() {
    return this.userManager.signoutRedirect();
  }
}

const authService = new AuthService();
export default authService;
