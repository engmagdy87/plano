import axios from 'axios';
import { QUERY, MUTATION } from '../graphql';
import { getUserCookie, getAdminCookie } from '../helpers/CookieHelper';
import GRAPHQL_BASE_URL from '../constants/APIs';

async function fetchCategories(checklistId) {
    const userToken = getUserCookie()
    try {
        const response = await request({
            operationName: "categories",
            query: QUERY.CATEGORIES(checklistId),
        }, userToken.token);
        return response.data
    } catch (error) {
        return false;
    }
}

async function orderTaskById(data) {
    const userToken = getUserCookie()
    try {
        const response = await request({
            operationName: "orderTasksById",
            query: MUTATION.ORDER_TASKS(),
            variables: {
                ...data
            }
        }, userToken.token);
        return response.data
    } catch (error) {
        return false;
    }
}
async function createTask(data) {
    const userToken = getUserCookie()
    try {
        const response = await request({
            operationName: "newTask",
            query: MUTATION.NEW_TASK(),
            variables: {
                "data": {
                    ...data,
                }
            }
        }, userToken.token);
        return response.data
    } catch (error) {
        return false;
    }
}

async function updateTask(taskId, data) {
    const userToken = getUserCookie()
    const response = await request({
        operationName: "updateTask",
        query: MUTATION.UPDATE_TASK(),
        variables: {
            "data": {
                ...data,
            },
            taskId
        }
    }, userToken.token);
    return response.data
}

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

async function removeTask(taskId) {
    const userToken = getUserCookie()
    const response = await request({
        operationName: "removeTask",
        query: MUTATION.REMOVE_TASK(),
        variables: {
            taskId
        }
    }, userToken.token);
    return response.data
}

async function deleteUser(userId) {
    const userToken = getAdminCookie()
    const response = await request({
        operationName: "deleteUser",
        query: MUTATION.DELETE_USER(),
        variables: {
            userId
        }
    }, userToken.token);
    return response.data
}

async function setTaskDone(taskId) {
    const userToken = getUserCookie()
    const response = await request({
        operationName: "TaskDone",
        query: MUTATION.TASK_DONE(),
        variables: {
            taskId
        }
    }, userToken.token);
    return response.data
}

async function setTaskUnDone(taskId) {
    const userToken = getUserCookie()
    const response = await request({
        operationName: "TaskUnDone",
        query: MUTATION.TASK_UNDONE(),
        variables: {
            taskId
        }
    }, userToken.token);
    return response.data
}

async function loginUser(data) {
    const response = await request({
        operationName: "login",
        query: QUERY.LOGIN(data),
    });
    return response.data
}

async function loginAdmin(data) {
    const response = await request({
        operationName: "loginAdmin",
        query: QUERY.LOGIN_ADMIN(data),
    });
    return response.data
}

async function listUsers() {
    const adminToken = getAdminCookie()
    const response = await request({
        query: QUERY.LIST_USERS(),
    }, adminToken.token);
    return response.data
}

async function isIdentifierExists(identifier) {
    try {
        const response = await request({
            query: QUERY.USER_VALIDATION(identifier),
        });
        return response.data.data === null
    } catch (error) {
        return undefined;
    }
}

export {
    fetchCategories,
    createTask,
    updateTask,
    registerUser,
    loginUser,
    loginAdmin,
    isIdentifierExists,
    removeTask,
    orderTaskById,
    setTaskDone,
    setTaskUnDone,
    listUsers,
    deleteUser
}

async function request(data, token) {
    let response;
    if (!token)
        response = await axios.post(GRAPHQL_BASE_URL, {
            ...data
        });
    else response = await axios.post(GRAPHQL_BASE_URL, {
        ...data
    }, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status !== 200 && response.status !== 304)
        throw new Error(
            `response status code ${
            response.status
            },\n data passed object:\n ${JSON.stringify(data)}`
        );

    return response;
}