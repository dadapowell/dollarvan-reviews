import React, { Component } from 'react';

class StarRating extends Component {
    render() {
        return (
            <section>
                <div className="row container">
                    <div className="col-sm-6">
                        <h6>Driver Rating</h6>
                        <h2 className="star_rating">{this.props.rating}</h2>
                        <small>{this.props.reviews} reviews</small>
                    </div>
                </div>
            </section>
        )
    }
}

export default StarRating;
