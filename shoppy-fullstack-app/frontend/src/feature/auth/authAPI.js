import { login, logout } from "./authSlice.js";
import { validateFormCheck2 } from "../../utils/validate.js";
import { axiosPost } from "../../utils/dataFetch.js";

export const getLogin = (formData, param) => async(dispatch) => {
    if(validateFormCheck2(param)) {
        /**
            SpringBoot - @RestController, @PostMapping("/member/login")
            axios api
        */
        const url = "http://localhost:8080/member/login";
        const result = await axiosPost(url, formData);
        if(result) {
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
