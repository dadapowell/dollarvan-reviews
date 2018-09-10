import React, { Component } from 'react';
import AppHeader from './AppHeader';
import './Login.css';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: '',
            redirect: false
        };
        this.encodeBody = this.encodeBody.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    encodeBody(details) {
        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = details[property];
          // var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }

        return formBody.join("&");
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        // console.log(name + ": " + value);

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {

        const details = {
            user: this.state.user
        };

        const formBody = this.encodeBody(details);

        console.log("Form: " + formBody);

        fetch('/api/sendtoken/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then(res => {
            console.log("GOOD: " + res);
            this.setState({ redirect: true });
        })
        event.preventDefault();
    }

    render() {
        return (
            <div className="App">
              <AppHeader />
              <section id="Success">
                  <div className="row container mx-auto pb-1 pt-3">
                      <div className="col-sm-6 mx-auto">
                          <h6>Sign up</h6>
                          <p>To leave a comment, you need to create an account.</p>
                          <p>Enter your email:</p>
                          <input name="user" type="email" onChange={this.handleInputChange} autoFocus />
                      </div>
                  </div>
                  <div className="row container mx-auto">
                      <div className="col-sm-6 mx-auto">
                          <button className="btn btn-lg" onClick={this.handleSubmit}>Login</button>
                      </div>
                  </div>
              </section>

            </div>
        )
    }
}

export default Login;
