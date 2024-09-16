import React from 'react'
import Navbar from './Navbar'


const Layout = ({ children }) => {



    return (
        <div className='min-h-screen bg-base-100'>
            <Navbar />
            <main className='px-4 py-6 mx-auto max-w-7xl '>
                {children}
            </main>
        </div>
    )
} 

export default Layout