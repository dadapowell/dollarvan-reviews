import React, { Component } from 'react';
import AppHeader from './AppHeader.js';
import DriverInfo from './DriverInfo.js';
import StarRating from './StarRating.js';
import ShortReview from './ShortReview.js';
import LongReview from './LongReview.js';
/* replace the logo */
import logo from './dollarvan-logo-icon.png';

class Check extends Component {

    constructor(props){
        super(props);
        this.state = {
            response: {"Reviews": []},
            isLoggedIn: false,
            validID: true
        };
    }
    /* TO DO: add isLoggedIn state */
    componentDidMount() {

        if (this.props.match.params.driverId) {
            fetch('/api/vans/dvid/' + this.props.match.params.driverId)
                .then(res => {
                    if (res.status === 404) {
                        const err = { "Reviews": [], "driver_name": "Invalid Driver ID" };
                        return err
                    } else if (res.status === 401) {
                        this.setState({isLoggedIn: false});
                        const err = { "Reviews": [], "driver_name": "Please login" };
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

    /* count and return the various types of short reviews */
    showShortReviews(reviews) {
        const REVIEW_THRESHOLD = 2;
        let shortReviews = [], safe_ride = 0, great_van = 0, efficient = 0, friendly_driver = 0;
        // count the number of times each review appears
        for (var r = 0; r < reviews.length; r++) {
            if (reviews[r].short_review) {
                if (reviews[r].short_review.indexOf('Safe ride') >= 0) {
                    safe_ride += 1
                }
                if (reviews[r].short_review.indexOf('Great van') >= 0) {
                    great_van += 1
                }
                if (reviews[r].short_review.indexOf('Efficient') >= 0) {
                    efficient += 1
                }
                if (reviews[r].short_review.indexOf('Friendly driver') >= 0) {
                    friendly_driver += 1
                }
            }
        }
        // add this short review to the final array if it has been submitted REVIEW_THRESHOLD number of times
        if (safe_ride >= REVIEW_THRESHOLD) shortReviews.push('Safe ride');
        if (great_van >= REVIEW_THRESHOLD) shortReviews.push('Great van');
        if (friendly_driver >= REVIEW_THRESHOLD) shortReviews.push('Friendly driver');
        if (efficient >= REVIEW_THRESHOLD) shortReviews.push('Efficient');

        return shortReviews.map(
            review => <div className="reviews_short" key={review}><p>{review}</p></div>
        )
    }

    /* average all of the star ratings */
    calculateStarRating(reviews) {
        if (reviews.length > 0) {
            let review_count = 0;
            for (var i = 0; i < reviews.length; i++) {
                review_count += reviews[i].star_rating;
            }
            return (Math.round(review_count / reviews.length))
        } else {
            return "0"
        }

    }

    /* TO DO: paginate */
    showLongReviews(reviews) {
        return reviews.map(
            review => <div className="reviews_long" key={review.id}><p>{review.long_review}</p></div>
        )
    }

    render() {
        const response = this.state.response;
        const { isAuthenticated } = this.props.auth;

        /* TO DO: hide components for invalid DVID */
        return (
          <div className="App">

              {
                  isAuthenticated() && <AppHeader isLoggedIn={true} auth={this.props.auth} />
              }
              {
                  !isAuthenticated() && <AppHeader isLoggedIn={false} auth={false} />
              }
              <section id="Driver">
                  <div className="container">
                      <div className="mx-auto col-offset-3 col-lg-6">
                          <DriverInfo name={response.driver_name} dvid={response.dollarvan_id} picture={logo} />
                          <StarRating rating={this.calculateStarRating(response.Reviews)} reviews={response.Reviews.length} />
                          <ShortReview comments={this.showShortReviews(response.Reviews)} />
                          <LongReview reviews={this.showLongReviews(response.Reviews)} />
                      </div>
                  </div>
              </section>


          </div>
        )


    }

}

export default Check;
