import React, {Component}from 'react';

class SummaryBar extends Component {
    render() {
        return (
        <div className = "summaryBar">
            <div> 
                <span onClick = {this.props.onClickCompleteAll}>Complete All</span>
            </div>
        </div>
        )
    }
}
    

export default SummaryBar