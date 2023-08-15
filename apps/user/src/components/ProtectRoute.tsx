import axios from 'axios'
import * as React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { baseURL } from './SignupPage'

const ProtectRoute: React.FC = () => {
    const navigate = useNavigate();
    const auth = () => {
        axios({
            baseURL: baseURL,
            url: '/user/auth',
            method: 'POST',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': sessionStorage.getItem('userToken')
            }
        }).then(response => {
            if(response.data.status) {
                return;
            }
        }).catch(err => {
            if(err) {
                if(err.response && !err.response.data.status) {
                    toast.error('Session Expired. Please Login');
                    navigate('/user/login');
                    return;
                }
            }
        })
    }

    React.useEffect(() => {
        auth();
    }, [sessionStorage.getItem('userToken')])
    
  return (
    <>
        {sessionStorage.getItem('userToken') ? <Outlet /> : <Navigate to={'/user/login'} />}
    </>
  )
}

export default ProtectRoute