import { useEffect, useState } from "react";
import { data } from "./config/staticData";

const Shop = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearch, setIsSearch] = useState(false);
  const [cart, setCart] = useState(() => {
    const locData = localStorage.getItem("cart");
    return locData ? JSON.parse(locData) : [];
  });
  console.log(cart);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const handleAddtoCart = (id, img, name, size, price) => {
    let newItem = { id: id, img: img, name: name, size: size, price: price };
    setCart((prev) => [...prev, newItem]);
  };

  const searchData = data.Featured.filter((obj) =>
    obj.name.toLowerCase().includes(searchText.trim().toLowerCase())
  );
  console.log(searchData);

  return (
    <>
      <div className="p-6 min-h-screen bg-black text-white">
        <div className="flex justify-between mb-6">
          <div>
            <input
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
                setIsSearch(false);
              }}
              type="text"
              name="search"
              id="search"
              className=" border-1 border-[#2D2D2D] mr-2 py-1 px-6 placeholder-blue-200/20 "
              placeholder="Search Coffee.."
            />
            <button
              className=" cursor-pointer px-7 py-1 text-white bg-[#2D2D2D]"
              onClick={() => setIsSearch(true)}
            >
              Search
            </button>
          </div>
          <div className="hidden md:block text-white">
            <label htmlFor="sort">sort by: </label>
            <select
              name="sort"
              id="sort"
              className="border-1 border-[#2D2D2D] py-1"
            >
              <option value="price">price</option>
              <option value="price">rating</option>
              <option value="price">caffeine</option>
              <option value="price">valueded</option>
            </select>
          </div>
        </div>
        {/* cards */}
        <div className="flex flex-wrap gap-3 text-xs md:text-sm text-white">
          {isSearch
            ? searchData.map((product, i) => {
                return (
                  <div
                    key={product.id}
                    className="p-4 w-[calc((50%_-_0.5rem))] md:w-[calc((33.33333%_-_0.5rem))] bg-[#2D2D2D]"
                  >
                    <img className="w-[50%] mb-2" src={product.img} alt="" />
                    <p className="text-sm md:text-lg">{product.name}</p>
                    <p className="text-xs md:text-sm">{product.about}</p>
                    <p className="text-xs md:text-sm">${product.price}</p>
                    
                    {cart.some((itm) => itm.id === product.id) ? (
                        <button  className="text-center w-full">
                        Buy Now
                      </button>
                     
                    ) : (
                      <button
                      className="text-center w-full"
                      onClick={() =>
                        handleAddtoCart(
                          product.id,
                          product.img,
                          product.name,
                          product.size,
                          product.price
                        )
                      }
                    >
                    {" "}
                    </button>
                    )}
                  </div>
                );
              })
            : data.Featured.map((product, i) => {
                return (
                  <div
                    key={product.id}
                    className="p-4 w-[calc((50%_-_0.5rem))] md:w-[calc((33.33333%_-_0.5rem))] bg-[#2D2D2D]"
                  >
                    <img className="w-[50%] mb-2" src={product.img} alt="" />
                    <p className="text-sm md:text-lg">{product.name}</p>
                    <p className="text-xs md:text-sm">{product.about}</p>
                    <p className="text-xs md:text-sm">${product.price}</p>

                    {cart.some((itm) => itm.id === product.id) ? (
                       <button  className="text-center w-full">
                       Buy Now
                     </button>
                      
                    ) : (
                      <button
                      className="text-center w-full"
                      onClick={() =>
                        handleAddtoCart(
                          product.id,
                          product.img,
                          product.name,
                          product.size,
                          product.price
                        )
                      }
                    >
                    {" "}
                    Add to Cart
                    </button>
                    )}
                  </div>
                );
              })}
        </div>
      </div>
    </>
  );
};
export default Shop;
