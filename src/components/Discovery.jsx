import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

export default function Discovery() {
  const textRef = useRef(null);
  const isInView = useInView(textRef, { once: true, margin: "-20%" });

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.03 },
    }),
  };

  // Image animation variants
  const imageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 2, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  // Sample text content
  const headingText = "Our-featured-One";
  const contentText =
    "Indulge in the rich aroma and bold flavors of our finest coffee selection. Sourced from the best beans, each sip delivers a perfect balance of taste and freshness. Whether you love a strong espresso or a smooth latte, this coffee is crafted to satisfy. Experience the warmth, energy, and passion in every cup. Elevate your coffee moments with our special brew!";

  return (
    <>
      <div className="typo1 flex flex-wrap justify-center mt-15">
        <h1 className="w-[80%] text-left">
          <span className="text-3xl font-bold">Rise & grind.</span>
          <br />
          <span className="text-4xl">
            Embrace the dawn with a cup of freshly brewed coffee that energizes
            your spirit, propelling you forward to conquer every challenge with
            joy.
          </span>
        </h1>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 mx-3 gap-8">
        {/* Image Section */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img
            src="/ODO.jpg"
            alt="Featured"
            className="w-[400px] h-[400px] object-cover rounded-lg shadow-xl"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="w-full md:w-1/2 px-6"
          ref={textRef}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h1
              className="OFO-Heading text-4xl font-bold mb-6"
              variants={textVariants}
            >
              {headingText.split("").map((char, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={textVariants}
                  style={{ display: "inline-block" }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Content */}
          <motion.p
            className="OFO-discreption text-lg mb-8 opacity-80 leading-relaxed"
            variants={{
              hidden: { opacity: 0, x: -20 },
              visible: {
                opacity: 0.8,
                x: 0,
                transition: { duration: 0.8 },
              },
            }}
          >
            {contentText}
          </motion.p>

          {/* Button */}
          <motion.div
            className="flex justify-start"
            variants={buttonVariants}
            transition={{ delay: 0.5 }}
          >
            <button className="group relative overflow-hidden px-8 py-3 border border-black transition-colors duration-300 ease-in-out hover:text-white">
              {/* The sliding background */}
              <span className="absolute left-0 top-0 h-full w-0 bg-black transition-all duration-300 ease-out group-hover:w-full"></span>
              {/* The button text */}
              <span className="relative">Sip & Discover</span>
            </button>
            
          </motion.div>
        </motion.div>
      </div>
    </>
  );
}
