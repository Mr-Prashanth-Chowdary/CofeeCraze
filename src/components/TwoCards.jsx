import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

export default function FlavSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const cardVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  };

  const rightCardVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <>
    <div className='flex justify-center items-center flex-col  mx-3'>
      <div className='w-[80%]'>
      <h1 className='typo1 text-center text-4xl '>What We Serve</h1>
      <p className='typo1 text-center text-2xl '>Savor our love-infused brew—a sultry, sweet caress for your senses—paired with bold, hand-picked beans that spark an irresistible romance, leaving you craving more.</p>
      </div>
    </div>
    <div ref={ref} className="flex justify-center p-4 overflow-x-hidden">
      <div className="flex justify-center w-full max-w-6xl">
        {/* Left Card */}
        <motion.div
          className="mx-3 h-[200px] bg-black rounded-lg flex-1 overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={cardVariants}
          transition={{ type: 'ease-in-out', duration: 0.6 }}
        >
          {/*  content for left card */}
         <img className='object-center' src="/twoc1.jpg" alt="slid1.jpg" />
        </motion.div>

        {/* Right Card */}
        <motion.div
          className="mx-3 h-[200px] bg-black rounded-lg flex-1 overflow-hidden"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={rightCardVariants}
          transition={{ type: 'ease-in-out', duration: 0.6 }}
        >
          {/*  content for right card */}
          <img
  className="mx-auto block w-full"
  src="/twoc-2.jpg"
  alt="towc2 image"
/>

        </motion.div>
      </div>
    </div>
    </>
  )
}