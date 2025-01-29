
const Footer = ()=>{
    return(
        <>
        <div className="text-xs md:text-lg py-6 flex w-full justify-between  bg-[#2D2D2D] text-white">
        <ul className="ml-7">
            <label htmlFor="" className="font-medium">Quick Links</label>
            <li>Privacy Policy</li>
            <li>Terms and Service</li>
            <li>Contact Us</li>
        </ul>
        <ul className=" hidden md:block ">
            <label htmlFor="" className="font-medium">Contact Information</label>
            <li>123 Coffee StreetBean Town, CO</li>
            <li>12345Email: support@coffeecraze.com</li>
        </ul>
        <ul className="mr-7 ">
            <label htmlFor="">Follow Us</label>
            <ul className="flex gap-4">
            <li>fb</li>
            <li>In</li>
            <li>X</li>
            </ul>
        </ul>
        </div>
        </>
    )
}
export default Footer