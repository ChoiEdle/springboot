import React, { useState, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { validateFormCheck } from '../utils/validate.js';
import { initForm } from '../utils/init.js';
import { axiosPost } from '../utils/dataFetch.js'

export function Signup() {
    const navigate = useNavigate();
    const initArray = ["id", "pwd", "cpwd", "name", "phone", "emailName", "emailDomain"];

    const refs = useMemo(() => {    //Hooks 비동기식 처리 진행
        return initArray.reduce((acc,cur) => {
            acc[`${cur}Ref`] = React.createRef();
            return acc;
        }, {});
    })

    const [form, setForm] = useState(initForm(initArray));
    const [errors, setErrors] = useState({...initForm(initArray), emailDomain: ""});

    const handleChangeForm = (e) => {
        const {name, value} = e.target;
        
        setForm({...form,[name]:value});    //스프레드 연산자 이용
        // setForm(prev => ({...prev, [name]:value})); //callback 함수 이용
        setErrors({...initForm(initArray), emailDomain: ""});

    }    

    const handleResetForm = (e) => {
        e.preventDefault();
        setForm(initForm(initArray));
    }
    
    const handleSubmit = async(e) => {
        e.preventDefault();
        const param = {
            refs: refs,
            setErrors: setErrors
        }
        if(validateFormCheck(param)){
            const url = "http://localhost:8080/member/signup";
            const formData = {...form, "email":form.emailName.concat('@', form.emailDomain)}
            console.log("formData --> ", formData);
            const result = await axiosPost(url, formData);
            console.log(result);
            if(result) {
                alert("회원가입에 성공하셨습니다.");
                navigate("/login");
            } else {
                alert("회원가입에 실패하셨습니다.");
            }
        }
        // console.log(form);
        }

    /** 아이디 중복체크 */
    const handleIdCheck = async() => {
        console.log(form.id);
        const url = "http://localhost:8080/member/idcheck";
        const data = {"id": form.id};
        const result = await axiosPost(url, data);
        alert(result);
    }

    

    return (
    <div className="content">
        <div className="join-form center-layout">
            <h1 className="center-title">회원가입(React)</h1>
            <form onSubmit={handleSubmit}>
                <ul>
                    <li>
                        <label htmlFor="" ><b>아이디</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.id}</span>
                        <div>
                            <input type="text" 
                                    name="id"                        
                                    placeholder = "아이디 입력(6~20자)"
                                    onChange={handleChangeForm}
                                    value={form.id}
                                    ref={refs.idRef} />
                            <button type="button" onClick={handleIdCheck}> 중복확인</button>
                            <input type="hidden" id="idCheckResult" value="default" />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>비밀번호</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.pwd}</span>
                        <div>
                            <input type="password" 
                                    name="pwd"
                                    placeholder="비밀번호 입력(문자,숫자,특수문자 포함 6~12자)"
                                    onChange={handleChangeForm}
                                    value={form.pwd}
                                    ref={refs.pwdRef} />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>비밀번호 확인</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.cpwd}</span>
                        <div>
                            <input type="password" 
                                    name="cpwd"
                                    placeholder="비밀번호 재입력"
                                    onChange={handleChangeForm}
                                    value={form.cpwd}
                                    ref={refs.cpwdRef} />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>이름</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.name}</span>
                        <div>
                            <input type="text" 
                                    name="name"
                                    placeholder="이름을 입력해주세요"
                                    onChange={handleChangeForm} 
                                    value={form.name}
                                    ref={refs.nameRef} />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>전화번호</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.phone}</span>
                        <div>
                            <input type="text" 
                                    name="phone"
                                    placeholder="휴대폰 번호 입력('-' 포함)"
                                    onChange={handleChangeForm}
                                    value={form.phone}
                                    ref={refs.phoneRef} />
                        </div>
                    </li>
                    <li>
                        <label htmlFor=""><b>이메일 주소</b></label>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.emailName}</span>
                        <span style={{color:"red", fontSize:"0.7rem"}}>{errors.emailDomain}</span>
                        <div>
                            <input type="text" 
                                    name="emailName"
                                    placeholder="이메일 주소"
                                    onChange={handleChangeForm}
                                    value={form.emailName}
                                    ref={refs.emailNameRef} />
                            <span>@</span>       
                            <select name="emailDomain" onChange={handleChangeForm} value={form.emailDomain} ref={refs.emailDomainRef}
                                    >
                                <option value="default">선택</option>
                                <option value="naver.com">naver.com</option>
                                <option value="gmail.com">gmail.com</option>
                                <option value="daum.net">daum.net</option>
                            </select>
                        </div>
                    </li>
                    <li>
                        <button type="submit" >가입하기</button>
                        <button type="reset" onClick={handleResetForm}>다시쓰기</button>
                    </li>
                </ul>
            </form>
        </div>
    </div>
    );
}

