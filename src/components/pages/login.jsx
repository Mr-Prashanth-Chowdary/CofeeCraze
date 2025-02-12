import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = {
        username: email,
        password: password,
      };

      const reqRes = await axios.post('http://localhost:3001/api/auth/login', user); // need to change the url it should not be fixed
      console.log(reqRes.data);

      const token = reqRes.data.token;
      if (token) {
        console.log('Got token');
        navigate('/shop');
      }
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      alert("Login failed. Please check your credentials.");
    }
    setEmail('')
    setPassword('')
  };

  return (
    <>
      <div className="text-white bg-cover" style={{ backgroundImage: "url('/bgimg.png')" }}>
        <div className="relative flex justify-center items-center min-w-full min-h-screen bg-black/20">
          <img
            className="md:hidden absolute top-[10%] w-[150px] h-[150px]"
            src="/loginlogo.png"
            alt="login logo"
          />
          <img
            className="hidden md:block w-[30%] h-[70vh] object-cover rounded-bl-2xl rounded-tl-2xl"
            src="/login.jpg"
            alt="login background"
          />
          <div className="w-full flex flex-col justify-center md:w-[40%] h-screen md:h-[70vh] pt-30 md:pt-10 bg-black/80 md:rounded-tr-2xl md:rounded-br-2xl">
            <h1 className="text-white hidden">Login</h1>
            <h2 className="text-center text-3xl">Welcome Back</h2>
            <h2 className="text-center mt-2 text-xs md:text-sm">
              Your coffee journey starts here—let’s get brewing
            </h2>
            <form className="text-center mt-5 space-y-5" onSubmit={handleOnSubmit}>
              <input
                className="border-white border-[1px] w-[80%] md:w-[70%] p-2 rounded-xl"
                type="text"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="border-white border-[1px] w-[80%] md:w-[70%] p-2 rounded-xl"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your Password"
              />
              <button
                className="border-white border-[1px] w-[80%] md:w-[70%] p-2 rounded-xl hover:bg-white hover:text-black"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
