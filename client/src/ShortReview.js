import React, { Component } from 'react';

class ShortReview extends Component {
    render() {
        return (
            <section>
                <div className="row container">
                    <div className="col-sm-12">
                        <h6>Top Comments</h6>
                        {this.props.comments}
                    </div>
                </div>
            </section>
        )
    }
}

export default ShortReview;