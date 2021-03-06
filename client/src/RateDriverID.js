import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import { Link, Redirect } from 'react-router-dom';
import PinInput from 'react-pin-input';
import './CheckDriverID.css';
import ReactGA from 'react-ga';

class RateDriverID extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dvid: '',
            allowSubmit: false
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(value,index) {
        if (value.length === 4) {
            this.setState({dvid: value, allowSubmit: true});
        } else {
            this.setState({dvid: '', allowSubmit: false});
        }
    }

    handleSubmit(event) {

    }

    componentDidMount () {
      ReactGA.initialize('UA-98486441-2');
      ReactGA.pageview('/rate');
    }

    render() {
        if (!this.props.auth.isAuthenticated()) {
            return <Redirect push to="/" />;
        } else {
            return (
                <div className="App">
                    <AppHeader />
                    <section>
                        <div className="container pb-3">
                            <div className="mx-auto col-md-5">
                                <h6 className="subtitle">Rate a driver</h6>
                            </div>
                        </div>
                        <div className="container">
                            <div className="mx-auto col-md-5">
                                <p>Enter the driver's 4-digit ID</p>
                            </div>
                        </div>
                    </section>
                    <section className="pb-5">
                        <div className="container">
                            <div className="mx-auto col-md-5">
                                <PinInput
                                  length={4}
                                  onChange={(value, index) => {this.handleInputChange(value,index)}}
                                  type="numeric"
                                  style={{padding: '10px'}}
                                  onComplete={(value, index) => {}}
                                />
                            </div>
                        </div>
                        <div className="container text-center">
                            <div className="mx-auto col-md-5">
                                {
                                    !this.state.allowSubmit &&
                                    <Link to={"/rate/"+this.state.dvid} className="btn btn-lg disabled" aria-disabled="true" tabIndex="-1">Rate driver</Link>
                                }
                                {
                                    this.state.allowSubmit &&
                                    <Link to={"/rate/"+this.state.dvid} className="btn btn-lg">Rate driver</Link>
                                }
                            </div>
                        </div>
                    </section>
                </div>
            )
        }


    }
}

export default RateDriverID;
