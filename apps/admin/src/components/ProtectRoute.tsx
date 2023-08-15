import axios from 'axios'
import * as React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router-dom'
import { baseURL } from './SignupPage'
import { toast } from 'react-hot-toast'

const ProtectRoute: React.FC = () => {
    const navigate = useNavigate();
    const auth = () => {
        axios({
            baseURL: baseURL,
            url: '/admin/auth',
            method: 'POST',
            headers: {
                'Content-Type': 'applicatio/json',
                'Authorization': sessionStorage.getItem('adminToken')
            }
        }).then(response => {
            if(response.data.status) {
                return;
            }
        }).catch(err => {
            if(err) {
                if(err.response && !err.response.data.status) {
                    toast.error('Session Expired. Please Login');
                    navigate('/admin/login');
                    return;
                }
            }
        })
    }

    React.useEffect(() => {
        auth();
    }, [sessionStorage.getItem('adminToken')])
    
  return (
    <>
        {sessionStorage.getItem('adminToken') ? <Outlet /> : <Navigate to={'/admin/login'} />}
    </>
  )
}

export default ProtectRoute