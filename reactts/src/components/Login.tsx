import React, {useState} from 'react'
import { apiRoute } from '../utils'
import { useAppDispatch } from '../hooks'
import { loginAuth } from '../reducers/authSlice'
const Login = () => {
    const dispatch = useAppDispatch()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(!isLoading)
        let formData = {
            username,
            password
        }
        fetch(`${apiRoute}/token`, {
            method: "POST",
            headers: {
                'content_type': 'form/urlencoded'
            },
            body: JSON.stringify(formData)

        }).then(res => {
            console.log(res.json)
            
            setIsLoading(!isLoading)
        }).catch(error => {
            console.log(error)
            setIsLoading(!isLoading)
        })

    }
  return (
    <div>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
           
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  />

            <button type='submit'>Login</button>
            {
                error && <span>{error}</span>
            }
        </form>
        {
          isLoading && <span>Loading...</span>
        }
    </div>
  )
}

export default Login