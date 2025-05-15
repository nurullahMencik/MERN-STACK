import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CourseCard from "../components/CourseCard.jsx";
import { getCourses } from "../redux/reducers/courseSlice.js";
import { FiSearch, FiX, FiFilter } from "react-icons/fi";

const CoursesPage = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 4;

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  const categories = [...new Set(courses.map(course => course.category))];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? course.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);
  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(indexOfFirstCourse, indexOfLastCourse);

  const handleCategorySelect = (category) => {
    setSelectedCategory(selectedCategory === category ? null : category);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory(null);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#1a202c] text-white py-10 px-4 sm:px-6 overflow-x-hidden">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-amber-400 mb-10">
        Tüm Kurslar
        <span className="block w-16 h-1 bg-emerald-400 mx-auto mt-3 rounded"></span>
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6">
        {/* Sol Panel (Kategori) */}
        <div className="hidden md:block w-64 flex-shrink-0">
          <div className="bg-gray-800 p-4 rounded-lg sticky top-4">
            <h2 className="text-lg font-semibold text-amber-400 mb-4 flex items-center">
              <FiFilter className="mr-2" /> Kategoriler
            </h2>
            <div className="space-y-2 max-h-[calc(100vh-200px)] overflow-y-auto">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategorySelect(category)}
                  className={`block w-full text-left px-3 py-2 rounded-md transition ${
                    selectedCategory === category
                      ? "bg-amber-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {(selectedCategory || searchTerm) && (
              <button
                onClick={clearFilters}
                className="mt-4 w-full text-sm text-gray-400 hover:text-white flex items-center justify-center"
              >
                <FiX className="mr-1" /> Filtreleri Temizle
              </button>
            )}
          </div>
        </div>

        {/* Sağ Panel (Kurslar) */}
        <div className="flex-1">
          <button
            onClick={() => setIsMobileFilterOpen(true)}
            className="md:hidden flex items-center bg-gray-800 text-white px-4 py-2 rounded-lg mb-4"
          >
            <FiFilter className="mr-2" /> Kategorileri Göster
          </button>

          <div className="relative mb-6">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-gray-400 h-5 w-5" />
            </div>
            <input
              type="text"
              placeholder="Kurs ara..."
              className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {(searchTerm || selectedCategory) && (
              <button
                onClick={clearFilters}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <FiX />
              </button>
            )}
          </div>

          {(selectedCategory || searchTerm) && (
            <div className="mb-6 p-3 bg-gray-800 rounded-lg flex items-center justify-between text-sm">
              <div>
                {selectedCategory && (
                  <span className="text-amber-400">Kategori: {selectedCategory}</span>
                )}
                {searchTerm && (
                  <span className={selectedCategory ? "ml-4" : ""}>
                    Arama: "{searchTerm}"
                  </span>
                )}
              </div>
              <button
                onClick={clearFilters}
                className="text-gray-400 hover:text-white"
              >
                Temizle
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center text-emerald-300 font-semibold text-xl">
              Yükleniyor...
            </div>
          )}

          {!loading && currentCourses.length === 0 && (
            <div className="text-center text-red-400 font-semibold text-xl">
              {searchTerm || selectedCategory
                ? `Filtrelere uygun kurs bulunamadı`
                : "Kurs bulunamadı."}
            </div>
          )}

          {!loading && currentCourses.length > 0 && (
            <>
              <div className="text-right text-sm text-gray-400 mb-4">
                Toplam {filteredCourses.length} kurs bulundu
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {currentCourses.map((course, index) => (
                  <CourseCard key={index} course={course} />
                ))}
              </div>

              {/* Sayfalama */}
              <div className="flex justify-center items-center space-x-2 text-sm">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md ${
                      currentPage === i + 1
                        ? "bg-amber-500 text-white"
                        : "bg-gray-700 hover:bg-gray-600 text-gray-300"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobil Filtre Paneli */}
      {isMobileFilterOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black bg-opacity-70 flex">
          <div className="bg-gray-800 w-4/5 h-full p-4 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-amber-400">Kategoriler</h2>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <FiX size={24} />
              </button>
            </div>
            <div className="space-y-2">
              {categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    handleCategorySelect(category);
                    setIsMobileFilterOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md transition ${
                    selectedCategory === category
                      ? "bg-amber-500 text-white"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <button
              onClick={() => {
                clearFilters();
                setIsMobileFilterOpen(false);
              }}
              className="mt-4 w-full py-2 text-gray-400 hover:text-white"
            >
              Filtreleri Temizle
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
