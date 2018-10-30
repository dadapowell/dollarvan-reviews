import history from '../history';
import auth0 from 'auth0-js';

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: 'dollarvan.auth0.com',
    clientID: 'Pz8H4pSd8C5ucR1XB0ksssbPNqKuRQDj',
    redirectUri: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://app.dollarvan.nyc/callback',
    responseType: 'token id_token',
    audience: 'https://dollarvan.auth0.com/userinfo',
    scope: 'openid profile'
  });

  constructor() {
      this.login = this.login.bind(this);
      this.logout = this.logout.bind(this);
      this.handleAuthentication = this.handleAuthentication.bind(this);
      this.isAuthenticated = this.isAuthenticated.bind(this);
  }
  handleAuthentication() {
      this.auth0.parseHash((err, authResult) => {
          if (authResult && authResult.accessToken && authResult.idToken) {
              this.setSession(authResult);
              // history.replace('/');
          } else if (err) {
              history.replace('/');
              console.log(err);
          }
    });
  }

  login() {
      this.auth0.authorize();
  }

  setSession(authResult) {
      // Set the time that the Access Token will expire at
      let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
      localStorage.setItem('access_token', authResult.accessToken);
      localStorage.setItem('id_token', authResult.idToken);
      localStorage.setItem('expires_at', expiresAt);
      // navigate to the home route
      history.replace('/rate');
  }

  logout() {
      // Clear Access Token and ID Token from local storage
      localStorage.removeItem('access_token');
      localStorage.removeItem('id_token');
      localStorage.removeItem('expires_at');
      // navigate to the home route
      history.replace('/');
  }

  isAuthenticated() {
      // Check whether the current time is past the
      // Access Token's expiry time
      let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
      return new Date().getTime() < expiresAt;
  }


}
