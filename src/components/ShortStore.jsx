import { motion, useInView } from 'framer-motion';
import React, { useRef } from 'react';

const cards = [
  {
    img: './s0.png.webp',
    name: 'SULAWESI-KALSOI',
    label: 'Full-bodied, nutty and aromatic, with a long finish'
  },
  {
    img: './s1.png.webp',
    name: 'HOUSE OF BLEND',
    label: 'Lively, Sweet, and Familiar Latin blend'
  },
  {
    img: './s2.png.webp',
    name: 'MOCCA-JAVA DECAF',
    label: 'Heavy spice, Dried fruits and old teak'
  },
  {
    img: './s3.png.webp',
    name: 'HOUSE OF BLEND',
    label: 'Big body with notes of baking spice & bittersweet chocolate'
  },
  {
    img: './s4.png.webp',
    name: "MAJOR DICKASON'S BLEND OF DECAF",
    label: 'Incomparable world blend rich complex and full-bodied'
  },
  {
    img: './s5.png.webp',
    name: "ITALIAN ROAST",
    label: 'Smokey-Sweet, intense, perfetto'
  },
];

export default function CardGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.1,
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    })
  };

  return (
    <>
      <div className='flex flex-row justify-center mt-16'>
        <div className='w-[65%]'>
          <h1 className='typo1 text-4xl'>Best Sellers</h1>
          <p className='typo1 text-2xl'>
            The coffees our customers love best. From dark to light,<br />
            Intense to bright, there's always a new cup worth experiencing.
          </p>
        </div>
      </div>
      <div className="min-h-screen flex items-center justify-center p-4 overflow-x-hidden">
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl"
        >
          {cards.map((card, index) => (
            <motion.div
              key={index} 
              className="w-[300px] h-[300px] bg-white rounded-lg shadow-lg overflow-hidden relative cursor-pointer"
              custom={index}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={cardVariants}
              whileHover={{ scale: 1.02 }}
            >
              {/* Card Image Section */}
              <div className="absolute inset-0 bg-gray-200">
                <motion.img 
                  src={card.img} 
                  alt={card.name}
                  className="w-full h-full object-cover"
                  initial={{ scale: 1 }}
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-all duration-300 p-4 flex flex-col justify-end">
                <h3 className="text-white text-xl font-bold mb-2">{card.name}</h3>
                <p className="text-white/80 text-sm mb-4">
                  {card.label} {/* Fixed typo from lable to label */}
                </p>
                <button className="self-center px-6 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                  Buy Now
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>  
    </>
  )
}