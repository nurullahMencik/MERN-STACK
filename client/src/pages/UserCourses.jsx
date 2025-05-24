import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../components/CourseCard';
import { 
  FaUserCircle, 
  FaCalendarAlt, 
  FaEnvelope,
  FaBook,
  FaArrowLeft
} from 'react-icons/fa';
import { 
  ImSpinner9,
  ImBooks
} from 'react-icons/im';
import { 
  FaSadTear,
  FaRegStar,
  FaStar,
  FaFire
} from 'react-icons/fa';
import { motion } from 'framer-motion';

const UserCourses = () => {
  const { username } = useParams();
  const [courses, setCourses] = useState([]);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    rating: 4.5
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`https://konya-backend.onrender.com/api/auth/user/${username}`);
        setCourses(res.data.courses);
        
        // Simüle edilmiş kullanıcı bilgileri
        setUserInfo({
          username: username,
          email: `${username}@example.com`,
          joinDate: new Date().toLocaleDateString(),
          bio: "Eğitmen ve içerik üreticisi",
          avatar: `https://ui-avatars.com/api/?name=${username}&background=random`
        });
        
        // Simüle edilmiş istatistikler
        setStats({
          totalCourses: res.data.courses.length,
          totalStudents: Math.floor(Math.random() * 1000) + 100,
          rating: (Math.random() * 1 + 4).toFixed(1)
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [username]);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-400" />);
      }
    }
    
    return stars;
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
    >
      {/* Header */}
      <header className="bg-gray-800/50 backdrop-blur-sm py-4 px-6 shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link 
            to="/" 
            className="flex items-center text-indigo-300 hover:text-indigo-100 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Ana Sayfaya Dön
          </Link>
          <div className="flex items-center space-x-4">
            <span className="hidden md:block text-sm text-gray-400">
              Eğitmen Profili
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
        {/* Profil Başlık */}
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-12 p-6 bg-gray-800/30 rounded-xl border border-gray-700/50 shadow-lg"
        >
          <div className="relative">
            <img 
              src={userInfo?.avatar || `https://ui-avatars.com/api/?name=${username}&background=random`} 
              alt={username}
              className="w-24 h-24 sm:w-32 sm:h-32 rounded-full object-cover border-4 border-indigo-500/30 shadow-lg"
            />
            <div className="absolute -bottom-2 -right-2 bg-indigo-600 rounded-full p-2 shadow-md">
              <FaBook className="text-white text-sm" />
            </div>
          </div>
          
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-white">
                  {userInfo?.username}
                  <span className="ml-2 text-xs bg-indigo-600 text-white px-2 py-1 rounded-full">
                  Eğitmen
                </span>
                </h1>
                <p className="text-gray-300 mt-1">{userInfo?.bio}</p>
              </div>
              
              <div className="flex items-center space-x-2">
                {renderStars(stats.rating)}
                <span className="text-yellow-400 font-medium ml-1">
                  {stats.rating}
                </span>
              </div>
            </div>
            
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <FaBook className="text-indigo-400" />
                  <span className="text-gray-300 text-sm">Kurslar</span>
                </div>
                <p className="text-xl font-bold mt-1">{stats.totalCourses}</p>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <FaFire className="text-orange-400" />
                  <span className="text-gray-300 text-sm">Öğrenciler</span>
                </div>
                <p className="text-xl font-bold mt-1">{stats.totalStudents}+</p>
              </div>
              
              <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700/50">
                <div className="flex items-center space-x-2">
                  <FaCalendarAlt className="text-blue-400" />
                  <span className="text-gray-300 text-sm">Katılım</span>
                </div>
                <p className="text-sm mt-1">{userInfo?.joinDate}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Kurslar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <ImBooks className="text-indigo-400 mr-2" />
              <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                Oluşturulan Kurslar
              </span>
            </h2>
            
            <div className="text-sm text-gray-400">
              Toplam {courses.length} kurs
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-64">
              <ImSpinner9 className="animate-spin text-4xl text-indigo-400 mb-4" />
              <span className="text-lg text-gray-300">Kurslar yükleniyor...</span>
            </div>
          ) : courses.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center justify-center py-16 bg-gray-800/30 rounded-xl border border-dashed border-gray-700/50"
            >
              <FaSadTear className="text-5xl text-indigo-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-300 mb-2">Henüz kurs bulunmamaktadır</h3>
              <p className="text-gray-500 max-w-md text-center">
                {userInfo?.username} henüz herhangi bir kurs oluşturmamış. Takip etmeye devam edin!
              </p>
            </motion.div>
          ) : (
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {courses.map((course, index) => (
                <motion.div
                  key={course._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CourseCard 
                    course={course} 
                    showInstructor={false}
                  />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800/50 mt-16 py-8 px-6 border-t border-gray-700/50">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400 text-sm">
            © 2024 {userInfo?.username || 'Eğitmen'} Profili. Tüm hakları saklıdır.
          </p>
        </div>
      </footer>
    </motion.div>
  );
};

export default UserCourses;