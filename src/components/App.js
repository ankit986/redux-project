import React, { Component, Fragment } from 'react';

import Login from './Login';
import NotFound from './NotFound'
import PrivateRoute from './PrivateRoute';
import NavigationBar from './NavigationBar'
import Home from './Home';
import LeaderBoard from './ScoreBoard';
import AddQuestion from './AddQuestion';
import Question from './Question'

import { handleInitialData } from "../actions/shared";
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'

class App extends Component {
  state = {
    validatedUser: this.props.authedUser === undefined
  }


  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }


  render() {
    const { nameOfUser, authedUser, avatarURL, loading } = this.props

    return (
      <BrowserRouter >
        <Fragment>
          <LoadingBar />
          <NavigationBar authedUser={authedUser} nameOfUser={nameOfUser} avatarURL={avatarURL} />
          <div>
            {loading ? null :
              <Switch >
                <PrivateRoute path='/' exact component={Home} />
                <PrivateRoute path='/add' component={AddQuestion} />
                <PrivateRoute path='/leaderboard' component={LeaderBoard} />
                <PrivateRoute path='/questions/:qid' component={Question} />
                <Route path='/login' component={Login} />
                <Route path='*' component={NotFound} />
              </Switch>
            }
          </div>
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    loading: authedUser === null,
  }
}

export default connect(mapStateToProps)(App);
