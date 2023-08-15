import { productType } from 'common';
import React, { FormEvent, useRef } from 'react'

export const UpdateForm: React.FC<{ propData: (data: productType) => void, product: productType }> = ({propData, product}) => {

    const titleRef = useRef<HTMLInputElement | null>(null);
    const descRef = useRef<HTMLTextAreaElement | null>(null);
    const priceRef = useRef<HTMLInputElement | null>(null);
    const catRef = useRef<HTMLInputElement | null>(null);
    const brandRef = useRef<HTMLInputElement | null>(null);
    const stockRef = useRef<HTMLInputElement | null>(null);
    const imageUrlRef = useRef<HTMLInputElement | null>(null);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (
            titleRef.current !== null &&
            descRef.current !== null &&
            priceRef.current !== null &&
            stockRef.current !== null &&
            catRef.current !== null &&
            brandRef.current !== null &&
            imageUrlRef.current !== null
        ) {

            if (
                titleRef.current.value !== null &&
                descRef.current.value !== null &&
                priceRef.current.value !== null &&
                stockRef.current.value !== null &&
                catRef.current.value !== null &&
                brandRef.current.value !== null &&
                imageUrlRef.current.value !== null
            ) {
                const data: productType = {
                    title: titleRef.current.value,
                    description: descRef.current.value,
                    price: parseInt(priceRef.current.value),
                    category: catRef.current.value,
                    brand: brandRef.current.value,
                    stock: parseInt(stockRef.current.value),
                    imageUrls: [imageUrlRef.current.value]
                }
                propData(data);
                
            }
        }
    }

    return (
            <div className="w-[500px] p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
                <h2 className="text-2xl font-semibold mb-4">Update Product</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="productName" className="block text-gray-600 mb-1">
                            Product Title
                        </label>
                        <input
                            type="text"
                            id="productTitle"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            ref={titleRef}
                            required
                            defaultValue={product.title}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productDescription" className="block text-gray-600 mb-1">
                            Description
                        </label>
                        <textarea
                            ref={descRef}
                            id="productDescription"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                            defaultValue={product.description}
                        />
                    </div>
                    <div className=" flex flex-row justify-between items-center">

                        <div className="mb-4">
                            <label htmlFor="productPrice" className="block text-gray-600 mb-1">
                                Price ($)
                            </label>
                            <input
                                ref={priceRef}
                                type="number"
                                id="productPrice"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                                required
                                defaultValue={product.price}
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="productStock" className="block text-gray-600 mb-1">
                                Stocks
                            </label>
                            <input
                                ref={stockRef}
                                type="number"
                                id="productStock"
                                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                                required
                                defaultValue={product.stock}
                            />
                        </div>

                    </div>
                    <div className="mb-4">
                        <label htmlFor="productCat" className="block text-gray-600 mb-1">
                            Category
                        </label>
                        <input
                            ref={catRef}
                            type="text"
                            id="productCat"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                            defaultValue={product.category}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productBrand" className="block text-gray-600 mb-1">
                            Brand
                        </label>
                        <input
                            ref={brandRef}
                            type="text"
                            id="productBrand"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                            defaultValue={product.brand}
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="productImage" className="block text-gray-600 mb-1">
                            Image Url
                        </label>
                        <input
                            ref={imageUrlRef}
                            type="text"
                            id="productImage"
                            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                            required
                            defaultValue={product.imageUrls[0]}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-fit bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 hover:scale-105 active:scale-90 transition-all"
                    >
                        Update Product
                    </button>
                </form>
            </div>
    );
}
