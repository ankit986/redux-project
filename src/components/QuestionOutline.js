import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom'

class QuestionOutline extends Component {
    state = {
        alreadyClicked: false,
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            alreadyClicked: true,
        })

    }
    render() {
        const { nameOfAuther, authorAvator, optionOneData, qid } = this.props
        if (this.state.alreadyClicked) {
            return <Redirect to={{ pathname: `/questions/${qid}` }} />
        }


        return (
            <div className='center mw5 mw6-ns br2  ba mv2'>
                <div className='f4 bg-orange white br2 mv0 pv2 ph3'>{nameOfAuther}</div>
                <div className='flex'>
                    <div className='br b--gray'>
                        <hr />
                        <img
                            alt={nameOfAuther}
                            src={`${authorAvator}`}
                            className='br-100 h4 w4  ma2  dib ba b--black-05 pa2'
                        />
                        <hr />

                    </div>
                    <div className='center'>

                        <h3>Would You Rather?</h3>
                        <p className='f5 fw4 gray mt0'>{optionOneData}...</p>
                        <button className='pa2 btn ma2' onClick={this.handleClick}>ViewPoll</button>
                    </div>
                </div>
            </div>
        )
    }
}



function mapStateToProps({ users, questions }, { qid }) {
    const author = questions[qid].author
    const authorAvator = users[author].avataarsURL;
    const optionOneData = questions[qid].optionOne.text;
    const nameOfAuther = users[author].name;

    return {
        optionOneData,
        authorAvator,
        nameOfAuther,
    }
}

export default connect(mapStateToProps)(QuestionOutline);