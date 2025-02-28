import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom';

export default function PaymentSuccess() {
    const navigation = useNavigate()
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);
    const amountPaid = queryParams.get('amountPaid');
    const transactionId = queryParams.get('transactionId');
    const date = queryParams.get('date');
    if (!amountPaid || !transactionId || !date) {
        return <div>Payment details are missing. Please check your payment history.</div>;
      }
  return (
    <div className='bg-white font-[Inter] min-h-screen' >
        <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-lg w-full text-center space-y-8">
       
            <div className="flex justify-center">
                <div className="w-20 h-20 bg-green-100/80 rounded-full flex items-center justify-center">
                    <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                </div>
            </div>

 
            <div className="space-y-4">
                <h1 className="text-3xl font-bold text-gray-900">Payment Successful</h1>
                <p className="text-gray-600 text-lg">
                    Thank you for your payment. Your transaction has been completed successfully.
                </p>
            </div>

    
            <div className="bg-gray-50 rounded-lg p-6 text-left space-y-4">
                <div className="grid grid-cols-2">
                    <span className="text-gray-600">Amount Paid:</span>
                    <span className="text-gray-900 font-medium text-right">₹ {amountPaid}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="text-gray-600">Transaction ID:</span>
                    <span className="text-gray-900 font-medium text-right underline">{transactionId}</span>
                </div>
                <div className="grid grid-cols-2">
                    <span className="text-gray-600">Date:</span>
                    <span className="text-gray-900 font-medium text-right">{new Date(Number(date*1000)).toDateString()}</span>
                </div>
            </div>

          
            <button className="w-full bg-gray-900 text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition-colors duration-200"
            onClick={()=>navigation('/collection')}>
                Continue Shoping
            </button>
        </div>
    </div>
    </div>
  )
}
