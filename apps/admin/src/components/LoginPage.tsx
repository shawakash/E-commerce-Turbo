import axios from 'axios';
import { UserLogin, adminLogin } from 'common';
import * as React from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { baseURL } from 'store/dist/index';
import { LoginForm } from 'ui';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    // const setLoader = useSetRecoilState(loadingState);

    const [data, setData] = React.useState<adminLogin>();

    const handleData = (d: adminLogin) => {
        setData(d);
    };

    const request = () => {
        // setLoader(true);
        axios({
            baseURL: baseURL,
            url: '/admin/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(response => {
            sessionStorage.setItem('adminToken', response.data.token);
            toast.success(response.data.message);
            // setLoader(false);
            navigate("/");
            return;
        }).catch(err => {
            if(err) {
                if(err.status == 500) {
                    toast.error('Internal Server Error');
                    navigate('/login');
                    return;
                }
                toast.error(err.message);
                // setLoader(false);
                return;
            }
        })
    }

    React.useEffect(() => {
        if(sessionStorage.getItem('adminToken')) {
            sessionStorage.clear();
            toast.success('Client Cleared');
        }
    }, []);

    React.useEffect(() => {
        if(data) {
            request();
        }
    }, [data]);

  return (
    <>
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <LoginForm url={'/admin/login'} propData={handleData} />
        </div>
    </>
  )
}

export default LoginPage