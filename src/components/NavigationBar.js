import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import { handleSetAuthedUser } from '../actions/setAuthedUser'
import auth from '../util/auth';

function NavBar(props) {

    const handleLogin = (e) => {
        e.preventDefault();
        props.history.push('/login')
    }


    const handleLogout = (e) => {
        e.preventDefault();
        props.dispatch(handleSetAuthedUser(''))
        auth.logout(() => props.history.push('/'))

    }


    return (
        <div className='container'>
            <div>
                <nav className='nav' >
                    <ul >
                        <li>
                            <NavLink to='/' exact activeClassName='active'>
                                Home
                    </NavLink>
                        </li>

                        <li>
                            <NavLink to='/add' activeClassName='active'>
                                New Question
                    </NavLink>
                        </li>
                        <li>
                            <NavLink to='/leaderboard' activeClassName='active'>
                                LeaderBoard
                             </NavLink>
                        </li>

                        {!auth.isAuthenticated()
                            ?<button className=' mr4-ns center btn-nav' onClick={handleLogin}>Login</button>
                            :<li className='pa0 mr4-ns flex center'>
                                <span className='pt2'> Hello, {props.nameOfUser}</span>
                                <img
                                    alt={`Avatar of ${props.nameOfUser}`}
                                    src={`${props.avataarsURL}`}
                                    className='avatar active'
                                />
                                <button className='btn-nav' onClick={handleLogout}>Logout</button>
                            </li>
                        }

                    </ul>
                </nav>
            </div>
        </div>
    )
}

function mapStateToProps({ authedUser, users }) {

    return {
        avataarsURL: authedUser ? users[authedUser].avataarsURL : '',
        nameOfUser: authedUser ? users[authedUser].name : '',
    }

}

export default withRouter(connect(mapStateToProps)(NavBar));
