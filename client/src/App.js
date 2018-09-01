import React, { Component } from 'react';
/* TO DO: replace the logo */
import logo from './logo.svg';
import './App.css';

class App extends Component {
    
    constructor(props){
        super(props);
        this.state = { response: {"Reviews": []}  };
    }
    
    componentDidMount() {
        /* TO DO: make this better */
        const dvid = window.location.href.slice(-4);
        
        fetch('/api/vans/dvid/' + dvid)
            .then(res => {
                return res.json()
            })
            .then(response => {
                this.setState({response})
            })
            .catch(err => console.log("this is an error: " + err));
    }

    render() {
        const response = this.state.response;
        /* TO DO: average all of the star ratings */
        /* TO DO: count the various types of short reviews */
        /* TO DO: format the short reviews to display */
        /* TO DO: handle invalid DVID .. maybe on the input form */
        return (
          <div className="App">
            <header className="App-header">
              <h1 className="App-title">DollarVan<span className="logo-weight-normal">.nyc</span></h1>
            </header>
            <section className="app-light-gray">
                <div className="row container">
                    <div className="col-sm-6">
                        <h4 className="driver_name">{response.driver_name}</h4>
                        <p>Driver ID: {response.dollarvan_id}</p>
                        
                    </div>
                    <div className="col-sm-6">
                        <img src={logo} className="App-logo float-left" alt="logo" />
                    </div>
                </div>
            </section>
            <section>
                <div className="row container">
                    <div className="col-sm-6">
                        <h6>Driver Rating</h6>
                        <h2 className="star_rating">{response.Reviews.length > 0 ? response.Reviews[0].star_rating : " "} stars</h2>
                        <small>{response.Reviews.length} reviews</small>
                    </div>
                </div>
            </section>
            <section>
                <div className="row container">
                    <div className="col-sm-12">
                        <h6>Top Comments</h6>
                        {response.Reviews.map(review => review.short_review ? <div className="reviews_short" key={review.id}><p>{review.short_review}</p></div> : <span key={review.id}></span>
                        )}
                    </div>
                </div>
            </section>
            <section>
                <div className="row container">
                    <div className="col-sm-12">
                        <h6>Rider Reviews</h6>
                        {response.Reviews.map(review => 
                            <div className="reviews_long" key={review.id}><p>{review.long_review}</p></div>
                        )}
                        <div><p className="load-more text-right">Load more comments</p></div>
                    </div>
                </div>
            </section>
          </div>
        )
    }
    
}

export default App;
