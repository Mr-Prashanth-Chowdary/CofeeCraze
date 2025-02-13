import React from 'react'

export default function Readings() {
  return (
    <div className='bg-black text-white mx-6'>
        <h1 className='text-2xl mb-4'>Learn more about the World of coffee</h1>
        <div className='text-center h-[40vh] bg-center bg-cover flex flex-col items-center justify-center ' style={{ backgroundImage: "url('/Reading.png')" }}>
            <h2 className='text-lg font-bold'>How coffee Stirred Revels & Rebels</h2>
            <p className='text-sm'>Delited by the jovial character of coffee, everyone was inspired to bring it home leading to some of the most</p>
            <button className='mt-4 bg-white py-1 px-4 text-black'>Learn more</button>
        </div>
    </div>
  )
}
