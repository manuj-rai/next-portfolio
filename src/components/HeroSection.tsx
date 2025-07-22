"use client";

import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";
import Image from "next/image";
import { ArrowDown, Github, Linkedin, Mail, Download } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-indigo-950 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-4 -right-4 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-4 -left-4 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-20 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left max-w-2xl z-10"
        >
          {/* Greeting Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-full text-sm text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700 mb-6"
          >
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
            Available for work
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 dark:text-white leading-tight mb-4">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 dark:from-blue-400 dark:via-purple-400 dark:to-blue-300 bg-clip-text text-transparent">
              Manuj Rai
            </span>
          </h1>

          <div className="text-2xl lg:text-3xl text-gray-700 dark:text-gray-300 mb-6 min-h-[3rem] flex items-center justify-center lg:justify-start">
            <Typewriter
              words={[
                "Full-Stack Developer 🚀",
                "AI Enthusiast 🤖",
                "UX Designer 🎨",
                "Problem Solver 💡",
                "Building Scalable Apps 📱",
              ]}
              loop
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={2000}
            />
          </div>

          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0">
            Passionate about creating <span className="text-blue-600 dark:text-blue-400 font-semibold">secure</span> and{" "}
            <span className="text-purple-600 dark:text-purple-400 font-semibold">scalable</span> web applications using
            Next.js, Supabase, and cutting-edge technologies.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/projects"
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                View Projects
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/resume.pdf"
                className="px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-semibold hover:bg-white hover:shadow-lg dark:hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4" />
                Download CV
              </Link>
            </motion.div>
          </div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex justify-center lg:justify-start gap-4"
          >
            <Link
              href="https://github.com/manujrai"
              className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Github className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link
              href="https://linkedin.com/in/manujrai"
              className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Linkedin className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
            <Link
              href="/contact"
              className="p-3 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-full hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 hover:shadow-lg"
            >
              <Mail className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </Link>
          </motion.div>
        </motion.div>

        {/* Right Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          className="relative z-10"
        >
          {/* Animated Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 p-1 opacity-75"
          >
            <div className="w-full h-full rounded-full bg-white dark:bg-gray-900"></div>
          </motion.div>

          {/* Avatar Container */}
          <div className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden shadow-2xl">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full"
            >
              <Image
                src="/Manuj Rai.jpg"
                alt="Manuj Rai - Full Stack Developer"
                fill
                className="object-cover hover:grayscale-0 grayscale-[20%] transition-all duration-500"
                priority
              />
            </motion.div>
            
            {/* Floating Elements */}
            <motion.div
              animate={{ y: [-10, 10, -10] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            >
              🚀
            </motion.div>
            
            <motion.div
              animate={{ y: [10, -10, 10] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg"
            >
              💡
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-gray-500 dark:text-gray-400"
        >
          <span className="text-sm mb-2">Scroll down</span>
          <ArrowDown className="w-5 h-5" />
        </motion.div>
      </motion.div>
    </section>
  );
}