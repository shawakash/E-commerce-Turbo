import { productType } from 'common'
import React from 'react'

export const Product: React.FC<{product: productType, client: string, handleDelete?: () => void}> = ({ product, client = 'admin', handleDelete }) => {

  return (
    <>
        <div className="bg-white rounded-lg w-1/2 shadow-md p-6 hover:shadow-2xl transition-all">
                <div className="flex items-center w-56 justify-center mb-4">
                    <img
                        src={product.imageUrls[0]}
                        alt={product.title}
                        className=" object-contain"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2">{product.description}</p>
                <div className="mb-2 flex justify-between">
                    <p className="text-lg font-semibold text-blue-600">${product.price}</p>
                    <p className="text-gray-500">In Stock: {product.stock}</p>
                </div>
                <div className="text-gray-500 mb-2 flex justify-between">
                    <p>Brand: {product.brand}</p>
                    <p>Category: {product.category}</p>
                </div>
                {client == 'user' && <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 duration-300 w-fit hover:scale-105 active:scale-95 transition-all">
                    Add to Cart
                </button>}
                {client == 'admin' && <button onClick={handleDelete} className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 duration-300 w-fit hover:scale-105 active:scale-95 transition-all">
                    Delete Product
                </button>}
            </div>
    </>
  )
}
