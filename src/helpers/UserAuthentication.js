import {
    getUserTokenCookie,
    getUserDataCookie,
} from '../helpers/CookieHelper';
import * as USER from '../constants/UserAuthentication'

const isUserAuthenticated = () => {
    const userToken = getUserTokenCookie()
    const userData = getUserDataCookie()
    const nullKeys = startStepForUserCompleteProfile(userData, ["facebookId", 'googleId'])

    if (userToken === undefined && userData === undefined) return USER.NOT_AUTHENTICATED
    if (userToken === undefined && userData !== undefined) return USER.NOT_AUTHENTICATED
    if (userToken !== undefined && userData === undefined) return USER.PARTIAL_AUTHENTICATED
    if ((userToken !== undefined && userData !== undefined) && nullKeys.length !== 0) return USER.PARTIAL_AUTHENTICATED
    if ((userToken !== undefined && userData !== undefined) && nullKeys.length === 0) return USER.AUTHENTICATED
}

const startStepForUserCompleteProfile = (data, excludedKeys) => {
    if (!data) return null
    const nullKeys = []
    Object.keys(data).forEach(
        (key) => {
            if (excludedKeys.indexOf(key) !== -1) return
            if (data[key] === null) {
                nullKeys.push(key)
            }
        }
    );
    return nullKeys
}

export {
    startStepForUserCompleteProfile,
    isUserAuthenticated
}