import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Shimmer from "../shimmerUI/ShopShimmer";
import Paynow from "../Paynow";
import baseURL from "../config/baseURL";

function Product({ product }) {
  const [isAdded, setIsAdded] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");



// Function to check if the product is already in the cart
const checkIfAdded = async () => {
  const token = localStorage.getItem("token");
  if (token) {
    try {
      // Call the new API endpoint which returns { exists: true/false }
      const response = await axios.get(
        `${baseURL}/api/cart/${product._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsAdded(response.data.exists);
    } catch (error) {
      console.error("Error checking DB cart:", error);
    }
  } else {
    // For non-logged in users, check local storage
    const localCart = JSON.parse(localStorage.getItem("localCart")) || [];
    if (localCart.includes(product._id)) {
      setIsAdded(true);
    }
  }
};

useEffect(() => {
  checkIfAdded();
  // Optionally, re-run check if product._id changes
}, [product._id]);


// Function to sync local cart items to DB
const syncLocalCart = async () => {
  const token = localStorage.getItem("token");
  if (!token) return; // No token, so nothing to sync

  // Retrieve the local cart (an array of product IDs)
  const localCart = JSON.parse(localStorage.getItem("localCart")) || [];
  if (localCart.length === 0) return; // Nothing to sync

  // Sync each local cart item to the database
  for (const itemId of localCart) {
    try {
      await axios.post(
        `${baseURL}/api/cart/citem`,
        { id: itemId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (error) {
      console.error("Error syncing cart item:", error);
    }
  }
  // Clear the local cart after syncing
  localStorage.removeItem("localCart");
};

const handleAddtoCart = async (id) => {
  try {
    const token = localStorage.getItem("token");
    if (token) {
      // If user is logged in, first sync any local cart items, then add current item
      await syncLocalCart();
      const response = await axios.post(
        `${baseURL}/api/cart/citem`,
        { id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Added to DB", response.data);
    } else {
      // If not logged in, save the id in local storage
      const localCart = JSON.parse(localStorage.getItem("localCart")) || [];
      localCart.push(id);
      localStorage.setItem("localCart", JSON.stringify(localCart));
      console.log("Added to local cart", localCart);
    }
    setIsAdded(true);
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap gap-8 p-6 max-w-6xl mx-auto">
        {/* Image Gallery */}
        <div className="w-full md:w-1/2">
          <div className="aspect-square bg-gray-100 mb-4">
            <img
              src={product.images[selectedImageIndex]}
              alt="Main product"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                className={`min-w-[100px] h-24 border-2 ${
                  index === selectedImageIndex
                    ? "border-black"
                    : "border-transparent"
                }`}
              >
                <img
                  src={img}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-contain"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="text-2xl">${product.price}</p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Size</h3>
            <div className="flex gap-3">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-6 py-2 border-2 ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-200 hover:border-gray-400"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed">
            {product.description}
          </p>

          <div className="flex gap-4">
            <button className="flex-1 bg-black text-white py-4 hover:bg-gray-800"
            disabled={isAdded}
            onClick={()=>handleAddtoCart(product._id)}>
            {isAdded ? "Added" : "Add to Cart"}
            </button>
            <button className="flex-1 bg-gray-200 py-4 hover:bg-gray-300">
              <Paynow btnName="Buy Now " amount={product.price}/>
            </button>
          </div>
        </div>
      </div>

      {/* Product Story Section */}
      <div className="w-4/5 mx-auto mt-12 p-6 border rounded-lg flex">
        {/* Story Text: 40% width */}
        <div className="w-[40%] pr-4">
          <h2 className="text-2xl font-bold mb-4">Our Story</h2>
          <p className="text-lg leading-relaxed">
            {product.story ||
              "Born in the highlands where the morning mist meets sun-drenched plantations, our coffee tells a tale of passion and heritage. Each bean is a flirtatious whisper of nature’s bounty and artisanal love—a secret rendezvous between tradition and taste that leaves you yearning for more."}
          </p>
          <button className="py-2 px-4 border-black border-[1px] mt-4">
            read more
          </button>
        </div>
        {/* Image Section: 60% width with fixed height */}
        <div className="w-[60%] h-[300px] overflow-hidden">
          <img
            src={product.images[1]}
            alt="Our Coffee Story"
            className="w-full h-full object-cover object-center rounded-lg"
          />
        </div>
      </div>

      {/* Product Brewing Methods */}
      <div className="flex flex-col items-center justify-center py-8">
        <h2 className="text-2xl font-bold mb-2">How to Brew</h2>
        <div className="flex flex-row justify-center items-center w-full max-w-4xl space-x-4">
          {/* Content Box (40% width) */}
          <div className="w-[40%] p-4">
            <p className="text-lg leading-relaxed">
              Discover the secrets behind a perfect brew—from selecting the
              finest beans to mastering every step of the process, let passion
              and precision fill your cup.
            </p>
          </div>
          {/* Video Box (60% width) */}
          <div className="w-[60%] p-4">
            <iframe
              className="w-full h-64 object-cover rounded-lg"
              src={product.videoUrl || "https://www.youtube.com/embed/VIDEO_ID"}
              title="How to Brew Coffee"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default function ShopCollection() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // new loading state
  const { id } = useParams();

  useEffect(() => {
    const getItem = async () => {
      try {
        const response = await axios.get(
          `${baseURL}/api/products/${id}`
        );
        // Assuming response.data is a product object, map it to your UI structure
        const product = response.data;
        const mappedProduct = {
          _id: product._id,
          title: product.itemName, // Map 'itemName' to 'title'
          price: product.price,
          description: product.description,
          sizes: product.sizes,
          images: [product.image1, product.image2, product.image3], // Combine image fields into an array
          story: product.story,
          videoUrl: product.videoUrl,
        };
        // Wrap the product in an array so that you can map over it (if you only have one product)
        setData([mappedProduct]);
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false); // set loading to false after fetch completes
      }
    };
    getItem();
  }, [id]);

  // Render the Shimmer component while data is loading
  if (loading) {
    return <Shimmer />;
  }

  return (
    <div className="py-12">
      {data.map((product) => (
        <Product key={product._id} product={product} />
      ))}
    </div>
  );
}
