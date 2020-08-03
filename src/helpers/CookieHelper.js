import Cookies from "universal-cookie";

const getUserTokenCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-user-token");
}

const getUserDataCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-user-data");
}

const getAdminCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-admin");
}

const getChecklistCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-checklist");
}

const getLanguageCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-lang");
}

const setChecklistCookie = (id) => {
    const cookies = new Cookies();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    cookies.set("plano-checklist", id, { path: "/", expires: expiryDate });
    return "Cookie Created";
}

const setAdminCookie = (token, name) => {
    const cookies = new Cookies();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 30);
    cookies.set("plano-admin", { token, name }, { path: "/", expires: expiryDate });
    return "Cookie Created";
}

const setLanguageCookie = (lang) => {
    const cookies = new Cookies();
    cookies.set("plano-lang", { lang }, { path: "/" });
    return "Cookie Created";
}

const removeAdminCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-admin");
}

const setUserTokenCookie = (data) => {
    const cookies = new Cookies();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    cookies.set("plano-user-token", data, { path: "/", expires: expiryDate });
    return "Cookie Created";
}

const setUserDataCookie = (data) => {
    const cookies = new Cookies();
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + 7);
    cookies.set("plano-user-data", { ...data }, { path: "/", expires: expiryDate });
    return "Cookie Created";
}

const removeUserTokenCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-user-token");
}

const removeUserDataCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-user-data");
}

const removeChecklistCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-checklist");
}

export {
    getUserTokenCookie,
    getUserDataCookie,
    getAdminCookie,
    getChecklistCookie,
    setUserTokenCookie,
    setUserDataCookie,
    setAdminCookie,
    setChecklistCookie,
    removeUserTokenCookie,
    removeUserDataCookie,
    removeAdminCookie,
    removeChecklistCookie,
    getLanguageCookie,
    setLanguageCookie
}