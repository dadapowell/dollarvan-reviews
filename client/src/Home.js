import React, { Component } from 'react';
import { Link } from "react-router-dom";
import AppHeader from './AppHeader';
import './Home.css';

class Home extends Component {
  // calls the login method in authentication service
  login = () => {
    this.props.auth.login();
  }
  // calls the logout method in authentication service
  logout = () => {
    this.props.auth.logout();
  }
  render() {
    // calls the isAuthenticated method in authentication service
    const { isAuthenticated } = this.props.auth;
    return (
        <div className="App">
            <AppHeader />
            <section className="app-blue text-center" id="Home">
                <div className="mx-auto row container text-center">
                    <div className="mx-auto col-sm-6">
                        <h4>Find a safe dollar van ride</h4>
                        <p>Feel safe about your ride by checking or giving reviews of drivers.</p>
                    </div>
                </div>
                <div className="mx-auto row" id="app-blue-gray">
                    <div className="col-sm-12">
                        <img src="/images/dv-van.jpg" alt="Dollar Van icon" />
                    </div>
                </div>
            </section>
            <section className="app-dark-gray pb-5 text-center">
                <div className="mx-auto row container">
                    <div className="mx-auto col-sm-6">
                        <Link to="/check" className="btn btn-lg">Check a driver</Link>
                    </div>
                </div>
                {
                  isAuthenticated() &&


                              <div className="mx-auto row container">
                                  <div className="mx-auto col-sm-6">
                                      <Link to="/rate" className="btn btn-lg">Rate a driver</Link>
                                  </div>
                              </div>

                }
                {
                  !isAuthenticated() && (

                          <div className="mx-auto row container">
                              <div className="mx-auto col-sm-6">
                                  <button className="btn btn-lg" onClick={this.login}>Rate a driver</button>
                              </div>
                          </div>

                  )
                }
            </section>
          </div>
      );
    }
  }

  export default Home;
