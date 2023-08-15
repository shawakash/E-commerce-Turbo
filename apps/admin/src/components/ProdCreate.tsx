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

    const navigate = useNavigate();
    const [clean, setClean] = React.useState<boolean>(false);
    const setAllProds = useSetRecoilState(allProd);
    const handleData = (req: productType) => {
    
        axios({
            baseURL: baseURL,
            url: '/admin/prod/create',
            method: "POST",
            data: req,
            headers: {
                "Content-Type": "application/json",
                "Authorization": sessionStorage.getItem('adminToken')
            }
        }).then(response => {
            setAllProds((pre: productType[]) => [...pre, req]);
            toast.success(response.data.message);
            setClean(true);
            navigate('/admin/prods');
        }).catch(err => {
            if(err) {
                if(err.response) {
                    toast.error(err.response.data.message);
                    return;
                }
                console.log('from here')
                console.log(err)
                toast.error(err.message);
            }
        })
    }
    
    return (
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <ProdCreateForm propData={handleData} clean={clean} />
            </div>
        </>
    )
}

export default ProdCreate