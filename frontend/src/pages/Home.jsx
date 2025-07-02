
const Home = () => {



  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-auto py-36 flex flex-col lg:flex-row justify-center items-center gap-8 lg:gap-12">
          {/* Left Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">UnLinked</h1>
              <h2 className="text-2xl lg:text-3xl text-lime-700 font-medium leading-relaxed">
                Welcome to your professional community
              </h2>
              <p className="text-lg text-slate-600 max-w-md mx-auto lg:mx-0">
                Connect with professionals, discover opportunities, and grow your career in a meaningful way.
              </p>
            </div>

            <div className="space-y-4">
              <a
                href="https://unlinked-ff2c.onrender.com/api/v1/auth/google"
                className="w-full max-w-md bg-white text-slate-800 border-2 border-slate-300 hover:border-lime-600 hover:bg-lime-50 rounded-full py-4 px-8 font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Sign in with Google
              </a>
              <p className="text-xs text-slate-500">By clicking Sign in, you agree to our Terms and Privacy Policy</p>
            </div>
          </div>

          {/* Right Image */}
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative">
              <img
                src='./lander.svg'
                alt="Professional networking illustration"
                className="w-full block  h-auto rounded-lg shadow-2xl"
              />
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-lime-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div className=" py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-12 lg:gap-16">
            {/* Left Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div className="text-center lg:text-left">
                <h3 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-4">Who is UnLinked For?</h3>
                <p className="text-xl text-slate-600 mb-8">Anyone looking to navigate their professional journey</p>
              </div>

              <ul className="space-y-6">
                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">Find a Coworker or Classmate</h4>
                    <p className="text-slate-600">Reconnect with people from your past and expand your network</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">Find a New Job</h4>
                    <p className="text-slate-600">Discover career opportunities that match your skills and goals</p>
                  </div>
                </li>

                <li className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-lime-100 rounded-full flex items-center justify-center mt-1">
                    <svg className="w-4 h-4 text-lime-600" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">Find a Course or Training</h4>
                    <p className="text-slate-600">
                      Enhance your skills with relevant courses and professional development
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Right Image */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative">
                <img
                  src="./public.jpeg"
                  alt="Professional development illustration"
                  className="w-full max-w-md h-[auto] rounded-lg shadow-xl"
                />
                {/* Decorative background */}
                {/* <div className="absolute inset-0 bg-gradient-to-tr from-lime-100 to-blue-100 rounded-lg -z-10 transform rotate-3 scale-105"></div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
