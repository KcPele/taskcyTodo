import React, {useState } from 'react'
import { apiRoute } from '../utils'

const Signup = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState("")
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(!isLoading)
        let formData = {
            username,
            email,
            password
        }
        fetch(`${apiRoute}/users`, {
            method: "POST",
            headers: {
                'content_type': 'application/json'
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
        <h1>Sign up</h1>
        <form onSubmit={handleSubmit}>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            <input type="text" value={password} onChange={(e) => setPassword(e.target.value)}  />

            <button type='submit'>submit</button>
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

export default Signup