import React, {Component}from 'react';
import Button from "./button"

class SummaryBar extends Component {
    render() {
        return (
        <div className = "summaryBar">
          <Button 
            text= "complete all"
            onClick = {this.props.onClickCompleteAll}
            />
        </div>
        )
    }
}
    

export default SummaryBar