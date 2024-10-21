import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, Search, MapPin, Calendar, User } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const slideUp = {
  hidden: { y: 50, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
};

const staggerChildren = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const slides = [
    { image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80", title: "探索长城" },
    { image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80", title: "游览故宫" },
    { image: "https://images.unsplash.com/photo-1591122947157-26bad3a117d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=2100&q=80", title: "观赏兵马俑" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <a href="#" className={`text-2xl font-bold ${isScrolled ? 'text-red-600' : 'text-white'}`}>中国旅游</a>
          <div className="hidden md:flex space-x-6">
            {['目的地', '体验', '计划', '关于中国'].map((item, index) => (
              <a key={index} href="#" className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:text-red-600 transition-colors duration-300`}>{item}</a>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button className={`${isScrolled ? 'text-gray-600' : 'text-white'} hover:text-red-600`}>
              <Search size={20} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`md:hidden ${isScrolled ? 'text-gray-600' : 'text-white'} hover:text-red-600`}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-white z-40 pt-20"
          >
            <div className="container mx-auto px-4 py-8">
              {['目的地', '体验', '计划', '关于中国'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="block py-3 text-xl text-gray-800 hover:text-red-600 border-b border-gray-200"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <img src={slides[currentSlide].image} alt={slides[currentSlide].title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40" />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <motion.div
            className="text-center"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1 variants={slideUp} className="text-5xl md:text-7xl font-bold mb-4">探索中国</motion.h1>
            <motion.p variants={slideUp} className="text-xl md:text-2xl mb-8">体验五千年文明的魅力</motion.p>
            <motion.a
              variants={slideUp}
              href="#"
              className="inline-block bg-red-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-red-700 transition-colors duration-300"
            >
              开始探索
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            热门目的地
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: "北京", image: "https://images.unsplash.com/photo-1584646098378-0874589d76b1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
              { title: "上海", image: "https://images.unsplash.com/photo-1538428494232-9c0d8a3ab403?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
              { title: "西安", image: "https://images.unsplash.com/photo-1591122947157-26bad3a117d2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ y: -10 }}
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <a href="#" className="text-red-600 hover:text-red-800 flex items-center">
                    <span>探索</span>
                    <ChevronDown size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Travel Planner */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            规划您的旅程
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="bg-white shadow-lg rounded-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 pr-4">
                <MapPin className="text-red-600 mr-2" />
                <input type="text" placeholder="目的地" className="w-full focus:outline-none" />
              </div>
              <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 pr-4">
                <Calendar className="text-red-600 mr-2" />
                <input type="text" placeholder="日期" className="w-full focus:outline-none" />
              </div>
              <div className="flex items-center border-b md:border-b-0 md:border-r border-gray-200 pb-4 md:pb-0 pr-4">
                <User className="text-red-600 mr-2" />
                <input type="text" placeholder="旅客" className="w-full focus:outline-none" />
              </div>
              <button className="bg-red-600 text-white py-2 px-4 rounded-full hover:bg-red-700 transition-colors duration-300">
                搜索
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Travel Experiences */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            精彩体验
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { title: "长城徒步", image: "https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
              { title: "茶道体验", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
              { title: "熊猫基地", image: "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
              { title: "江南水乡", image: "https://images.unsplash.com/photo-1598903859340-3933a2e27b9f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                className="bg-white rounded-lg shadow-md overflow-hidden"
                whileHover={{ scale: 1.05 }}
              >
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <a href="#" className="text-red-600 hover:text-red-800 flex items-center">
                    <span>了解更多</span>
                    <ChevronDown size={16} className="ml-1" />
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-red-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center"
          >
            <motion.h2 variants={slideUp} className="text-3xl font-bold mb-4">订阅我们的旅游资讯</motion.h2>
            <motion.p variants={slideUp} className="mb-8">获取最新的旅游信息、优惠和独家内容</motion.p>
            <motion.form variants={slideUp} className="max-w-md mx-auto flex">
              <input
                type="email"
                placeholder="您的邮箱地址"
                className="flex-grow px-4 py-2 rounded-l-full focus:outline-none text-gray-800"
              />
              <button
                type="submit"
                className="bg-yellow-500 text-gray-800 px-6 py-2 rounded-r-full hover:bg-yellow-400 transition-colors duration-300"
              >
                订阅
              </button>
            </motion.form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">关于我们</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-400">公司简介</a></li>
                <li><a href="#" className="hover:text-red-400">联系我们</a></li>
                <li><a href="#" className="hover:text-red-400">加入我们</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">目的地</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-400">北京</a></li>
                <li><a href="#" className="hover:text-red-400">上海</a></li>
                <li><a href="#" className="hover:text-red-400">西安</a></li>
                <li><a href="#" className="hover:text-red-400">成都</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">旅游资源</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-red-400">旅游攻略</a></li>
                <li><a href="#" className="hover:text-red-400">景点门票</a></li>
                <li><a href="#" className="hover:text-red-400">酒店预订</a></li>
                <li><a href="#" className="hover:text-red-400">交通信息</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">关注我们</h3>
              <div className="flex space-x-4">
                {/* Add social media icons here */}
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 中国旅游. 保留所有权利.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;