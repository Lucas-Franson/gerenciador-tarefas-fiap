import { NextPage } from "next";
import { useState } from 'react';
import { executeRequest } from "../services/api";

type LoginProps = {
    setToken(s:string):void
}

export const Login: NextPage<LoginProps> = ({setToken}) => {

    const [name, setName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const [register, setRegister] = useState(false);

    const doLogin = async () => {
        try {
            setErrorMsg('');
            if (!login || !password) {
                return setErrorMsg('Favor preencher os campos');
            }

            setLoading(true);

            const body = {
                login,
                password
            }

            const result = await executeRequest('login', 'POST', body);
            if(result && result.data){
                const obj = result.data;
                localStorage.setItem('accessToken', obj.token);
                localStorage.setItem('name', obj.name);
                localStorage.setItem('email', obj.email);
                setToken(obj.token);
            }
        } catch (e: any) {
            console.log('Ocorreu erro ao efetuar login:', e);
            if(e?.response?.data?.error){
                setErrorMsg(e?.response?.data?.error);
            }else {
                setErrorMsg('Ocorreu erro ao efetuar login');
            }
        }

        setLoading(false);
    }

    const doRegister = async () => {
        try {
            setErrorMsg('');
            if (!login || !password || !name) {
                return setErrorMsg('Favor preencher os campos');
            }

            setLoading(true);

            const body = {
                name,
                email : login,
                password
            }

            const result = await executeRequest('register', 'POST', body);
            if(result && result.data){
                setRegister(false);
                
            }
        } catch (e: any) {
            console.log('Ocorreu erro ao efetuar login:', e);
            if(e?.response?.data?.error){
                setErrorMsg(e?.response?.data?.error);
            }else {
                setErrorMsg('Ocorreu erro ao efetuar login');
            }
        }

        setLoading(false);
    }

    const registerModel = async () => {
        setRegister(!register);
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo" />
            <div className="form">
                {errorMsg && <p>{errorMsg}</p>}
                {register ? (
                    <>
                        <div>
                            <img src="/add.svg" alt="Name" />
                            <input type='text' placeholder="Name"
                                value={name} onChange={event => setName(event.target.value)}
                            />
                        </div>

                        <div>
                            <img src="/mail.svg" alt="Login" />
                            <input type='text' placeholder="Login"
                                value={login} onChange={event => setLogin(event.target.value)}
                            />
                        </div>

                        <div>
                            <img src="/lock.svg" alt="Senha" />
                            <input type='password' placeholder="Senha"
                                value={password} onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                    </>
                ): (
                    <>
                        <div>
                            <img src="/mail.svg" alt="Login" />
                            <input type='text' placeholder="Login"
                                value={login} onChange={event => setLogin(event.target.value)}
                            />
                        </div>

                        <div>
                            <img src="/lock.svg" alt="Senha" />
                            <input type='password' placeholder="Senha"
                                value={password} onChange={event => setPassword(event.target.value)}
                            />
                        </div>
                    </>
                )}
                
                <button onClick={doLogin} style={{ display: register ? 'none' : 'block' }} disabled={loading}>{loading ? '...Carregando' : 'Login'}</button>
                <button onClick={doRegister} style={{ display: register ? 'block' : 'none' }} disabled={loading}>{loading ? '...Carregando' : 'Register'}</button>
                <button onClick={registerModel} className="register-button" disabled={loading}>{loading ? '...Carregando' : register ? 'Voltar' : 'Register'}</button>
            </div>
        </div>
    );
}