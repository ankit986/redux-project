import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

class Poll extends Component {
    render() {
        const toPercent = (obtained, total) => {
            const percent = (obtained * 100) / (total);
            const ans = Math.round(percent * 100) / 100
            return ans;
        }

        const { nameOfAuther, avatarOfAuthor, lengthOfOptionOne, optionOneData, optionTwoData, lengthOfOptionTwo, isInvalidQuestion, selectedOption } = this.props
        if (isInvalidQuestion) {
            return (
                <Redirect to={{ pathname: `/notfound` }} />
            )
        }


        return (
            <div className='center mw5 mw6-ns hidden ba '>
                <h1 className='f4 bg-gray white ma0 pv2'>Poll RESULT</h1>
                <div className='f2 bg-orange white ma0'>
                    <h3 className='ma0'>{nameOfAuther}</h3>
                </div>
                <div className='flex'>
                    <div className='br flex justify-center items-center b--gray'>
                        <img
                            alt={nameOfAuther}
                            src={`${avatarOfAuthor}`}
                            className='br-100 ma2 h4 w4 dib ba b--black-05 pa2'
                        />
                    </div>
                    <div className='center'>
                        <div className={selectedOption === 'optionOne' ? 'ma3 bg-light-silver pa2' : 'ma3'}>
                            <span className='b'>{optionOneData}</span>
                            {selectedOption === 'optionOne'
                                ? <div className='active ma2'>
                                    <span className='b ba i '>
                                        You Selected This Option
                                    </span>
                                </div>
                                : null
                            }
                            <div className='b ba i '>
                                {toPercent(lengthOfOptionOne, lengthOfOptionOne + lengthOfOptionTwo)}% Votes
                            </div>
                            <p>{lengthOfOptionOne} out of {lengthOfOptionOne + lengthOfOptionTwo} votes</p>
                        </div>
                        <hr />
                        <div className={selectedOption === 'optionTwo' ? 'ma3 bg-light-silver pa2' : 'ma3'}>

                            <span className='b'>{optionTwoData}</span>
                            {selectedOption === 'optionTwo'
                                ? <div className='active ma2'>
                                    <span className='b ba b-orange i'>
                                        You Selected This Option
                                    </span>
                                </div>
                                : null
                            }

                            <div className='b ba i '>
                                {toPercent(lengthOfOptionTwo, lengthOfOptionOne + lengthOfOptionTwo)}% Votess
                            </div>
                            <p>{lengthOfOptionTwo} out of {lengthOfOptionOne + lengthOfOptionTwo} votes</p>

                        </div>
                    </div>

                </div>
            </div>
        );
    }
}



function mapStateToProps({ users, questions, authedUser }, { qid }) {
    const question = questions[qid];

    if (!question) {
        return {
            isInvalidQuestion: true
        }
    }

    const optionOne = question.optionOne;
    const optionTwo = question.optionTwo;

    const optionOneData = question.optionOne.text;
    const optionTwoData = question.optionTwo.text;
    
    const selectedOption = optionOne.votes.includes(authedUser) ? 'optionOne' : optionTwo.votes.includes(authedUser) ? 'optionTwo' : null;
    
    const avatarOfAuthor = users[question.author].avataarsURL
    const nameOfAuther = users[question.author].name;
    
    return {
        
        avatarOfAuthor,
        lengthOfOptionOne: optionOne.votes.length,
        lengthOfOptionTwo: optionTwo.votes.length,
        optionTwoData,
        optionOneData,
        selectedOption,
        nameOfAuther

    }
}


export default connect(mapStateToProps)(Poll);
