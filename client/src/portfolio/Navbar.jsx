import { useState } from "react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-gray-900/90 backdrop-blur-md border-b border-gray-700 shadow-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          onClick={scrollToTop}
          className="cursor-pointer flex items-center space-x-3 group"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-lg flex items-center justify-center group-hover:rotate-12 transition-all duration-500 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400 group-hover:bg-gradient-to-r group-hover:from-amber-200 group-hover:to-orange-300 transition-all duration-500 tracking-tight">
            Nurullah Mencik
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 items-center">
          <a
            href="/"
            className="text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-800/50 group"
          >
            <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:absolute after:w-full after:h-0.5 after:bg-amber-400 after:left-0 after:-bottom-1 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300">
              Ademy
            </span>
          </a>
          <a
            href="#contact"
            className="text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium px-3 py-2 rounded-lg hover:bg-gray-800/50 group"
          >
            <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:absolute after:w-full after:h-0.5 after:bg-amber-400 after:left-0 after:-bottom-1 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300">
              İletişim
            </span>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-amber-400 focus:outline-none p-2 rounded-lg hover:bg-gray-800 transition-all duration-300"
          >
            {isMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-500 overflow-hidden ${
          isMenuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
        } bg-gray-800/95 backdrop-blur-sm border-t border-gray-700 px-6 py-3 space-y-3`}
      >
        <a
          href="/"
          onClick={scrollToTop}
          className="block text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-700/50 group"
        >
          <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:absolute after:w-full after:h-0.5 after:bg-amber-400 after:left-0 after:-bottom-1 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300">
            Ademy
          </span>
        </a>
        <a
          href="#contact"
          onClick={() => setIsMenuOpen(false)}
          className="block text-gray-300 hover:text-amber-300 transition-all duration-300 font-medium px-3 py-2.5 rounded-lg hover:bg-gray-700/50 group"
        >
          <span className="relative group-hover:after:scale-x-100 group-hover:after:opacity-100 after:absolute after:w-full after:h-0.5 after:bg-amber-400 after:left-0 after:-bottom-1 after:origin-left after:scale-x-0 after:opacity-0 after:transition-all after:duration-300">
            İletişim
          </span>
        </a>
      </div>
    </nav>
  );
};

export default Navbar;