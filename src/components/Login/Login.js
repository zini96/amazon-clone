import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {auth} from '../firebase & axios/firebase';    
import './Login.css';


function Login() {
    //email과 password를 받아서 저장하기 위해 usestate 사용하기
    //초기값,세팅해줄 값(계속 초기값을 변경해줌)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigator = useNavigate();//구버전 history

    const siginIn = e =>{ //form->login
        e.preventDefault();
        auth
            .signInWithEmailAndPassword(email, password)
            .then((auth) => {
                navigator("/"); 
            })
            .catch((error) => alert(error.message));
    };
    
    const register = e =>{ //firebase에서 user 확인 가능
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                if(auth){
                    navigator("/");
                }
            })
            .catch((error) => alert(error.message));
    }
      
      
    return (
        <div className='loginpage'>
            <Link to="/">
                <img className='login_logo' src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png' alt='/'/>
            </Link>
            
            <div className='login_box'>
                <h2>Sign In</h2>
                <form className='login_form'>
                    <h5>Email or mobile phone number</h5>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="text" name='password'/>
                    <h5>Password</h5>
                    <input value={password} onChange={e => setPassword(e.target.value)} type="password" name='password'/>
                    <button onClick={siginIn} className='login_signInBtn'>Continue</button>
                </form>
                <p>By continuing, you agree to Amazon's <span>Conditions of Use</span> and <span>Privacy Notice.</span></p>
                
            </div>
            <div className='login_hr'>
                <hr/>
                <div>New to Amazon?</div>
            </div>
            <button onClick={register} className='login_NewuserBtn'>Create your Amazon account</button>
            <div className='loginpage_footer'>
                <div className='loginpage_footer_notice'>
                    <p>Condition of Use</p>
                    <p>Privacy Notice</p>
                    <p>Help</p>
                </div>
                <p>© Copyright 2022. zini96. All rights reserved</p>
            </div>
        </div>
    );
}

export default Login;