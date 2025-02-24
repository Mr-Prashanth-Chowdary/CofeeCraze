import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const Aboutus = () => {
  const timelineRef = useRef(null);
  const isInView = useInView(timelineRef, { once: true, margin: "-15%" });
  const { scrollYProgress } = useScroll({ target: timelineRef });
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const timelineData = [
   
    {
      year: 1985,
      title: "European Crown Jewels",
      image: "/timeline/1985-paris-store.jpg",
      content:
        "Crowned with Parisian acclaim, opened flagship boutiques in Le Marais and Vienna's Goldenes Quartier.",
    },
    {
      year: 1995,
      title: "Royal Reserve Collection",
      image: "/timeline/1995-reserve.jpg",
      content:
        "Launched limited vintages from heritage Ethiopian cultivars, aged in French oak bourbon barrels.",
    },
    {
      year: 2005,
      title: "Global Connoisseur Network",
      image: "/timeline/2005-global.jpg",
      content:
        "Established private member clubs in 12 financial capitals, serving 43 royal households worldwide.",
    },
    {
      year: 2015,
      title: "Luxury Retail Dominance",
      image: "/timeline/2015-flagship.jpg",
      content:
        "Fifth Avenue flagship unveiled - 18,000 sqft coffee cathedral featuring live roasting theater.",
    },
    {
      year: 2025,
      title: "Intergalactic Ambitions",
      image: "/timeline/2025-future.jpg",
      content:
        "Partnering with SpaceVoyager Inc. to cultivate first extraterrestrial coffee varietals on Mars Colony One.",
    },
  ];

  return (
    <div className="typo1 min-h-screen bg-white antialiased">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 h-1.5 bg-gradient-to-r from-gold-500 to-gold-800 z-50 shadow-xl shadow-gold-200/30"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="relative h-screen flex items-center justify-center bg-gradient-to-b from-gold-50 to-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('/texture/gold-powder.png')] opacity-15 mix-blend-multiply" />

        <motion.div
  className="relative w-[90%] h-[70vh] rounded-[4rem] border-4 border-gold-300/40 overflow-hidden shadow-2xl"
  initial={{ scale: 0.95, rotate: -1 }}
  animate={{ scale: 1, rotate: 0 }}
  transition={{ type: "spring", delay: 0.3 }}
>
  <div className="absolute inset-0 m-2 lg:m-4 rounded-[3.5rem] overflow-hidden">
    <video
      className="w-full h-full object-cover"
      autoPlay
      muted
      playsInline
      loop
    >
      <source src="./vid.webm" type="video/webm" />
    </video>
  </div>
  <div className="absolute inset-0 bg-gradient-to-t from-gold-900/55 via-transparent to-transparent" />
</motion.div>

        <motion.h1
          className="absolute bottom-24 text-7xl font-cormorant text-white text-center leading-tight tracking-wide drop-shadow-2xl"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: -50, opacity: 1 }}
          transition={{ delay: 0.8, type: "spring" }}
        >
          <span className="block text-5xl mb-4 font-light opacity-90">
            Regal Beans Since
          </span>
          MDCCCXC
        </motion.h1>
      </motion.section>
    

      <h1 className="text-center text-5xl font-semibold tracking-wider">Journey of Discovery</h1>
      <p className="text-center text-xs my-2">A Story of Growth, From Dream to Reality, Milestones Along the Way</p>

      <section ref={timelineRef} className="relative py-20 bg-white">
        <div className="max-w-3xl mx-auto px-4">
          {timelineData.map((item, index) => (
            <motion.div
              key={item.year}
              className="relative flex items-start gap-8 py-12"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              {/* Timeline Connector */}
              <div className="absolute left-[46px] top-16 bottom-0 w-px bg-gray-200" />

              {/* Year Marker */}
              <div className="w-20 flex-shrink-0">
                <motion.div
                  className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center
                      transition-colors duration-300 hover:bg-blue-100"
                  whileHover={{ scale: 1.05 }}
                >
                  <span className="text-sm font-medium text-gray-600">
                    {item.year}
                  </span>
                </motion.div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="typo1 text-2xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Closing Section */}
      <section className="relative h-screen bg-gold-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('/texture/gold-leaf.jpg')] opacity-25 mix-blend-soft-light" />

        <motion.div
          className="relative max-w-5xl text-center px-8"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
        >
          <h2 className="font-cormorant text-6xl text-gold-100 mb-12 leading-tight">
            Sovereign of Specialty Coffee
          </h2>
          <div className="relative inline-block">
            <p className="text-xl text-gold-200/90 leading-relaxed px-8 border-t-2 border-b-2 border-gold-500/30 py-6">
              For 14 generations, our royal coffee masters have curated only the
              most exceptional 0.2% of global harvests, aging beans in
              18th-century Spanish cedar vaults to develop unparalleled depth
              and complexity worthy of the crown.
            </p>
            <div className="absolute -top-4 left-1/2 w-16 h-1 bg-gold-500 transform -translate-x-1/2" />
            <div className="absolute -bottom-4 left-1/2 w-16 h-1 bg-gold-500 transform -translate-x-1/2" />
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Aboutus;
