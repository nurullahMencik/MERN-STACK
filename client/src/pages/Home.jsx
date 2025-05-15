import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getCourses } from '../redux/reducers/courseSlice';
import CourseCard from '../components/CourseCard';
import { FaChevronLeft, FaChevronRight, FaSearch } from 'react-icons/fa';

const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    let filtered = [...courses];
    
    // Kategori filtreleme
    if (selectedCategory) {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }
    
    // Arama filtreleme
    if (searchTerm.trim() !== '') {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredCourses(filtered);
  }, [searchTerm, courses, selectedCategory]);

  const categories = [...new Set(courses.map((course) => course.category))];
  const [scrollPos, setScrollPos] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById('courseSlider');
    const scrollAmount = 200;
    if (direction === 'left') {
      setScrollPos(scrollPos - scrollAmount);
      container.scrollLeft -= scrollAmount;
    } else if (direction === 'right') {
      setScrollPos(scrollPos + scrollAmount);
      container.scrollLeft += scrollAmount;
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setSearchTerm(''); // Arama terimini temizle
  };

  const clearFilters = () => {
    setSelectedCategory(null);
    setSearchTerm('');
  };

  return (
    <div className="bg-[#1a202c] text-white">
      {/* HERO */}
      <section className="bg-[#2d3748] py-20 px-8 md:px-24 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">İstediğin Her Yerden Öğren</h1>
        <p className="text-lg text-gray-300 mb-6">Hayalindeki kariyere ulaşmak için yeni beceriler kazan.</p>
        <div className="relative w-full md:w-1/2 mx-auto">
          <input
            type="text"
            placeholder="Ne öğrenmek istiyorsun?"
            className="w-full p-3 pl-10 rounded-xl border border-gray-600 focus:outline-none focus:ring-2 focus:ring-amber-400 bg-[#4a5568] text-white"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setSelectedCategory(null); // Arama yapıldığında kategori seçimini kaldır
            }}
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
      </section>

      {/* Filtre Bilgisi */}
      {(selectedCategory || searchTerm) && (
        <div className="px-8 md:px-24 py-4 bg-[#2d3748] flex items-center justify-between">
          <div>
            {selectedCategory && (
              <span className="text-amber-400">
                Kategori: {selectedCategory}
              </span>
            )}
            {searchTerm && (
              <span className={selectedCategory ? 'ml-4' : ''}>
                Arama: "{searchTerm}"
              </span>
            )}
          </div>
          <button 
            onClick={clearFilters}
            className="text-gray-400 hover:text-white"
          >
            Filtreleri Temizle
          </button>
        </div>
      )}

      {/* KATEGORİLER */}
      <section className="py-12 bg-[#2d3748] px-8 md:px-24">
        <h2 className="text-2xl font-bold text-amber-400 mb-6">
          {selectedCategory ? `${selectedCategory} Kategorisi` : 'Popüler Kategoriler'}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {categories.slice(0, 8).map((cat, i) => (
            <div 
              key={i} 
              className={`p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer ${
                selectedCategory === cat ? 'bg-amber-500 text-white' : 'bg-[#4a5568]'
              }`}
              onClick={() => handleCategoryClick(cat)}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      {/* KURS LİSTESİ */}
      <section className="py-16 bg-gradient-to-b from-[#2d3748] to-[#1a202c] px-8 md:px-24">
        <h2 className="text-2xl font-bold text-amber-400 mb-6">
          {selectedCategory ? `${selectedCategory} Kursları` : 
           searchTerm ? `Arama Sonuçları` : 'Öne Çıkan Kurslar'}
        </h2>

        {loading && <div className="text-center text-gray-600">Kurslar yükleniyor...</div>}
        {!loading && filteredCourses.length === 0 && (
          <div className="text-center text-gray-600">
            {selectedCategory ? 
              `"${selectedCategory}" kategorisinde kurs bulunamadı` : 
              searchTerm ?
              `"${searchTerm}" ile eşleşen kurs bulunamadı` : 
              'Henüz kurs eklenmedi.'}
          </div>
        )}

        {/* Öne Çıkan Kurslar (Slider) - Sadece filtre yokken göster */}
        {!selectedCategory && !searchTerm && !loading && filteredCourses.length > 0 && (
          <div className="relative flex items-center">
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-0 z-10 text-amber-400 bg-[#2d3748] p-2 rounded-full shadow-lg hover:bg-[#4a5568] transition"
            >
              <FaChevronLeft />
            </button>

            <div
              id="courseSlider"
              className="flex gap-6 overflow-x-auto pb-4 scroll-smooth"
              style={{ scrollBehavior: 'smooth' }}
            >
              {filteredCourses.slice(0, 7).map((course, index) => (
                <div key={index} className="w-72">
                  <CourseCard course={course} />
                </div>
              ))}
            </div>

            <button
              onClick={() => handleScroll('right')}
              className="absolute right-0 z-10 text-amber-400 bg-[#2d3748] p-2 rounded-full shadow-lg hover:bg-[#4a5568] transition"
            >
              <FaChevronRight />
            </button>
          </div>
        )}

        {/* Filtrelenmiş Kurslar (Grid) - Filtre varsa göster */}
        {(selectedCategory || searchTerm) && !loading && filteredCourses.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredCourses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </div>
        )}
      </section>

      {/* Diğer bölümler... */}
      {!selectedCategory && !searchTerm && (
        <>
          <section className="py-16 bg-[#2d3748] px-8 md:px-24">
            <h2 className="text-2xl font-bold text-amber-400 text-center mb-8">Neden Biz?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
              {/* Neden biz içeriği... */}
            </div>
          </section>

          <section className="py-12 bg-[#2d3748] text-center">
            <h2 className="text-2xl font-bold text-amber-400 mb-4">Tüm Kurslara Göz At</h2>
            <Link
              to="/courses"
              className="inline-block bg-amber-400 text-white px-6 py-3 rounded-xl font-semibold text-lg hover:bg-amber-500 transition"
            >
              Kursları Keşfet
            </Link>
          </section>
        </>
      )}
    </div>
  );
};

export default Home;