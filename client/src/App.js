import React, { Component } from 'react';
import AppHeader from './AppHeader';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <AppHeader />
                <div className="mx-auto row container">
                    <div className="mx-auto col-sm-6">
                        <h6>Enter Driver ID</h6>
                    </div>
                </div>
            </div>
        )
    }
}


export default App;
