import Featured from "./Featured"
import Readings from "./Readings"
import i from '/headimg.png'
import { Link } from "react-router-dom"


const Body = ()=>{
    return(
        <>
        <div className="bg-black">
            <div className=" h-[500px] mb-6 bg-center bg-cover bg-no-repeat"
                style={{backgroundImage : `url(${i})`}}>
                <div className="flex justify-center items-center w-full h-[500px] bg-black/20">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-medium text-white">Discover Your Prefect Brew</h1>
                        <div className="text-center">
                            <button className="m-4 p-4 bg-[#2D2D2D] text-white">Browse products</button>
                           <Link to='/shop'> <button className="m-4 p-4 bg-white ">Shop Now</button></Link>
                        </div>
                    </div>
                </div>
            </div>
         <Featured/>
         <Readings/>
        </div>
        </>
    )
}
export default Body