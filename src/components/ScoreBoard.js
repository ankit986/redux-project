import React, { Component } from 'react';
import { connect } from 'react-redux'
import ScoreCard from './ScoreCard';

class ScoreBoard extends Component {
    render() {
        const { scoreByTheUser } = this.props;
        return (
            <div className="ScoreBoard">
                <ul>
                    {scoreByTheUser.map(user => {
                        return(
                        <li key={user[0]}>
                            <ScoreCard uid={user[0]} totalScore={user[1]} />
                        </li>)
                    })}
                </ul>
            </div>
        );
    }
}



function mapStateToProps({ users  }) {
    const scoreByTheUser = []
    for (let user in users) {
        let totalScore = Object.keys(users[user].answers).length + users[user].questions.length;
        scoreByTheUser.push([user, totalScore])
    }
    scoreByTheUser.sort((a, b) => b[1] - a[1])
    return {
        scoreByTheUser
    }
}



export default connect(mapStateToProps)(ScoreBoard);
