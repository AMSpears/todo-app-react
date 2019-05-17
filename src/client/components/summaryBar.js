import React, { Component }from 'react';

class SummaryBar extends Component {

    getRemainingTasks() {
        return Array.from(this.props.todos).filter(todo => todo.status === "active").length
    }

    render() {
        return (
            <div className = "summaryBar">
                <div className = "remaining-taks"> 
                    {`${this.getRemainingTasks()} tasks remaining`}
                    <span className= "completeAllBtn" onClick = {this.props.onClickCompleteAll}> Complete All</span>
                </div>
            </div>
        )
    }
}
    

export default SummaryBar