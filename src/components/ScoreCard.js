import React, { Component } from "react";
import { connect } from "react-redux";


class Score extends Component {
    render() {
        const { nameOfUser, userAvatar, answeredQuestions, createdQuesstions, totalScore } = this.props;
        return (
            <div className='center mw5 mw6-ns hidden ba mv2'>

                <div className='f4 bg-orange white mv0 pv2 ph3'>{nameOfUser}</div>

                <div className='flex justify-center items-center'>
                    <div>
                        <img
                            alt={nameOfUser}
                            src={`${userAvatar}`}
                            className='br-100 ma2 h4 w4 dib ba b--black-05 pa2'

                        />
                    </div>
                    <div className='center '>
                        <span>Answered Questions {answeredQuestions}</span>
                        <hr />
                        <span>Created Questions {createdQuesstions}</span>
                    </div>
                    <div className='center  pa3 bg-light-red br-100'>
                        <div>Score</div>
                        <hr className='ba b--gray ' />
                            <span className='b'>{totalScore}</span>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users, questions }, { uid }) {
    const nameOfUser = users[uid].name;
    const userAvatar = users[uid].avataarsURL;
    const answeredQuestions = Object.keys(users[uid].answers).length;
    const createdQuesstions = Object.keys(users[uid].questions).length;
    return {
        userAvatar,
        answeredQuestions,
        nameOfUser,
        createdQuesstions
    }
}

export default connect(mapStateToProps)(Score);