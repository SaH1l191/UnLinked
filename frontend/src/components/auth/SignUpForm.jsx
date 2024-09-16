import React, { useState } from 'react'
import { axiosInstance } from '../../lib/axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Loader } from 'lucide-react'
import toast from 'react-hot-toast'

const SignUpForm = () => {



    const [formData, setFormData] = useState({
        name: "", username: "", email: "", password: ""
    })
    const queryClient = useQueryClient()



    const handleSignUp = (e) => {
        e.preventDefault()
        console.log(formData, "<= formData")
        const { name, username, email, password } = formData
        signUpMutation({ name, username, email, password })
    }


    const { mutate: signUpMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/signup", data)
            return res.data
        },
        onSuccess: () => {
            toast.success("Account created Successfully")
        },
        onError: (e) => {
            console.log('we have an error', e)
            toast.error("something went wrong")
        }
    })
    // The primary role of useMutation is to handle the creation, update, or deletion of data, and it does not cache the result of these operations by default. Instead, it focuses on managing the state of the mutation request (such as loading and error states).



   //Mutations vs. Queries: In React Query, useMutation is designed for operations that modify data on the server—these are often called side-effect operations. These include creating, updating, or deleting data. In contrast, useQuery is used for fetching data that doesn't change server-side state directly

    return (
        <form onSubmit={handleSignUp} className='flex flex-col gap-4'>
            <input
                type='text'
                name='name'
                placeholder='Full name'
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className='w-full input input-bordered'
                required
            />
            <input
                type='text'
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className='w-full input input-bordered'
                required
            />
            <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className='w-full input input-bordered'
                required
            />
            <input
                type='password'
                name='password'
                placeholder='Password (6+ characters)'
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))}
                className='w-full input input-bordered'
                required
            />

            <button type='submit' disabled={isLoading} className='w-full text-white btn btn-primary'>
                {isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"}
            </button>
        </form>
    )
}

export default SignUpForm