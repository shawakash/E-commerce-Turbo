import React from 'react'
import { legerType } from 'common'
import { LegerCard } from 'ui'
import { useRecoilState } from 'recoil'
import { allLegers } from '../store/atom'
import axios from 'axios'
import { baseURL } from './SignupPage'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export const ProdPurchase: React.FC = () => {
  
  const navigate = useNavigate();
  const [legers, setLegers] = useRecoilState(allLegers);

  const handleDelete = (leger: legerType) => {
    axios({
      baseURL: baseURL,
      url: `/user/purchased/${leger._id}`,
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('userToken')
      }
    }).then(response => {
      const leg = legers.filter((l: legerType) => l._id != leger._id);
      setLegers(leg);
      toast.success(response.data.message);
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

  return (
    <>
    <div className="min-h-screen py-10 flex items-center gap-10 flex-wrap justify-center bg-gray-100">
      {legers && 
        legers.map((leger: legerType) => <LegerCard leger={leger} client='user' deleteLeger={handleDelete} />)
      }
    </div>
    </>
  )
}
