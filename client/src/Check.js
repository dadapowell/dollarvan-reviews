import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import DriverInfo from './DriverInfo.js';
import StarRating from './StarRating.js';
import ShortReview from './ShortReview.js';
import LongReview from './LongReview.js';
/* TO DO: replace the logo */
import logo from './logo.svg';

class Check extends Component {
    
    constructor(props){
        super(props);
        this.state = { response: {"Reviews": []}  };
    }
    
    componentDidMount() {
                
        if (this.props.match.params.driverId) {
            fetch('/api/vans/dvid/' + this.props.match.params.driverId)
                .then(res => {
                    if (res.status === 404) {
                        const err = { "Reviews": [], "driver_name": "Invalid Driver ID" };
                        return err
                    } else {
                        return res.json()
                    }
                })
                .then(response => {
                    this.setState({response})
                })
                .catch(err => console.log("Fatal error: " + err));
        }
    }
    
    /* TO DO: count the various types of short reviews */
    showShortReviews(reviews) {
        return reviews.map(
            review => review.short_review ? <div className="reviews_short" key={review.id}><p>{review.short_review}</p></div> : <span key={review.id}></span>
        )
    }
    
    /* TO DO: average all of the star ratings */
    calculateStarRating(reviews) {
        return reviews.length > 0 ? reviews[0].star_rating : " "
    }
    
    /* TO DO: paginate */
    showLongReviews(reviews) {
        return reviews.map(
            review => <div className="reviews_long" key={review.id}><p>{review.long_review}</p></div>
        )
    }

    render() {
        const response = this.state.response;
        
        /* TO DO: hide components for invalid DVID */
        return (
          <div className="App">
            <AppHeader />
            <DriverInfo name={response.driver_name} dvid={response.dollarvan_id} picture={logo} />
            <StarRating rating={this.calculateStarRating(response.Reviews)} reviews={response.Reviews.length} />
            <ShortReview comments={this.showShortReviews(response.Reviews)} />
            <LongReview reviews={this.showLongReviews(response.Reviews)} />
            
          </div>
        )
    }
    
}

export default Check;
