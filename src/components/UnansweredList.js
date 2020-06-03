import React, { Component } from 'react';
import { connect } from 'react-redux'
import QuestionOutline from './QuestionOutline';

class UnansweredList extends Component {
    render() {

        return (
            <div className=" ">
                <hr />
                <div>
                    <h1 className='f2'>UnansweredList</h1>
                    <ul>
                        {this.props.idOfQuestionUnAnswered.map(qid =>
                            <li key={qid}>
                                <hr />
                                <QuestionOutline qid={qid} isUnAnswered={true} />
                            </li>
                        )}
                    </ul>
                </div>
                <hr />

            </div>
        );
    }
}


function mapStateToProps({ users, questions, authedUser }) {
    const answers = authedUser ? users[authedUser].answers : {}

    const idOfQuestionAnswered = Object.keys(answers)

    const idOfQuestionUnAnswered = Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .filter(question => !idOfQuestionAnswered.includes(question))

    return {
        idOfQuestionUnAnswered
    }
}


export default connect(mapStateToProps)(UnansweredList);
