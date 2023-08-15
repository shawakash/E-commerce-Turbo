import { legerType, productType } from 'common';
import React, { FormEvent, useRef, useState } from 'react'

export const PurchaseForm: React.FC<{ propData: (data: legerType) => void, product: productType}> = ({ propData, product }) => {

    const addressRef = useRef<HTMLTextAreaElement | null>(null);
    const phoneRef = useRef<HTMLInputElement | null>(null);
    const quantityRef = useRef<HTMLInputElement | null>(null);
    const [total, setTotal] = useState<number>(0)

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (
            addressRef.current !== null &&
            phoneRef.current !== null &&
            quantityRef.current !== null
        ) {

            if (
                addressRef.current.value !== null &&
                phoneRef.current.value !== null &&
                quantityRef.current.value !== null
            ) {
                const data: legerType = {
                    phone: parseInt(phoneRef.current.value),
                    address: addressRef.current.value,
                    quantity: parseInt(quantityRef.current.value)
                }
                propData(data);

            }
        }
    }

    return (
        <div className="w-[500px] p-6 bg-white rounded-lg shadow-lg hover:shadow-2xl transition-all">
            <h2 className="text-2xl font-semibold mb-4">Purchase Product</h2>
            <form onSubmit={handleSubmit}>
                
                <div className="mb-4">
                    <label htmlFor="address" className="block text-gray-600 mb-1">
                        Address To deliver
                    </label>
                    <textarea
                        ref={addressRef}
                        id="address"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="phone" className="block text-gray-600 mb-1">
                        Contact Number
                    </label>
                    <input
                        ref={phoneRef}
                        type="number"
                        id="phone"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="quantity" className="block text-gray-600 mb-1">
                        Quantity/ies
                    </label>
                    <input
                        ref={quantityRef}
                        onChange={() => setTotal(parseInt(quantityRef.current?.value || '0'))}
                        type="number"
                        id="quantity"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="productImage" className="block text-gray-600 mb-1">
                        Total : 
                    </label>
                    <input
                        type="text"
                        id="productImage"
                        className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-400"
                        required
                        readOnly
                        value={`$ ${total * product.price}`}
                    />
                </div>
                <button
                    type="submit"
                    className="w-fit bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 hover:scale-105 active:scale-90 transition-all"
                >
                    Purchase Product
                </button>
            </form>
        </div>
    );
}
