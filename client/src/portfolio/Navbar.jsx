import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-purple-100 to-indigo-300 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={scrollToTop}
          className="cursor-pointer text-3xl font-bold font-serif text-indigo-800 hover:text-indigo-900 transition-transform duration-300 hover:scale-105 tracking-tight"
        >
          Nurullah Mencik
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-10 items-center">
          <a
            href="/"
            className="text-lg font-medium font-serif text-gray-800 hover:text-indigo-600 hover:underline transition duration-200"
          >
            Ademy
          </a>
          <a
            href="#contact"
            className="text-lg font-medium font-serif text-gray-800 hover:text-indigo-600 hover:underline transition duration-200"
          >
            İletişim
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 hover:text-indigo-700 focus:outline-none"
          >
            {isMenuOpen ? (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
        } bg-gradient-to-b from-indigo-100 to-purple-100 px-6 pb-4 pt-2 space-y-2 shadow-md`}
      >
        <a
          href="/"
          onClick={scrollToTop}
          className="block text-base font-medium font-serif text-gray-800 hover:text-indigo-600 hover:underline transition"
        >
          Ademy
        </a>
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="block text-base font-medium font-serif text-gray-800 hover:text-indigo-600 hover:underline transition"
        >
          İletişim
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
