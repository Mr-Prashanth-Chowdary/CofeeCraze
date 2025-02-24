import { motion } from 'framer-motion';
import React from 'react';

// Example image imports (replace with your actual images)
const img1 =  './b1.webp';
const img2 =  './b2.avif';
const img3 = './b3.avif';
const img4 = './b4.avif';

const images = [img1, img2, img3, img4];

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
    transition: { type: 'spring', stiffness: 120 }
  }
};

export default function FlavSection() {
  return (
    <div className="flex justify-center p-4 mb-7">
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 w-full max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative h-[300px] rounded-lg overflow-hidden cursor-pointer"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            {/* Background Image with Zoom Effect */}
            <motion.div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${image})` }}
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 hover:bg-black/10 transition-all duration-300" />
            
            {/* Add your card content here */}
            <div className="relative z-10 p-4 text-white">
              <h3>Card Title</h3>
              <p>Card description</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}