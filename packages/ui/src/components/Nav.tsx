import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export const Nav: React.FC<{client: string}> = ({ client }) => {
    const navigate = useNavigate()
    const [state, setState] = useState<boolean>(false);

    useEffect(() => {
        if(sessionStorage.getItem(`${client}Token`)) {
            setState(true);
        } else {
            setState(false);
        }
    }, [state, sessionStorage.getItem(`${client}Token`)])

    return (
        <>
            <header className="bg-white shadow-md py-4 sticky top-0 opacity-90">
                <div className="container mx-auto px-4">
                    <nav className="flex items-center justify-between">
                        <div className="text-lg font-semibold">E-Commerce App</div>
                        <ul className="flex space-x-8">
                                <Link to={"/"}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Home</li></Link>
                                <Link to={`/${client}/prods`}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Products</li></Link>
                                {client== 'admin' && <Link to={"/admin/prod/create"}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Create</li></Link>}
                                {client== 'user' && <Link to={"/user/prod/purchase"}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Orders</li></Link>}
                                {!state && <Link to={`/${client}/login`}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Login</li></Link>}
                                {!state && <Link to={`/${client}/signup`}><li className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Register</li></Link>}
                                {state && <li onClick={() => {
                                    sessionStorage.clear();
                                    setState(false);
                                    navigate(`/${client}/login`)
                                }} className="hover:text-blue-500 cursor-pointer transition-all hover:scale-125 active:scale-95">Logout</li>}
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    )
}
