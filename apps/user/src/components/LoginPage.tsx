import axios from 'axios';
import { UserLogin } from 'common';
import * as React from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from 'ui';
import { baseURL } from './SignupPage';

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    // const setLoader = useSetRecoilState(loadingState);

    const [data, setData] = React.useState<UserLogin>();

    const handleData = (d: UserLogin) => {
        setData(d);
    };

    const request = () => {
        // setLoader(true);
        axios({
            baseURL: baseURL,
            url: '/user/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(response => {
            sessionStorage.setItem('userToken', response.data.token);
            toast.success(response.data.message);
            // setLoader(false);
            console.log('hola')
            navigate("/user/prods");

            return;
        }).catch(err => {
            if(err) {
                if(err.status == 500) {
                    toast.error('Internal Server Error');
                    navigate('/user/login');
                    return;
                }
                console.log('from here')
                toast.error(err.message);
                // setLoader(false);
                return;
            }
        })
    }

    React.useEffect(() => {
        if(sessionStorage.getItem('userToken')) {
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
            <LoginForm url={'/user/login'} propData={handleData} />
        </div>
    </>
  )
}

export default LoginPage