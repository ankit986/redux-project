export const RECIEVE_USERS = 'RECIEVE_USERS';
export const SAVE_USER_ANSWER = 'SAVE_USER_ANSWER'
export const CREATE_QUESTION = 'CREATE_QUESTION'

export function recieveUsers(users) {
    return {
        type: RECIEVE_USERS,
        users
    }
}

export function saveUsersAnswers({ authedUser, qid, answer }) {
    return {
        type: SAVE_USER_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function createNewQuestion(question) {
    return {
        type: CREATE_QUESTION,
        question
    }
}