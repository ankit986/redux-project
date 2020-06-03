import React, { Component } from "react";
import { Redirect, withRouter } from "react-router-dom";
import auth from '../util/auth'
import { handleSetAuthedUser } from '../actions/setAuthedUser'
import { connect } from "react-redux";


class Login extends Component {
    state = {
        goToHome: false,
    }

    render() {

        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectingToReferrer } = this.state

        if (redirectingToReferrer === true) {
            return <Redirect to={from} />
        }

        const handleSubmit = (e) => {
            e.preventDefault();
            const {dispatch }=this.props
            dispatch(handleSetAuthedUser(this.userlist.value));
            this.setState({
                goToHome: true
            })
            auth.login(() => {
                this.setState(() => ({
                    redirectingToReferrer: true
                }))
            })
        }
        return (
            <div className='center mw5 mw6-ns hidden ba '>
                <div className='f4 bg-orange white  pv2'>
                    <h1>LOGIN</h1>
                </div>

                <div className='login-box'>
                  
                    <form onSubmit={handleSubmit}>

                        <select className='mt2   select w-90' ref={(input) => this.userlist = input}>
                            {Object.entries(this.props.users).map(user => {
                                return <option value={user[0]} key={user[0]}>{user[1].name}</option>
                            })}
                        </select>
                        
                        <button className='btn w-90'>Submit</button>
                    </form>
                    <img
                        alt='login'
                        src={'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqUKQSfpwhYTvMJ2ggOGTnqNU6ASAl7Vxujt0bW4ZVp34l_zWv&usqp=CAU'}
                        className='login-image m4 w-65'
                    />
                </div>
            </div>
        )
    }
}

function mapStateToProps({ users }) {
    return {
        users
    }
}

export default withRouter(connect(mapStateToProps)(Login));