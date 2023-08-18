import { legerType, productType } from 'common'
import React, { useState } from 'react'

export const LegerCard: React.FC<{ leger: legerType, client: string, deleteLeger: (leger: legerType) => void }> = ({ leger, client = 'admin', deleteLeger }) => {

    const product = leger.product;

    const handleDelete = () => {
        deleteLeger(leger);
    }

    return (
        <>
            <div className="bg-white rounded-lg w-[500px] shadow-md p-6 hover:shadow-2xl transition-all">
                <div className="flex items-center w-56 justify-center mb-4">
                    <img
                        src={product.imageUrls[0]}
                        alt={product.title}
                        className=" object-contain"
                    />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
                <p className="text-gray-600 mb-2 line-clamp-3">{product.description}</p>
                <p className="text-lg font-semibold tracking-wide my-2 flex justify-between text-blue-600"><span className='text-gray-500'>Total: </span><span> ${leger.total} + <span className='text-gray-500'>GST: 18%</span></span></p>
                <p className="text-gray-500 mb-2"><span className='font-semibold'>Quantity: </span>{leger.quantity}</p>
                <div className="text-gray-500 mb-2 flex justify-between">
                    <p>Brand: {product.brand}</p>
                    <p>Category: {product.category}</p>
                </div>
                <p className="text-gray-500 mb-2 flex justify-between"><span className="text-gray-500 text-lg">To: </span>{leger.address}</p>
                <p className="text-gray-500 mb-2 flex justify-between"><span className="text-gray-500 text-lg">Number: </span>*******{(leger.phone).toString().slice(7)}</p>

                {client == 'user' && <button
                    onClick={handleDelete}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 duration-300 w-fit hover:scale-105 active:scale-95 transition-all">
                    Cancel Order
                </button>}
            </div>
        </>
    )
}
