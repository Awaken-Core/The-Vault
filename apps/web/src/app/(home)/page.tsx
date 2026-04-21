"use client";

import { motion } from "motion/react";

const Home = () => {
  return (
    <div
      className='min-h-screen w-full flex items-center justify-center text-[40px] font-medium font-sans tracking-[-1px] bg-[#c0c0c0] text-[#424242]'
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        Awaken Studios.
      </motion.p>
    </div>
  )
}

export default Home;