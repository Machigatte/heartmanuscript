import { UserManager, WebStorageStateStore, User } from "oidc-client-ts";

class AuthService {
  private userManager?: UserManager;

  private getUserManager() {
    // 只在浏览器环境初始化
    if (!this.userManager && typeof window !== "undefined") {
      const settings = {
        authority: 'https://auth.neptunia.net.eu.org/application/o/orinote/',
        client_id: "TcsOBoqSFur3DpX3K4yFFnPwgQ1a1hzUPoG2xrPm",
        redirect_uri: `${window.location.origin}/login/callback`,
        post_logout_redirect_uri: `${window.location.origin}/login`,
        scope: "openid profile email offline_access",
        filterProtocolClaims: true,
        loadUserInfo: true,
        userStore: new WebStorageStateStore({ store: window.localStorage }),
      };
      this.userManager = new UserManager(settings);
    }
    return this.userManager;
  }

  async getUser(): Promise<User | null> {
    const um = this.getUserManager();
    if (!um) return null; // SSR阶段安全返回null
    return await um.getUser();
  }

  login() {
    const um = this.getUserManager();
    return um?.signinRedirect();
  }

  loginCallback() {
    const um = this.getUserManager();
    return um?.signinCallback();
  }

  logout() {
    const um = this.getUserManager();
    return um?.signoutRedirect();
  }
}

const authService = new AuthService();
export default authService;
