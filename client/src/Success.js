import React, { Component } from 'react';
import AppHeader from './AppHeader';
import './Success.css';

class Success extends Component {
    render () {
        return (
            <div className="App">
                <AppHeader />
                <section id="Success">
                    <div className="row container mx-auto pb-3">
                        <div className="mx-auto col-sm-6">
                            <h6>Rate your driver</h6>
                        </div>
                    </div>
                    <div className="row container mx-auto">
                        <div className="mx-auto col-sm-6 text-center">
                            <h2>Thanks for rating your driver</h2>
                            <img src="/images/thankyou.jpg" alt="Thank you" />
                            <button className="btn btn-lg">Back to homepage</button>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}

export default Success;
