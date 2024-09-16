import React from 'react'
import LoginForm from '../../components/auth/LoginForm'
import { Link } from 'react-router-dom'


const LoginPage = () => {
  return (
    <div className='flex flex-col justify-center min-h-screen py-12 sm:px-6 lg:px-8'>
    <div className='mx-auto'>
      <img className='mx-auto h-36' alt='LinkedIn' src={'/logo.svg'} />
      <h2 className='text-3xl font-bold text-center text-gray-900'>
        Make the most of your professional life
      </h2>
    </div>
    <div className='mt-8 shadow-md sm:mx-auto sm:w-full sm:max-w-md'>
      <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
        <LoginForm />

        <div className='mt-6'>
          <div className='relative'>
            <div className='absolute flex items-center inset-2'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 text-gray-500 bg-white'>Already on LinkedIn?</span>
            </div>
          </div>
          <div className='mt-6'>
            <Link
              to='/login'
              className='flex justify-center w-full px-4 py-2 text-sm font-medium text-blue-600 bg-white border border-transparent rounded-md shadow-sm hover:bg-gray-50'
            >
              Sign in
            </Link>
          </div>

        </div>
      </div>

    </div>
  </div>
  )
}

export default LoginPage