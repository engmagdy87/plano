import axios from 'axios';
import { QUERY, MUTATION } from '../graphql';
import { getUserTokenCookie, getAdminCookie } from '../helpers/CookieHelper';
import GRAPHQL_BASE_URL from '../constants/APIs';

async function fetchCategories(checklistId) {
    const userToken = getUserTokenCookie()
    try {
        const response = await request({
            operationName: "categories",
            query: QUERY.CATEGORIES(checklistId),
        }, userToken);
        return response.data
    } catch (error) {
        return false;
    }
}

async function fetchChecklists(ownerId) {
    const userToken = getUserTokenCookie()
    try {
        const response = await request({
            operationName: "categories",
            query: QUERY.CHECKLISTS(ownerId),
        }, userToken);
        return response.data
    } catch (error) {
        return false;
    }
}

async function orderTaskById(data) {
    const userToken = getUserTokenCookie()
    try {
        const response = await request({
            operationName: "orderTasksById",
            query: MUTATION.ORDER_TASKS(),
            variables: {
                ...data
            }
        }, userToken);
        return response.data
    } catch (error) {
        return false;
    }
}
async function createTask(data) {
    const userToken = getUserTokenCookie()
    try {
        const response = await request({
            operationName: "newTask",
            query: MUTATION.NEW_TASK(),
            variables: {
                "data": {
                    ...data,
                }
            }
        }, userToken);
        return response.data
    } catch (error) {
        return false;
    }
}

async function updateTask(taskId, data) {
    const userToken = getUserTokenCookie()
    const response = await request({
        operationName: "updateTask",
        query: MUTATION.UPDATE_TASK(),
        variables: {
            "data": {
                ...data,
            },
            taskId
        }
    }, userToken);
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

async function setupUser(data) {
    const userToken = getUserTokenCookie()
    const response = await request({
        operationName: "setupUser",
        query: MUTATION.SETUP_USER(),
        variables: {
            "data": {
                ...data,
            }
        }
    }, userToken);
    return response.data
}

async function removeTask(taskId) {
    const userToken = getUserTokenCookie()
    const response = await request({
        operationName: "removeTask",
        query: MUTATION.REMOVE_TASK(),
        variables: {
            taskId
        }
    }, userToken);
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
    }, userToken);
    return response.data
}

async function setTaskDone(taskId) {
    const userToken = getUserTokenCookie()
    const response = await request({
        operationName: "TaskDone",
        query: MUTATION.TASK_DONE(),
        variables: {
            taskId
        }
    }, userToken);
    return response.data
}

async function setTaskUnDone(taskId) {
    const userToken = getUserTokenCookie()
    const response = await request({
        operationName: "TaskUnDone",
        query: MUTATION.TASK_UNDONE(),
        variables: {
            taskId
        }
    }, userToken);
    return response.data
}

async function loginUser(data) {
    const response = await request({
        operationName: "login",
        query: QUERY.LOGIN(data),
    });
    return response.data
}

async function sendForgotPasswordRequest(data) {
    const response = await request({
        operationName: "forgetPassword",
        query: MUTATION.FORGET_PASSWORD(),
        variables: {
            ...data
        }
    });
    return response.data
}

async function setNewPasswordRequest(data) {
    const response = await request({
        operationName: "resetPassword",
        query: MUTATION.RESET_PASSWORD(),
        variables: {
            ...data
        }
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

async function listAdmins() {
    const adminToken = getAdminCookie()
    const response = await request({
        query: QUERY.LIST_ADMINS(),
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
    fetchChecklists,
    createTask,
    updateTask,
    registerUser,
    setupUser,
    loginUser,
    listUsers,
    deleteUser,
    loginAdmin,
    isIdentifierExists,
    removeTask,
    orderTaskById,
    setTaskDone,
    setTaskUnDone,
    listAdmins,
    sendForgotPasswordRequest,
    setNewPasswordRequest
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