"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { 
  Github, 
  Linkedin, 
  Mail, 
  Twitter, 
  MapPin, 
  Phone, 
  Heart,
  ArrowUp,
  Code,
  Palette,
  Zap
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/manuj_rai",
      icon: Github,
      color: "hover:text-gray-900 dark:hover:text-white",
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/manuj_rai",
      icon: Linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Twitter",
      href: "https://twitter.com/manuj_rai",
      icon: Twitter,
      color: "hover:text-blue-400",
    },
    {
      name: "Email",
      href: "mailto:imanujrai7@gmail.com",
      icon: Mail,
      color: "hover:text-red-500",
    },
  ];

  const quickLinks = [
    { name: "About", href: "/about" },
    { name: "Projects", href: "/projects" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  const services = [
    { name: "Web Development", icon: Code },
    { name: "UI/UX Design", icon: Palette },
    { name: "Performance Optimization", icon: Zap },
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.footer
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 border-t border-gray-200 dark:border-gray-700 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-400/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16 relative">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2"
          >
            <Link href="/" className="inline-block mb-4">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Manuj Rai
              </h3>
            </Link>
            <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
              Full-stack developer passionate about creating beautiful, functional, and user-centered digital experiences. 
              Let&apos;s build something amazing together.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Ahmedabad, Gujarat, India</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <a href="mailto:manuj@example.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                  manuj@example.com
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 ${social.color} transition-all duration-300`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name} className="flex items-center gap-3">
                  <service.icon className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-gray-600 dark:text-gray-400 text-sm">
                    {service.name}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Newsletter Signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12 border border-blue-100 dark:border-blue-800/30"
        >
          <div className="text-center max-w-2xl mx-auto">
            <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
              Stay Updated
            </h4>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Get notified about new projects, articles, and updates. No spam, just valuable content.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-gray-900 dark:text-white"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mb-4 md:mb-0">
            <span>© {currentYear} Manuj Rai. Made with</span>
            <Heart className="w-4 h-4 text-red-500 fill-current" />
            <span>in India</span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/privacy"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Terms of Service
            </Link>
            
            {/* Scroll to Top Button */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Subtle Animation Effect */}
      <motion.div
        animate={{ 
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="absolute inset-0 opacity-5 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-[length:200%_200%] pointer-events-none"
      />
    </motion.footer>
  );
}