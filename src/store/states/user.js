import { getLanguageCookie } from "../../helpers/CookieHelper";

const currentLanguageObj = getLanguageCookie();
const currentLanguage =
    currentLanguageObj === undefined ? 'en' : currentLanguageObj.lang;

const userState = {
    userPersona: {
        identifier: '',
        password: '',
        confirmPassword: '',
        gender: '',
        marriageDate: "",
        name: '',
        spouseName: '',
        prepCost: 0,
    },
    userAuthenticationForm: { show: false, authType: '' },
    lang: currentLanguage
}

export default userState