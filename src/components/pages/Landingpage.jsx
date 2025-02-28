import React, { useContext } from "react";
import FlavSection from "../FlavSection";
import TwoCards from "../TwoCards";
import Discovery from "../Discovery";
import ShortStore from "../ShortStore";
import { useNavigate } from "react-router-dom";
import Auth from '../../contextAPI/Auth'

export default function Landingpage() {
  const {login} = useContext(Auth)
  const navigate = useNavigate()
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get("token");
  if(token){
    login(token)
    const url = new URL(window.location);
    url.searchParams.delete("token");
    window.history.replaceState({}, document.title, url);
  }
  return (
    <>
      <div className="w-full h-[85vh] relative">
        <video
          className="absolute -z-1 w-[calc(100%-0.5rem)] lg:w-[calc(100%-3rem)] h-[80vh] my-3 left-1/2 transform -translate-x-1/2 rounded-2xl object-cover"
          autoPlay
          muted
          playsInline
          loop
        >
          <source src="./vid.webm" type="video/webm" />
        </video>
        <div className="absolute bg-black/40 w-[calc(100%-0.5rem)] lg:w-[calc(100%-3rem)] h-[80vh] top-3 left-1/2 transform -translate-x-1/2 rounded-2xl"></div>
        {/* <Nav /> */}
        <div className="absolute z-1 top-[45%] left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-white">
            <h1 className="title text-4xl  font-bold w-[250px] text-center">A decade of Modern Coffee.</h1>
            <p className="text-[9px] text-center mt-5 mb-2">Welcome to world of brew</p>
            <center><button className="text-xs text-black bg-white px-5 py-2 rounded-full shadow-lg shadow-black cursor-pointer" onClick={()=>navigate('/collection')}>Explore your Taste</button></center>
        </div>
      </div>
      {/* new section start here */}
      <div className="text-center">
        <h1 className="intro-sec2 tracking-wider text-2xl">INTRODUCING</h1>
        <p className="intro-sec2 tracking-wider text-5xl m-2">FLAVORS 2025</p>
      </div>
      <div>
        <FlavSection/>
        <Discovery/>
        <TwoCards/>
        <ShortStore/>
        
      </div>
    </>
  );
}