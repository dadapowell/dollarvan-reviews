import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class AppHeader extends Component {
    logout = () => {
      this.props.auth.logout();
    }
    render() {
        return (

            <header className="App-header">
                <div className="row">
                    <div className="col-8">
                        <h1 className="App-title"><Link to="/">DollarVan<span className="logo-weight-normal">.nyc</span></Link></h1>
                    </div>
                    <div className="col-4 logout">
                        {this.props.isLoggedIn &&
                            <a style={{ cursor: 'pointer' }} onClick={this.logout}>Logout</a>
                        }

                    </div>
                </div>

            </header>


        )
    }
}

export default AppHeader;
