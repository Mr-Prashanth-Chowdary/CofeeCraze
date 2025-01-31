const Checkout = () => {
  return (
    <>
      <div className=" flex flex-col md:flex-row gap-6 text-white bg-black p-6">
        <div className="w-full bg-[#1d1d1d] p-6">
          <form>
            <div className="flex flex-col gap-2">
              <h1 className="font-bold text-2xl">Shipping Details</h1>
              <input
                className=" border-1 p-1"
                type="text"
                name="fullname"
                placeholder="Full Name"
              />
              <input
                className=" border-1 p-1 "
                type="text"
                name="address"
                placeholder="Address"
              />
              <div>
                <input
                  className=" border-1 w-[70%] mr-2 p-1"
                  type="text"
                  name="city"
                  placeholder="City"
                />
                <input
                  className=" border-1 p-1 w-[calc((100%_-_70%_-_0.5rem))]"
                  type="text"
                  name="zipcode"
                  placeholder="Zipcode"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <h2 className="font-bold text-2xl">Payment Information</h2>
              <input
                className=" border-1 p-1"
                type="text"
                name="ccnumber"
                placeholder="Credit Card Number"
              />
              <div>
                <input
                  className=" border-1 p-1 w-[70%] mr-2"
                  type="text"
                  name="expirydate"
                  placeholder="Expiry Date"
                />
                <input
                  className=" border-1 p-1 w-[calc((100%_-_70%_-_0.5rem))]"
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                />
              </div>
            </div>
          </form>
        </div>
        <div className="w-full flex flex-col gap-4 md:h-[70vh] md:w-1/2 bg-[#2D2D2D] p-6">
        <h2>Order Summary</h2>
        <div className="flex justify-between ">
          <p>Colombian Coffee Beans x 1</p>
          <p>$15.00</p>
        </div>
        <div className="flex justify-between ">
          <p>Ethiopian Espresso x 2</p>
          <p>$30.00</p>
        </div>
        <div className="flex justify-between font-bold text-lg ">
          <p>SubTotal</p>
          <p>$45.00</p>
        </div>
        <div className="flex justify-between ">
          <p>Shipping</p>
          <select name="Shipping" id="shipping">
            <option value="standard">standard-$5.00</option>
          </select>
        </div>
        <div className="flex justify-between  font-bold text-lg">
          <p>Total</p>
          <p>$50.00</p>
        </div>
        <div className="m-4 flex h-full items-end">
        <button className="text-center bg-amber-300 w-full ">Buy</button>
        </div>
      </div>
      </div>
    </>
  );
};
export default Checkout;
