import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { handeladdQuestion } from "../actions/shared";
import { connect } from 'react-redux'

class Question extends Component {
    state = {
        optionOneData: '',
        optionTwoData: '',
        goToHome: false,
    }
    handleOptionTwo = (e) => {
        e.preventDefault();
        this.setState({
            optionTwoData: e.target.value
        })
    }

    handleOptionOne = (e) => {
        e.preventDefault();
        this.setState({
            optionOneData: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.dispatch(handeladdQuestion(this.state.optionOneData, this.state.optionTwoData))
        this.setState({
            goToHome: true
        })
    }

  
    





    render() {
        if (this.state.goToHome)
            return <Redirect to='/' />

        return (
            <div className='center  mw5 mw6-ns br3 ba '>

                <div className='f3 bg-orange  black  pv2'>
                    Create New Question
                </div>
                <div>
                <div>
                    <h3 className=''>Complete The Question</h3>
                    <div>
                        <h3>Would You Rather...</h3>
                        <form
                            onSubmit={this.handleSubmit} >
                            <input
                                className=' ba b--black-20 input-reset pa2 mb2 db center'
                                placeholder='Enter Option One Text Here'
                                onChange={this.handleOptionOne}
                                value={this.state.optionOneData}
                            />
                            <span>OR</span>
                            <input
                                className=' ba b--black-20 input-reset pa2 mb2 db center'
                                placeholder='Enter Option Two Text Here'
                                onChange={this.handleOptionTwo}
                                value={this.state.optionTwoData}
                            />
                            <div className='ma2'>

                                <button
                                    className="b ph3 pv2  ba b--black bg-transparent pointer f6 dib"
                                    disabled={this.state.optionOneData === '' || this.state.optionTwoData === ''}>Submit</button>
                            </div>
                        </form>
                    </div>


                </div>
                </div>
            </div>
        );
    }
}




export default connect()(Question);
