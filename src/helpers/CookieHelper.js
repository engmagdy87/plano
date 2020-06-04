import Cookies from "universal-cookie";

const getUserCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-user");
}

const getAdminCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-admin");
}

const getChecklistCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-checklist");
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

const removeAdminCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-admin");
}

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

const removeChecklistCookie = () => {
    const cookies = new Cookies();
    cookies.remove("plano-checklist");
}

export {
    getUserCookie,
    getAdminCookie,
    getChecklistCookie,
    setUserCookie,
    setAdminCookie,
    setChecklistCookie,
    removeUserCookie,
    removeAdminCookie,
    removeChecklistCookie,
}