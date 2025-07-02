import { setRandomFallback } from "bcryptjs";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
  const navigate = useNavigate()

  const redirectToHomePage =()=>{
    setTimeout(()=>(
      navigate('/')
    ),4000  )
  }

  useEffect(()=>{
    redirectToHomePage()
  },[])

  return (
  <div className="flex flex-col items-center justify-center h-[85vh] gap-y-5">
    <h1 className="text-4xl font-semibold mb-4">This page could not be Found</h1>
    <p className="text-sm -mt-2">Redirecting in 4 seconds...</p> 
    <button href="/" className=" text-slate-200 px-4 py-2 bg-black rounded-full ">Go Home</button>
  </div>

  )
};

export default NotFoundPage;