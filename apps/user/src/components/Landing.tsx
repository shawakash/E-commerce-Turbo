import React from 'react'
import { Link } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { allProd } from '../store/atom'
import { ProdCard } from 'ui'

const Landing: React.FC = () => {

  const allProds = useRecoilValue(allProd);
  const featuredProducts = [allProds[5], allProds[6], allProds[2]];

  return (
    <div className="bg-gray-100">
      

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Discover Amazing Products</h1>
          <p className="text-lg mb-8">Shop the latest trends in our wide selection of products.</p>
          <Link to={'/user/prods'} className="bg-white text-blue-600 hover:bg-blue-600 hover:text-white py-2 px-6 rounded-full text-lg font-semibold transition duration-300">Shop Now</Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-16">
        <h2 className="text-2xl font-medium tracking-wide font-sans ml-[87px]">Featured Products</h2>
        <div className="container mx-auto flex flex-wrap gap-4 items-center justify-center">
          {featuredProducts.map(fp => <ProdCard product={fp} client='user' key={fp._id} />)}
        </div>
      </section>

    </div>

  )
}

export default Landing