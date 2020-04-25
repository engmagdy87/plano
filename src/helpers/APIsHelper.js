import axios from 'axios';
import { QUERY, MUTATION } from '../graphql';
import GRAPHQL_BASE_URL from '../constants/APIs';
// const token = getUserCookie();
// axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

async function registerUser(data) {
    const response = await request({
        operationName: "register",
        query: MUTATION.REGISTER(),
        variables: {
            "data": {
                ...data,
            }
        }
    });
    return response.data
}

async function loginUser(data) {
    const response = await request({
        operationName: "login",
        query: QUERY.LOGIN(data),
    });
    return response.data
}

async function isIdentifierExists(identifier) {
    const response = await request({
        query: QUERY.USER_VALIDATION(identifier),
    });
    return response.data.data === null
}

export {
    registerUser,
    loginUser,
    isIdentifierExists
}

async function request(data) {
    const response = await axios.post(GRAPHQL_BASE_URL, {
        ...data
    });

    if (response.status !== 200 && response.status !== 304)
        throw new Error(
            `response status code ${
            response.status
            },\n data passed object:\n ${JSON.stringify(data)}`
        );

    return response;
}