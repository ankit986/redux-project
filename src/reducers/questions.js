import { RECIEVE_QUESTIONS, SAVE_QUESTION_AND_ANSWER, ADD_QUESTION } from '../actions/questions';

export function questions(state = {}, action) {
   
    switch (action.type) {
        case RECIEVE_QUESTIONS:
            return {
                ...state,
                ...action.question
            }

        case ADD_QUESTION:
            return {
                ...state,
                [action.question.id]: action.question
            }

        case SAVE_QUESTION_AND_ANSWER:
            return {
                ...state,
                [action.qid]: {
                    ...state[action.qid],
                    [action.answer]: {
                        ...state[action.qid][action.answer],
                        votes: state[action.qid][action.answer].votes.concat([action.authedUser])
                    }
                }
            }

        default:
            return state
    }
}