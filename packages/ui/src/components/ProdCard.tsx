import { productType } from 'common';
import React from 'react';
import { Link } from 'react-router-dom';

export const ProdCard: React.FC<{ product: productType }> = ({ product }) => {
    return (
        <Link to={`/admin/prod/${product._id}`}>
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
                <div className="mb-2 flex justify-between">
                    <p className="text-lg font-semibold text-blue-600">${product.price}</p>
                    <p className="text-gray-500">In Stock: {product.stock}</p>
                </div>
                <div className="text-gray-500 mb-2 flex justify-between">
                    <p>Brand: {product.brand}</p>
                    <p>Category: {product.category}</p>
                </div>
                <button className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 duration-300 w-fit hover:scale-105 active:scale-95 transition-all">
                    Add to Cart
                </button>
            </div>
        </Link>
    );
};

