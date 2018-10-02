import React, { Component } from 'react';
import { Redirect } from 'react-router';
import AppHeader from './AppHeader';
import DriverInfo from './DriverInfo';
import './Rate.css';

/* replace the logo */
import logo from './dollarvan-logo-icon.png';

class Rate extends Component {

    constructor(props){
        super(props);
        this.state = {
            response: {"Reviews": []},
            star_rating: 0,
            short_review: [],
            friendly_driver: false,
            safe_ride: false,
            great_van: false,
            efficient: false,
            long_review: "",
            redirect: false
        };

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        if (this.state.friendly_driver) {
            this.state.short_review.push("Friendly driver");
        }
        if (this.state.safe_ride) {
            this.state.short_review.push("Safe ride");
        }
        if (this.state.great_van) {
            this.state.short_review.push("Great van");
        }
        if (this.state.efficient) {
            this.state.short_review.push("Efficient");
        }

        var details = {
            'star_rating': this.state.star_rating,
            'short_review': this.state.short_review.toString(),
            'long_review': this.state.long_review
        };

        var formBody = [];
        for (var property in details) {
          var encodedKey = encodeURIComponent(property);
          var encodedValue = encodeURIComponent(details[property]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");

        fetch('/api/reviews/' + this.props.passenger_id + "/" + this.state.response.id, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formBody
        })
        .then(res => {
            this.setState({ redirect: true });
        })

        event.preventDefault();
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

    render() {
        if (this.state.redirect) {
            return <Redirect push to="/success" />;
        } else if (!this.props.auth.isAuthenticated()) {
            return <Redirect push to="/" />;
        } else {
            const response = this.state.response;
            const { isAuthenticated } = this.props.auth;

            return (
                <div className="App">
                    {
                        isAuthenticated() && <AppHeader isLoggedIn={true} auth={this.props.auth} />
                    }
                    {
                        !isAuthenticated() && <AppHeader isLoggedIn={false} />
                    }
                    <div className="app-light-gray pt-1">
                        <div className="container">
                            <div className="mx-auto col-offset-3 col-lg-6">
                                <DriverInfo name={response.driver_name} dvid={response.dollarvan_id} picture={logo} />
                            </div>
                        </div>
                    </div>
                    <section className="container">
                        <div className="mx-auto col-offset-3 col-lg-6">
                            <div className="container">
                                <h6>Driver Rating</h6>
                                <p>Leave a rating below:</p>
                                <div className="star-rating">
                                  <fieldset>
                                      <input type="radio" id="star5" name="star_rating" value="5" onChange={this.handleInputChange} /><label htmlFor="star5" title="Outstanding">5 stars</label>
                                      <input type="radio" id="star4" name="star_rating" value="4" onChange={this.handleInputChange} /><label htmlFor="star4" title="Very good">4 stars</label>
                                      <input type="radio" id="star3" name="star_rating" value="3" onChange={this.handleInputChange} /><label htmlFor="star3" title="Good">3 stars</label>
                                      <input type="radio" id="star2" name="star_rating" value="2" onChange={this.handleInputChange} /><label htmlFor="star2" title="Bad">2 stars</label>
                                      <input type="radio" id="star1" name="star_rating" value="1" onChange={this.handleInputChange} /><label htmlFor="star1" title="Very bad">1 stars</label>
                                  </fieldset>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="container">
                        <div className="mx-auto col-offset-3 col-lg-6">
                            <div className="container">
                                <h6>What did you love about the ride?</h6>
                                <div className="checkbox">
                                    <input type="checkbox" id="1" value="Friendly driver" name="friendly_driver" onChange={this.handleInputChange} /><label htmlFor="1">Friendly driver</label>
                                    <input type="checkbox" id="2" value="Safe ride" name="safe_ride" onChange={this.handleInputChange} /><label htmlFor="2">Safe ride</label>
                                    <input type="checkbox" id="3" value="Great van" name="great_van" onChange={this.handleInputChange} /><label htmlFor="3">Great van</label>
                                    <input type="checkbox" id="4" value="Efficient" name="efficient" onChange={this.handleInputChange} /><label htmlFor="4">Efficient</label>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section className="container">
                        <div className="mx-auto col-offset-3 col-lg-6">
                            <div className="container">
                                <h6>Leave a review</h6>
                                <textarea cols="36" rows="4" maxLength="150" name="long_review" onChange={this.handleInputChange} />
                            </div>

                        </div>
                    </section>
                    <section className="container">
                        <div className="mx-auto col-offset-3 col-lg-6">
                            <div className="container">
                                <button className="btn btn-lg" onClick={this.handleSubmit}>Rate this driver</button>
                            </div>

                        </div>
                    </section>
                </div>
            )
        }


    }
}

// class ReviewFormStarRating extends Component {
//     render () {
//         return (
//             <section>
//                 <div className="row container">
//                     <div className="col-sm-6">
//                         <h6>Driver Rating</h6>
//                         <p>{this.props.title}</p>
//                         <div className="star-rating">
//                           <fieldset>
//                               <StarRatingRadio value="5" name="rating" /><StarRatingLabel value="5" title="Outstanding" />
//                               <StarRatingRadio value="4" name="rating" /><StarRatingLabel value="4" title="Very good" />
//                               <StarRatingRadio value="3" name="rating" /><StarRatingLabel value="3" title="Good" />
//                               <StarRatingRadio value="2" name="rating" /><StarRatingLabel value="2" title="Bad" />
//                               <StarRatingRadio value="1" name="rating" /><StarRatingLabel value="1" title="Very bad" />
//                           </fieldset>
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         )
//     }
// }

// class StarRatingRadio extends Component {
//     render() {
//         return (
//             <input type="radio" id={"star" + this.props.value} name="star_rating" value={this.props.value} onChange={this.props.onChange} />
//         )
//     }
// }
//
// class StarRatingLabel extends Component {
//     render() {
//         return (
//             <label htmlFor={"star" + this.props.value} title={this.props.title}>{this.props.value} stars</label>
//         )
//     }
// }

// class ReviewFormShortReview extends Component {
//     render () {
//         return (
//             <section>
//                 <div className="row container">
//                     <div className="col-sm-12">
//                         <h6>{this.props.title}</h6>
//                         <div className="checkbox">
//                             <ReviewFormShortReviewButton num="1" value="Friendly driver" />
//                             <ReviewFormShortReviewButton num="2" value="Safe ride" />
//                             <ReviewFormShortReviewButton num="3" value="Great van" />
//                             <ReviewFormShortReviewButton num="4" value="Efficient" />
//                         </div>
//                     </div>
//                 </div>
//             </section>
//         )
//     }
// }
//
// class ReviewFormShortReviewButton extends Component {
//     render () {
//         return (
//             <div>
//                 <input type="checkbox" id={"checkbox" + this.props.num} value={this.props.value} name="short_review" /><label htmlFor={"checkbox" + this.props.num}>{this.props.value}</label>
//             </div>
//         )
//     }
// }

export default Rate;
