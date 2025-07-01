import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCourses } from '../redux/reducers/courseSlice';
import { getUsers } from '../redux/reducers/userSlice';
import Oner2 from "../components/Oner2";
import {
  FaChevronRight, FaSearch, FaTimes,
  FaStar, FaFire, FaRegClock, FaRocket,
  FaGithub, FaLinkedin, FaEnvelope, FaChalkboardTeacher
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [visible,setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { courses } = useSelector((state) => state.course);
  const { users } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentFeature, setCurrentFeature] = useState(0);


const fonk =()=>{
  setVisible(true)
}

  useEffect(() => {
    dispatch(getCourses());
    dispatch(getUsers());
  }, [dispatch]);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredResults([]);
      return;
    }

    const matchedCourses = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (course.user?.username && course.user.username.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const matchedUsers = users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const results = [
      ...matchedCourses.map(course => ({ ...course, type: 'course' })),
      ...matchedUsers.map(user => ({ ...user, type: 'user' }))
    ];

    setFilteredResults(results);
  }, [searchTerm, courses, users]);

  // Öne çıkan özellikler için otomatik geçiş
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Animasyon varyasyonları
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      title: "Uzman Eğitmenler",
      description: "Sektör deneyimli eğitmenlerle öğrenin",
      icon: <FaChalkboardTeacher className="text-amber-400 text-4xl" />,
      bg: "from-amber-500/10 to-amber-600/20"
    },
    {
      title: "Pratik Projeler",
      description: "Gerçek dünya uygulamalarıyla öğrenin",
      icon: <FaFire className="text-orange-500 text-4xl" />,
      bg: "from-orange-500/10 to-red-600/20"
    },
    {
      title: "Kariyer Desteği",
      description: "İş bulma sürecinde yanınızdayız",
      icon: <FaRocket className="text-purple-500 text-4xl" />,
      bg: "from-purple-500/10 to-indigo-600/20"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-900 via-gray-900 to-gray-800 text-white min-h-screen overflow-x-hidden">
      {/* Hero Bölümü */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24 bg-gradient-to-br from-gray-900 via-black to-gray-900 overflow-hidden">
        {/* Parıltı efektleri */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-amber-400"
              style={{
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              
              animate={{
                x: [0, (Math.random() - 0.5) * 100],
                y: [0, (Math.random() - 0.5) * 100],
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              Bilginin
            </span>{" "}
            
            <span className="text-white">Kapılarını Aralayın</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-12"
          >
            Uzman eğitmenlerden öğrenin, pratik projelerle becerilerinizi geliştirin ve kariyerinize yön verin.
          </motion.p>

          {/* Arama Çubuğu */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="relative w-full max-w-2xl mx-auto"
          >
            <div className={`flex items-center rounded-xl overflow-hidden bg-gray-800/70 backdrop-blur-sm transition-all duration-300 ${isSearchFocused ? 'ring-2 ring-amber-400 shadow-xl' : 'shadow-2xl'}`}>
              <input
                type="text"
                placeholder="Hangi alanda uzmanlaşmak istersiniz?"
                className="w-full p-5 pl-14 focus:outline-none bg-transparent text-white placeholder-gray-400 text-lg"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setTimeout(() => setIsSearchFocused(false), 150)}
              />
              <FaSearch className="absolute left-5 text-gray-400 text-xl" />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-5 text-gray-400 hover:text-white transition"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <AnimatePresence>
              {isSearchFocused && searchTerm.trim() !== '' && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute w-full mt-2 bg-gray-800/95 backdrop-blur-lg border border-gray-700 rounded-xl shadow-2xl z-50 max-h-80 overflow-y-auto"
                >
                  {filteredResults.length > 0 ? (
                    filteredResults.map(item => (
                      <Link
                        to={item.type === 'user' ? `/user/${item.username}` : `/course/${item._id}`}
                        key={item._id}
                        className="flex items-center p-4 hover:bg-gray-700/80 transition-colors border-b border-gray-700 last:border-b-0 group"
                        onClick={() => {
                          setSearchTerm('');
                          setIsSearchFocused(false);
                        }}
                      >
                        {item.type === 'user' ? (
                          <>
                            <div className="w-10 h-10 rounded-full bg-amber-400/10 flex items-center justify-center mr-4 text-amber-400 group-hover:bg-amber-400/20 transition">
                              <span className="text-lg">👤</span>
                            </div>
                            <div>
                              <p className="text-white font-medium">{item.username}</p>
                              <p className="text-xs text-gray-400">Eğitmen</p>
                            </div>
                          </>
                        ) : (
                          <>
                            <img
                              src={`https://konya-backend.onrender.com${item.imageUrl}`}
                              alt={item.title}
                              className="w-10 h-10 rounded-md mr-4 object-cover group-hover:opacity-90 transition"
                            />
                            <div>
                              <p className="text-white font-medium">{item.title}</p>
                              <p className="text-xs text-gray-400">Kurs</p>
                            </div>
                          </>
                        )}
                        <FaChevronRight className="ml-auto text-gray-400 group-hover:text-amber-400 transition" />
                      </Link>
                    ))
                  ) : (
                    <div className="p-4 text-gray-400 text-center flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-3">
                        <FaSearch className="text-xl" />
                      </div>
                      <p>Sonuç bulunamadı</p>
                      <p className="text-xs mt-1">Farklı bir arama terimi deneyin</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Öne Çıkan Özellikler (Slider) */}
        <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: index === currentFeature ? 1 : 0.6,
                y: 0,
                scale: index === currentFeature ? 1.05 : 1
              }}
              transition={{ duration: 0.5 }}
              className={`bg-gradient-to-br ${feature.bg} p-6 rounded-2xl border ${index === currentFeature ? 'border-amber-400/50' : 'border-gray-700'} cursor-pointer`}
              onClick={() => setCurrentFeature(index)}
            >
              <div className="flex items-center mb-4">
                <div className="w-14 h-14 rounded-xl bg-black/30 backdrop-blur-sm flex items-center justify-center mr-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white">{feature.title}</h3>
              </div>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Öne Çıkan Kurslar */}
      {!searchTerm && <Oner2 />}

      {/* Neden Biz? */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                Neden
              </span>{" "}
              Bizi Tercih Etmelisiniz?
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Sektördeki en iyi öğrenme deneyimini sunuyoruz
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { 
                icon: <FaStar className="text-amber-400 text-4xl" />, 
                title: "Uzman Eğitmenler", 
                desc: "Alanında uzman, sektör deneyimli eğitmenlerden öğrenin",
                bg: "bg-gradient-to-br from-amber-500/10 to-amber-600/20"
              },
              { 
                icon: <FaFire className="text-orange-500 text-4xl" />, 
                title: "Pratik Projeler", 
                desc: "Gerçek dünya projeleriyle pratik beceriler kazanın",
                bg: "bg-gradient-to-br from-orange-500/10 to-red-600/20"
              },
              { 
                icon: <FaRegClock className="text-purple-400 text-4xl" />, 
                title: "Esnek Öğrenme", 
                desc: "Kendi hızınızda, istediğiniz zaman öğrenme imkanı",
                bg: "bg-gradient-to-br from-purple-500/10 to-indigo-600/20"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                variants={item}
                className={`${item.bg} p-8 rounded-2xl border border-gray-700 hover:border-amber-400/40 transition-all hover:-translate-y-2 hover:shadow-xl`}
              >
                <div className="w-20 h-20 mb-6 mx-auto flex items-center justify-center rounded-2xl bg-black/30 backdrop-blur-sm">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white text-center">{item.title}</h3>
                <p className="text-gray-300 text-center">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="py-20 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10.000+", label: "Mutlu Öğrenci" },
              { number: "500+", label: "Uzman Eğitmen" },
              { number: "1.000+", label: "Kurs İçeriği" },
              { number: "98%", label: "Memnuniyet Oranı" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-amber-400/30 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600">
                  {stat.number}
                </div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA (Harekete Geçirici Bölüm) */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-gradient-to-r from-amber-500/10 via-purple-500/10 to-indigo-500/10 relative overflow-hidden">
        {/* Arka plan efektleri */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-amber-400 filter blur-3xl"></div>
          <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-purple-500 filter blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-white mb-6"
          >
            Kariyeriniz İçin İlk Adımı Atın
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Binlerce öğrenciye katılın ve geleceğinizi şekillendirin
          </motion.p>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              to="/courses"
              className="relative overflow-hidden bg-amber-500 hover:bg-amber-400 text-gray-900 font-bold py-4 px-10 rounded-xl transition-all shadow-lg transform hover:-translate-y-1 hover:shadow-xl group"
            >
              <span className="relative z-10 flex items-center justify-center">
                Kursları Keşfet <FaChevronRight className="ml-2" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
            <Link
              to="/register"
              className="relative overflow-hidden bg-transparent border-2 border-amber-400 hover:bg-amber-400/10 font-bold py-4 px-10 rounded-xl transition-all shadow-lg transform hover:-translate-y-1 hover:shadow-xl group"
            >
              <span className="relative z-10">Ücretsiz Kaydol</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent to-amber-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer (Alt Bilgi) */}
      <footer className="bg-gray-900/80 backdrop-blur-md text-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-8 md:mb-0 text-center md:text-left"
            >
             <h2 onClick={()=>navigate("/portfolio")} className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-amber-600 cursor-pointer">
                Nurullah Mencik
              </h2>
              <p className="text-gray-400 mt-2">Öğrenme yolculuğunuzda yanınızdayım</p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="flex gap-6 text-2xl"
            >
              <a 
                href="https://github.com/nurullahmencik" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Github" 
                className="text-gray-400 hover:text-amber-400 transition duration-300 transform hover:-translate-y-1"
              >
                <FaGithub />
              </a>
              <a 
                href="https://www.linkedin.com/in/nurullah-mencik-6b692a216/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn" 
                className="text-gray-400 hover:text-amber-400 transition duration-300 transform hover:-translate-y-1"
              >
                <FaLinkedin />
              </a>
              <a 
                href="mailto:nurullahmencik42@gmail.com" 
                aria-label="Email" 
                className="text-gray-400 hover:text-amber-400 transition duration-300 transform hover:-translate-y-1"
              >
                <FaEnvelope />
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm"
          >
            <p> <span className='cursor-pointer' onClick={fonk}>©</span> {new Date().getFullYear()} Tüm hakları saklıdır. Bilgi paylaştıkça çoğalır</p>
  {visible &&
              <span 
    onClick={() => navigate("/a")}
    className="cursor-pointer hover:text-amber-400 transition-colors"
  >
    ❤️
  </span>
  }
          </motion.div>
        </div>
      </footer>
    </div>
  );
};

export default Home;