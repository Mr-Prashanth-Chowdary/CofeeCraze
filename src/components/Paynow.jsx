import React from 'react'
import baseURL from './config/baseURL';

export default function Paynow({btnName,amount}) {
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://checkout.razorpay.com/v1/checkout.js";
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });
    };
    
    const payNow = async () => {
        if (!amount) {
          alert("Please enter an amount");
          return;
        }
    
        const res = await loadRazorpayScript();
        if (!res) {
          alert("Razorpay SDK failed to load. Check your internet connection.");
          return;
        }
    
        const token = localStorage.getItem('token');
        if (!token) return;
  
        const response = await fetch(`${baseURL}/api/pay/create-order`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amount, currency: "INR", receipt: "receipt#1", notes: {} }),
        })
          .then((res) => {
            // console.log(res)
            return res.json()})
          .catch((error) => {
            console.error("Error creating order:", error);
            alert("Failed to create order. Please try again.");
            return null;
          });
    
        if (!response) return;
    
        const options = {
          key: "rzp_test_TAhIYYaJyITOJF", // Replace with your Razorpay Key ID
          amount: response.amount,
          currency: response.currency,
          name: "Cofecaze",
          description: "Test Transaction",
          order_id: response.id,
          callback_url: `${baseURL}/api/pay/payment-success`,
          prefill: {
            name: "Your Name",
            email: "your.email@example.com",
            contact: "9999999999",
          },
          theme: {
            color: "#F37254",
          },
          handler: function (response) {
            // console.log(response)
            fetch(`${baseURL}/api/pay/verify-payment`, {
                method: "POST",
                headers: {
                  "Authorization": `Bearer ${localStorage.getItem('token')}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                }),
              })
                .then((res) => res.json()) // If this fails, backend is not returning JSON
                .then((data) => {
                  // console.log("Verification Response:", data);
                  if (data.status === "ok") {
                    const params = new URLSearchParams({
                      amountPaid: data.paydata.amountPaid,
                      transactionId: data.paydata.paymentId,
                      date: data.paydata.date,
                    }).toString();
                    window.location.href = `http://localhost:5173/paymentsuccess?${params}`;
                    // window.location.href = `${baseURL}/paymentsuccess?${params}`;
                  } else {
                    alert("Payment verification failed");
                  }
                })
                .catch((e) => {
                  console.error("Error:", e);
                  alert("Error verifying payment");
                });          
          },
        };
    
        const rzp = new window.Razorpay(options);
        rzp.open();
      };
    

  return (
    <div><button onClick={payNow} className='text-center w-full'>{btnName}</button></div>
  )
}
