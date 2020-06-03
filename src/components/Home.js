import React, { Component } from "react";
import AnsweredList from './AnsweredList'
import UnansweredList from './UnansweredList'


class Home extends Component {
    state = {
        list: 'UnansweredList'
    }

    handleClick = (e) => {
        e.preventDefault();
        this.setState({
            list: e.target.innerText
        })
    }

    render() {
        const { list } = this.state
        return (
            <div className='center'>
                <div>
                    <div className='flex  ml6  mr6  justify-center pa4'>
                        <button
                            className='f4  black bg-animate hover-bg-orange   hover-white pa3 '
                            onClick={this.handleClick}>
                            Unanswered List
                    </button>
                        <button
                            className='f4   black bg-animate hover-bg-orange   hover-white pa3   '
                            onClick={this.handleClick}>
                            Answered List
                    </button>
                    </div>
                    <div className='ml6  mr6'>

                        {list !== 'UnansweredList'
                            ? <AnsweredList />
                            : <UnansweredList />}
                    </div>
                </div>
            </div>
        )
    }
}


export default (Home);