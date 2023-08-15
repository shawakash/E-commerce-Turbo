import axios from 'axios'
import { productType } from 'common'
import * as React from 'react'
import { ProdCreateForm } from 'ui'
import { baseURL } from './SignupPage'
import { useSetRecoilState } from 'recoil'
import { allProd } from '../store/atom'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const ProdCreate: React.FC = () => {

    const navigate = useNavigate()
    const [data, setData] = React.useState<productType>();
    const setAllProds = useSetRecoilState(allProd);

    const handleData = (req: productType) => {
        setData(req)
    }
    const request = () => {
        axios({
            baseURL: baseURL,
            url: '/admin/prod/create',
            method: "POST",
            data: data,
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem('adminToken')
            }
        }).then(response => {
            // @ts-ignore
            setAllProds((pre) => [...pre, data]);
            toast.success(response.data.message);
            navigate('/admin/prods');
        }).catch(err => {
            if(err) {
                if(err.response) {
                    toast.error(err.response.data.message);
                    return;
                }
                toast.error(err.message);
            }
        })
    }
    React.useEffect(() => {
        if(data) {
            request();
        }
    }, [data])
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <ProdCreateForm propData={handleData} />
            </div>
        </>
    )
}

export default ProdCreate