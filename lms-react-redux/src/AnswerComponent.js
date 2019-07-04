import React, { Component } from 'react'

export default class AnswerComponent extends Component {
    state ={
        field: '',
    }


    render() {
        return (
            <div>
                <textarea onChange={this.props.handleOnChange} placeholder="Solution" rows="2"></textarea> 
            </div>
        )
    }
}
