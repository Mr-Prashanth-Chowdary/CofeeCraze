import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [username,setUsername] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    const navigate = useNavigate()
    const handleOnSubmit = async(e)=>{
        e.preventDefault()
        const user = {
            emailid:email,
            password:password,
            username:username
        }
        try{
            const reqRes  = await axios.post("http://localhost:3001/api/auth/signup",user)
            console.log(reqRes.data)
            window.location.reload()
            setUsername('')
            setEmail('')
            setPassword('')
        }catch(e){
            console.error(e)
        }       
    }
  return (
    <div>
      <h1 className="hidden">Signup</h1>
      <h2 className="text-center text-3xl">Welcome Aboard</h2>
      <p className="text-center mt-2 text-xs md:text-sm">Your coffee journey begins here—let’s brew something amazing</p>
      <form className="text-center mt-5 space-y-5" onSubmit={handleOnSubmit}>
        <input
          className="border-white border-[1px] w-[80%] md:w-[70%] p-2 rounded-xl"
          type="text"
          placeholder="Enter your Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
          placeholder="Set your Password"
        />
        <button
          className="border-white border-[1px] w-[80%] md:w-[70%] p-2 rounded-xl hover:bg-white hover:text-black"
          type="submit"
        >
          Singup
        </button>
      </form>
    </div>
  );
}
