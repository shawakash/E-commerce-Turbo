import axios from 'axios';
import { UserSignup } from 'common'
import * as React from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { SignUpForm } from 'ui';

export const baseURL = 'http://localhost:5001';

export const SignupPage: React.FC = () => {
    const navigate = useNavigate();
    // const setLoader = useSetRecoilState(loadingState);

    const [data, setData] = React.useState<UserSignup>();

    const handleData = (d: UserSignup) => {
        setData(d);
    };

    const request = () => {
        // setLoader(true);
        axios({
            baseURL: baseURL,
            url: '/user/signup',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        }).then(response => {
            sessionStorage.setItem('userToken', response.data.token);
            toast.success(response.data.message);
            // setLoader(false);
            navigate("/");
            return;
        }).catch(err => {
            if(err) {
                if(err.status == 500) {
                    toast.error('Internal Server Error');
                    navigate('/user/login');
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
            <SignUpForm url={'/user/signup'} propData={handleData}/>
        </div>
    </>
  )
}
