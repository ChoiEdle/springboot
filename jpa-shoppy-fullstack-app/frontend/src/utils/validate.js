/**
 * Shoppy 로그인 폼 체크
 */
export const validateFormCheck2 = ({idRef, pwdRef, setErrors, errors}) => {
    if(idRef.current.value === ""){
        // alert("아이디를 입력해주세요");
        setErrors({...errors, "id":"아이디를 입력해주세요"});
        idRef.current.focus();
        return false;
    } else if(pwdRef.current.value === ""){
        // alert("패스워드를 입력해주세요");
        setErrors({...errors, "pwd":"패스워드를 입력해주세요"});
        pwdRef.current.focus();
        return false;
    }
    return true;
}


/**
 * 로그인 폼 체크
 */

export function validateLoginCheck(refs, setMsg) {

    if(refs.idRef.current.value === "") {
        // alert("아이디를 입력해주세요");
        // refs.msgIdRef.current.innerText = "아이디를 입력해주세요";
        setMsg({id:"아이디를 입력해주세요"});
        refs.idRef.current.focus();
        return false;
    } else if(refs.passRef.current.value === "") {
        // alert("패스워드를 입력해주세요");
        // refs.msgPassRef.current.innerText = "패스워드를 입력해주세요";
        setMsg({pass:"패스워드를 입력해주세요"});
        refs.passRef.current.focus();
        return false;
    } 
    return true;
}

/**
 * 회원가입 폼 체크
 */
export function validateFormCheck({refs, setErrors}) {
    if(refs.idRef.current.value === "") {
        setErrors({id:"아이디를 입력해주세요"});
        refs.idRef.current.focus();
        return false;
    } else if(refs.pwdRef.current.value ==="") {
        setErrors({pwd:"비밀번호를 입력해주세요"});
        refs.pwdRef.current.focus();
        return false;
    } else if(!(refs.pwdRef.current.value === refs.cpwdRef.current.value)) {
        setErrors({cpwd:"비밀번호가 일치하지 않습니다."});
        refs.cpwdRef.current.focus();
        return false;
    } else if(refs.nameRef.current.value ==="") {
        setErrors({name:"이름을 입력해주세요"});
        refs.nameRef.current.focus();
        return false;
    } else if(refs.phoneRef.current.value ==="") {
        setErrors({phone:"전화번호를 입력해주세요"});
        refs.phoneRef.current.focus();
        return false;
    } else if(refs.emailNameRef.current.value ==="") {
        setErrors({emailName:"이메일 주소를 입력해주세요"});
        refs.emailNameRef.current.focus();
        return false;
    } else if(refs.emailDomainRef.current.value === "default") {
        setErrors({emailDomain : "이메일 주소를 선택해주세요"});
        refs.emailDomainRef.current.focus();
        return false;
    } 
    return true;
}