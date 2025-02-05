import { useParams } from 'react-router-dom'
import {data} from './config/staticData'

const ProductDetails = () =>{
    const {productId} = useParams()
    const product = data.Featured.find((coffee_obj)=> coffee_obj.id.toString() === productId)
    console.log(product)

    // const isAddtoCart = cart.some((obj)=> obj._id == product.id);
    // const handleCartBtn = (id,name,img,price,size)=>{
    //     Cart.AddtoCart({_id:id,name:name,img:img,price:price,size:size})
    // }
    // console.log(cart)
    console.log(isAddtoCart)
    return(
        <>
        <div className='bg-black text-white min-h-screen p-6 flex flex-col md:flex-row justify-between'>
        <div className='w-full md:w-[65%]'>
            <div className='w-full h-[400px] bg-center bg-cover' style={{backgroundImage : `url(${data.Featured[0].img})`}}></div>
            <p>{product.name}</p>
            <p>{product.about}</p>
            <p>${product.price}</p>
            <label htmlFor="quantity">Quantity</label><input id="quantity" type="number" /><br />
            {isAddtoCart ? 
            <button className='text-center w-full text-lg'>Buy Now</button>:
            <button className='text-center w-full text-lg' >Add to Cart</button>
            }
        </div>
        <div className='w-full md:w-[32%]'>
            <h1 className='font-bold text-xl mb-2'>Related Products</h1>
            <div className='flex gap-2 bg-[#2D2D2D] p-5'>
                <img className='w-[50px] h-[50px]' src={data.Featured[0].img} alt="" />
                <div>
                <p>{data.Featured[0].name}</p>
                <p>{data.Featured[0].price}</p>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
export default ProductDetails