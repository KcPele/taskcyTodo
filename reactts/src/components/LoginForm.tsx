import React, {useState} from 'react'
import { apiRoute } from '../utils';
import qs from 'qs'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useAppDispatch, useAppSelector} from "../hooks"
import { loginAuth } from '../reducers/authSlice';
import { toast } from 'react-toastify';
interface InputI {
    id: string,
    type: string,
    label: string,
    disabled: boolean,
    value: string,
    onChange: React.ChangeEventHandler<HTMLInputElement> | undefined

}

const Input = ({ id, type, label, disabled, value, onChange }: InputI) => (
    <input className="form-group__input" type={type} onChange={onChange} value={value} id={id} placeholder={label} disabled={disabled} required/>
);

const LoginForm: React.FC = () => {
    const dispatch = useAppDispatch()
    const mode = useAppSelector(state => state.authReducer.mode)
    const navigate = useNavigate()
    const [username, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError("")
        if(mode === 'login'){

            const options = {
                method: 'POST',
                headers: { 'content-type': 'application/x-www-form-urlencoded' },
                data: qs.stringify({username, password}),
                url: `${apiRoute}/token`,
              };
              axios(options).then(data => {
                setUserName("")
                setPassword("")
                setIsLoading(false)
                toast.success("Login successfull")
                dispatch(loginAuth({refresh_token: data.data?.refresh_token}))
                navigate('/')
              }).catch(error => {
                console.log(error)
                setError(error.response.data.detail)
                toast.error(error.response.data.detail)
                setIsLoading(false)
              })
            
        } else {
            if(password !== confirmPassword){
                setError('passwords do not match')
                toast.error('passwords do not match')
                setIsLoading(false)
                return 

            }
                const options = {
                    method: 'POST',
                    headers: { 'content-type': 'application/json' },
                    data: {username, email, password},
                    url: `${apiRoute}/users`,
                  };
                  axios(options).then(data => {
                    toast.success("Account created,please login")
                    setUserName("")
                    setPassword("")
                    setEmail("")
                    setConfirmPassword("")
                    setIsLoading(false)
                    navigate('/login')
                   
                  }).catch(error => {
                    console.log(error.response.data)
                    setError(error.response.data.detail)
                    toast.error(error.response.data.detail)
                     setIsLoading(false)
                    
                  })
                }
    }
    return (
        <form onSubmit={handleSubmit}>
            <div className="form-block__input-wrapper">
                <div className="form-group form-group--login">
                    <Input onChange={(e) => setUserName(e.target.value)} value={username} type="text" id="username" label="user name" disabled={mode === 'signup'}/>
                    <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="password" label="password" disabled={mode === 'signup'}/>
                </div>
                <div className="form-group form-group--signup">
                    <Input onChange={(e) => setUserName(e.target.value)} value={username} type="text" id="username_" label="username" disabled={mode === 'login'} />
                    <Input onChange={(e) => setEmail(e.target.value)} value={email} type="email" id="email" label="email" disabled={mode === 'login'} />
                    <Input onChange={(e) => setPassword(e.target.value)} value={password} type="password" id="createpassword" label="password" disabled={mode === 'login'} />
                    <Input onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} type="password" id="repeatpassword" label="repeat password" disabled={mode === 'login'} />
                </div>
            </div>
            <button className="button button--primary full-width" type="submit" disabled={isLoading}>{
                isLoading ? 'Loading' : <span>{mode === 'login' ? 'Log In' : 'Sign Up'}</span>}</button>

            {
                error && <span>{error}</span>
            }
        </form>
  )
}


export default LoginForm