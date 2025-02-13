import { Link } from 'react-router-dom'
import {data} from './config/staticData'

const Featured = ()=>{
    return(
        <>
        <div className="mx-6">
        <h1 className="text-white text-2xl">Featured</h1>
        <div className="py-4 flex flex-wrap gap-3 text-white">
            {
                data.Featured.map((product)=>{
                    return(
                       <div key={product.id} className="p-4 w-[calc((50%_-_0.5rem))] md:w-[calc((33.333%_-_0.5rem))] bg-[#2D2D2D]">
                        <Link to={`/product/${product.id}`}>
                        <img className="mb-2  max-w-[50%] min-w-[50%] min-h-[100px] md:min-h-[200px] max-h-[200px]" src={product.img} alt="product_img" />
                        <h2 className="text-sm md:text-lg">{product.name}</h2>
                        <h2 className="text-xs md:text-sm">{product.about}</h2>
                        </Link>
                        </div>
                    )
                })
            }
        </div>
        </div>
        </>
    )
}

export default Featured