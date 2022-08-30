import React from 'react'
import LoginForm from './LoginForm'
import '../form.scss'
import { toggleMode } from '../reducers/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks'
const FormComponent: React.FC = () => {
    const dispatch = useAppDispatch()
    const mode = useAppSelector(state => state.authReducer.mode)
  
    const toogleMode = () => {
     if(mode === 'login'){
      dispatch(toggleMode({mode: 'signup'}))
     } else {
      dispatch(toggleMode({mode: 'login'}))
     }
    }

   
  return (

    <div>
    <div className={`form-block-wrapper form-block-wrapper--is-${mode}`} ></div>
    <section className={`form-block form-block--is-${mode}`}>
        <header className="form-block__header">
            <h1>{mode === 'login' ? 'Welcome back!' : 'Sign up'}</h1>
            <div className="form-block__toggle-block">
                <span>{mode === 'login' ? 'Don\'t' : 'Already'} have an account? Click here &#8594;</span>
                <input id="form-toggler" type="checkbox" onClick={toogleMode} />
                <label htmlFor="form-toggler"></label>
            </div>
        </header>
        <LoginForm />
    </section>
</div>
  )
}

export default FormComponent