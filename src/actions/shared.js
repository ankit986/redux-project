import { getInitialData } from "../util/_DATA";
import { recieveQuestions, saveQuestionAndAnswer, addQuestion } from './questions';
import { recieveUsers, saveUsersAnswers, createNewQuestion } from './users';
import { setAuthedUser } from "./setAuthedUser";
import {_saveQuestionAndAnswer, _saveQuestion} from '../util/_DATA'
import { showLoading, hideLoading } from 'react-redux-loading';

const id = ''

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading())
        getInitialData()
        .then(({users, questions}) =>{
            dispatch(recieveQuestions(questions))
            dispatch(recieveUsers(users))
            dispatch(setAuthedUser(id))
            dispatch(hideLoading())
        })
    }
}






export function handlesaveQuestionAndAnswer(info){
    return (dispatch) =>{
        _saveQuestionAndAnswer(info)
            .then(() =>{ 
                console.log('ingo', info)
                dispatch(saveQuestionAndAnswer(info))
                dispatch(saveUsersAnswers(info))
            })
    }
}

export function handeladdQuestion(optionOneData, optionTwoData){
    return (dispatch, getState) =>{
        const state = getState()
        const author = state.authedUser;

        _saveQuestion({
            optionOneData,
            optionTwoData,
            author
        }).then(question => {
            dispatch(addQuestion(question))
            dispatch(createNewQuestion(question))
        })

    }

}