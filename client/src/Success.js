import React, { Component } from 'react';
import AppHeader from './AppHeader';
import { Link } from 'react-router-dom';
import './Success.css';

class Success extends Component {
    render () {
        return (
            <div className="App">
                <AppHeader />
                <section id="Success">
                    <div className="container pb-3">
                        <div className="mx-auto col-md-5">
                            <h6>Rate your driver</h6>
                        </div>
                    </div>
                    <div className="container">
                        <div className="mx-auto col-md-5 text-center">
                            <h2>Thanks for rating your driver</h2>
                            <img src="/images/thankyou.jpg" alt="Thank you" />
                            <Link to="/" className="btn btn-lg">Back to homepage</Link>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Success;
