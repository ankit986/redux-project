import React, { Component } from 'react';
import QuestionOutline from './QuestionOutline';
import { connect } from 'react-redux'

class AnsweredList extends Component {
    render() {
        return (
            <div className="left ">
                <hr />
                <div>
                    <h1 className='f2'>Answered List</h1>
                    <ul>
                        {this.props.idOfQuestionAnswered.map(qid =>
                            <li key={qid}>
                                <hr />

                                <QuestionOutline qid={qid} />
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
    const ans = authedUser ? users[authedUser].answers : {}


    const qIds = Object.keys(ans)
    const idOfQuestionAnswered = Object.keys(questions)
        .sort((a, b) => questions[b].timestamp - questions[a].timestamp)
        .filter(question => qIds.includes(question))


    return {
        idOfQuestionAnswered
    }
}

export default connect(mapStateToProps)(AnsweredList);
