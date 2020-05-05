import Cookies from "universal-cookie";

const getUserCookie = () => {
    const cookies = new Cookies();
    return cookies.get("plano-user");
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
    getChecklistCookie,
    setUserCookie,
    setChecklistCookie,
    removeUserCookie,
    removeChecklistCookie,
}