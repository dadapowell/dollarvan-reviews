import React, { Component } from 'react';

class DriverInfo extends Component {
    render() {
        return (
            <section className="app-light-gray">
                <div className="row container">
                    <div className="col-sm-9">
                        <h4 className="driver_name">{this.props.name}</h4>
                        <p>Driver ID: {this.props.dvid}</p>

                    </div>
                    <div className="col-sm-3">
                        <img src={this.props.picture} className="App-logo float-left" alt="logo" />
                    </div>
                </div>
            </section>
        )
    }
}

export default DriverInfo;
