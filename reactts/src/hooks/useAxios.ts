import {useState, useCallback } from 'react'
import axios, { AxiosResponse } from 'axios';
import { apiRoute } from '../utils';
import {toast } from 'react-toastify'
interface AxiosI {
    postData: {} | null,
    path: string,
    method: string
} 
const useAxios = () => {
  let token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [res, setRes] = useState<AxiosResponse>()

    
    const handleRequest = useCallback( async ({postData, path, method}: AxiosI) => {
     setIsLoading(true)
     
      const options = {
        method,
        headers: { 
          'content-type': 'application/json',
          'authorization': `Bearer ${token}` 
        },
        data: postData,
        url: `${apiRoute}/${path}`,
      };
      axios(options).then(data => {
        
        setIsLoading(false)
        
       setRes(data)
      
      
       
      }).catch(error => {
        console.log(error)
        setError(error.response.data.detail)
        toast.error(error.response.data.detail)
        setIsLoading(false)
      
       
      })
    }, [])
  return (
    {
        isLoading, error, res, handleRequest
    }
  )
}

export default useAxios