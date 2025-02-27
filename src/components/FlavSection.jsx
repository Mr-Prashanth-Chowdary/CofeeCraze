


import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';

// Example image imports (replace with your actual images)
const img1 =  './b1.webp';
const img2 =  './b2.avif';
const img3 = './b3.avif';
const img4 = './b4.avif';

const favItems = [ {
  img: img1,
  pid: '67bc1e39c649295a9a610ce8',
  title: 'MAJOR DICKASON\'S BLEND',
  dis: 'A rich, bold, and smooth dark roast with a full-bodied flavor, perfect for coffee lovers.',
},
{
  img: img2,
  pid:'67bc1edec649295a9a610cea',
  title: 'PERU ORGANIC DEL NORTE',
  dis: 'A smooth, balanced medium roast with floral notes and a hint of natural sweetness.',
},
{
  img: img3,
  pid:'67bc2087c649295a9a610cf5',
  title: 'RESERVE',
  dis: 'A bold, smooth dark roast made from premium, hand-selected beans for a luxurious cup.',
  
},
{
  img: img4,
  pid:'67bc1ff5c649295a9a610cf3',
  title: 'UZURI AFRICAN BLEND',
  dis: 'A vibrant, fruity medium roast with spicy undertones, celebrating East African coffee.',
}];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      when: "beforeChildren"
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 }
  }
};

export default function FlavSection() {
  return (
    <div className="flex justify-center p-8 mb-20">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        
        {favItems.map((obj, index) => (
          <Link to={`/s/${obj.pid}`} key={obj.pid}>
          <motion.div
            key={obj.pid}
            className="relative h-[400px] rounded-xl overflow-hidden cursor-pointer group"
            variants={cardVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Background Image */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${obj.img})` }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.4 }}
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
            
            {/* Content Container */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-3">
              <div className="relative">
                <div className="absolute -top-8 left-0 h-1 w-12 bg-amber-500 transition-all duration-300 group-hover:w-20" />
                <h3 className="text-2xl font-bold uppercase tracking-wide mb-2">
                  {obj.title}
                </h3>
              </div>
              <p className="text-sm leading-snug line-clamp-1 opacity-90">
                {obj.dis}
              </p>
            </div>
          </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  )
}