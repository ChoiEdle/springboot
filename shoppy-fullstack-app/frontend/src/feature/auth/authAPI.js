import { useNavigate } from 'react-router-dom';
import { login, logout } from "./authSlice.js";
import { validateFormCheck, validateFormCheck2 } from "../../utils/validate.js";
import { axiosPost } from "../../utils/dataFetch.js";
import { getCartCount } from '../../feature/cart/cartAPI.js';
import { updateCartCount, resetCartCount } from '../../feature/cart/cartSlice.js';

export const getIdCheck = (id) => async(dispatch) => {
    const url = "/member/idcheck";
    const data = {"id": id};
    const result = await axiosPost(url, data);
    return result;
}

/**
    Signup
*/
export const getSignup = (formData, param) => async(dispatch) => {
    let result = null;
    if(validateFormCheck(param)){
        const url = "/member/signup";
        result = await axiosPost(url, formData);
//        console.log(result, formData);

    }
    return result;

}

export const getLogin = (formData, param) => async(dispatch) => {
    if(validateFormCheck2(param)) {
        /**
            SpringBoot - @RestController, @PostMapping("/member/login")
            axios api
        */
        const url = "/member/login";
        const result = await axiosPost(url, formData);
        if(result) {
            //로그인 성공
            dispatch(login({"userId":formData.id}));
            //장바구니 카운트 함수 호출
//            const count = await getCartCount(formData.id);
            //cartSlice > updateCartCount : dispatch
            dispatch(getCartCount(formData.id));
            return true;    
        }
        return false;
    }
    // return false;
}

export const getLogout = () => (dispatch) => {
    dispatch(logout());
    dispatch(resetCartCount());
    return true;
}
