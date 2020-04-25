import Cookies from "universal-cookie";

const getUserCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-user");
}

/**
 * @param {string} token
 */
const setUserCookie = (token, name) => {
    const cookies = new Cookies();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    cookies.set("plano-user", { token, name }, { path: "/", expires: expiryDate });
    return "Cookie Created";
}

const removeUserCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-user");
}

export {
    getUserCookie,
    setUserCookie,
    removeUserCookie
}