import { Auth0LockPasswordless } from 'auth0-lock';
import history from '../history';
// import logo from './dollarvan-logo-icon.png';

export default class AuthLock {
    lock = new Auth0LockPasswordless('Pz8H4pSd8C5ucR1XB0ksssbPNqKuRQDj', 'dollarvan.auth0.com', {
        autoclose: true,
        auth: {
            redirectUrl: process.env.NODE_ENV === 'development' ? 'http://localhost:3000/callback' : 'https://dollarvan-reviews.herokuapp.com/callback',
            responseType: 'token id_token',
            params: {
                scope: 'openid profile'
            }
        },
        theme: {
            logo: 'https://dollarvan-reviews.herokuapp.com/images/dollarvan-logo-icon.png',
            primaryColor: '#300075'
        },
        languageDictionary: {
            title: 'DollarVan.nyc',
            passwordlessSMSInstructions: 'To leave a driver comment, you need to create an account.',
            phoneNumberInputPlaceholder: 'enter your phone number'
        }
    });

    constructor() {
        this.handleAuthentication();
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
    }

    login() {
        this.lock.show();
    }

    handleAuthentication() {
        // Add a callback for Lock's authenticated event
        this.lock.on('authenticated', this.setSession.bind(this));
        // Add a callback for Lock's authorization_error event
        this.lock.on('authorization_error', (err) => {
            console.log(err);
            history.replace('/');
        })
    }

    setSession(authResult) {
        if (authResult && authResult.accessToken && authResult.idToken) {
            // Set the time that the access token will expire at
            let expiresAt = JSON.stringify((authResult.expiresIn * 1000) + new Date().getTime());
            localStorage.setItem('access_token', authResult.accessToken);
            localStorage.setItem('id_token', authResult.idToken);
            localStorage.setItem('expires_at', expiresAt);
            this.lock.getUserInfo(authResult.accessToken, function(error, profile) {
                // TO DO: Lookup passenger with profile.name
                // With SMS signups, profile.name is the phone number
                if (profile.name){
                    fetch('/api/passengers/sms/' + profile.name)
                        .then(res => {
                            return res.json();
                        })
                        .then(resJSON => {
                            localStorage.setItem('passenger_id', resJSON.pid);
                            console.log(resJSON.pid);
                        })
                        .catch(err => console.log("Passenger database error: " + err));
                }
            })
            // navigate to the home route
            history.replace('/');
        }
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }
}
