import { login, logout } from "./authSlice.js";
import { validateFormCheck2 } from "../../utils/validate.js";

export const getLogin = (formData, param) => (dispatch) => {
    if(validateFormCheck2(param)) {
        if("test" === formData.id && "1234" === formData.pwd) {
            //로그인 성공
            dispatch(login({"userId":formData.id}));
            return true;    
        }
        return false;
    }
    // return false;
}

export const getLogout = () => (dispatch) => {
    dispatch(logout());
    return true;
}
