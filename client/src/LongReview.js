import React, { Component } from 'react';

class LongReview extends Component {
    render() {
        return (
            <section>
                <div className="row container">
                    <div className="col-sm-12">
                        <h6>Rider Reviews</h6>
                        {this.props.reviews}
                        {/* <div><p className="load-more text-right">Load more comments</p></div> */}
                    </div>
                </div>
            </section>
        )
    }
}

export default LongReview;
