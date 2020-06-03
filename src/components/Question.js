import React, { Component } from 'react';
import { connect } from 'react-redux'
import { handlesaveQuestionAndAnswer } from '../actions/shared';
import { Redirect } from 'react-router-dom'
import Poll from './Poll';

class Question extends Component {
    state = {
        goToPoll: false
    }

    render() {
        const { optionOne, optionTwo, nameOfAuther, avatarOfAuthor, dispatch } = this.props
        const handleSubmit = (e) => {
            e.preventDefault();
            const { option } = this.form
            const { authedUser, qid } = this.props
            const answer = option.value
            dispatch(handlesaveQuestionAndAnswer({ authedUser, qid, answer }))
            this.setState({
                goToPoll: true
            })
        }

        

        if (this.props.toPoll || this.state.goToPoll) {
            return <Poll qid={this.props.qid} />
        }
        
        if (nameOfAuther === undefined) {
            return <Redirect to={{ pathname: `/notfound` }} />
            
        }
        return (
            <div className='center mw5 mw6-ns hidden ba '>
                <div className='f4 bg-orange white  pv2'>
                    <h1>{nameOfAuther}</h1>
                </div>
                <div className='flex'>
                    <div className='br b--gray'>
                        <img
                            alt=''
                            src={`${avatarOfAuthor}`}
                            className='br-100 ma2 h4 w4 dib ba b--black-05 pa2'
                        />
                    </div>
                    <div className='center'>

                        <h3 className='f4'>Would You Rather?</h3>
                        <form
                            onSubmit={handleSubmit}
                            ref={form => this.form = form}
                        >
                            <div className='mb3'>

                                <input
                                    type="radio"
                                    value={'optionOne'}
                                    name="option"
                                    checked={true}
                                    onChange={() => { }}
                                    className='mr1'
                                />
                                <span className='fw3 pb2'>{optionOne}</span>
                                <label className="db pb2 pt2 fw6 lh-copy f6" >OR</label>
                                <input
                                    type="radio"
                                    value={'optionTwo'}
                                    name="option"
                                    className='mr1'
                                />
                                <span className='fw3 pb2'>{optionTwo}</span>

                            </div>

                            <div className='ma2'>

                                <button
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    disabled={this.handleSubmit}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}



function mapStateToProps({ users, questions, authedUser }, props) {
    const { qid } = props.match.params
   
    const que = questions[qid];

    if (!que) {
        return {
            isInvalidQuestion: true
        }
    }

    const toPoll = que.optionOne.votes.includes(authedUser) ? true :
        (que.optionTwo.votes.includes(authedUser) ? true : false)

    const author = que ? users[que.author] : {};
    const optionOne = que ? que.optionOne.text : '';
    const avatarOfAuthor = author.avataarsURL;
    const optionTwo = que ? que.optionTwo.text : '';
    const nameOfAuther = author.name
    
    return {
        authedUser: authedUser ? authedUser : null,
        qid,
        avatarOfAuthor,
        nameOfAuther,
        optionTwo,
        optionOne,
        toPoll,
    }

}


export default connect(mapStateToProps)(Question);
