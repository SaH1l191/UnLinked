import React, { Suspense, lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "./lib/axios";

const HomePage = lazy(() => import("./pages/HomePage"));
const LoginPage = lazy(() => import("./pages/auth/LoginPage"));
const SignUpPage = lazy(() => import("./pages/auth/SignUpPage"));
const PostPage = lazy(() => import("./pages/PostPage"));
const NotifcationsPage = lazy(() => import("./pages/NotifcationsPage"));
const NetworkPage = lazy(() => import("./pages/NetworkPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const Home = lazy(() => import("./pages/Home"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));
const Jobs = lazy(() => import("./pages/Jobs"));

function App() {
    const { data: authUser, isLoading } = useQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
            try {
                const res = await axiosInstance.get("/auth/me");
                return res.data;
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    return null;
                }
                toast.error(err.response.data.message || "Something went wrong");
            }
        },
    });

    if (isLoading) return null;

    return (
        <Layout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="*" element={<NotFoundPage />} />
                    <Route path='/' element={authUser ? <HomePage /> : <Navigate to={"/home"} />} />
                    <Route path='/home' element={<Home />} />
                    <Route path='/jobs' element={authUser ? <Jobs /> : <Navigate to={"/jobs"} />} />
                    <Route path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to={"/"} />} />
                    <Route path='/login' element={!authUser ? <LoginPage /> : <Navigate to={"/"} />} />
                    <Route path='/notifications' element={authUser ? <NotifcationsPage /> : <Navigate to={"/login"} />} />
                    <Route path='/network' element={authUser ? <NetworkPage /> : <Navigate to={"/login"} />} />
                    <Route path='/post/:postId' element={authUser ? <PostPage /> : <Navigate to={"/login"} />} />
                    <Route path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to={"/login"} />} />
                </Routes>
            </Suspense>
            <Toaster />
        </Layout>
    );
}

export default App;
