import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <section
      id="contact"
      className="py-16 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-gray-700 dark:via-gray-800 dark:to-gray-900 transition-colors duration-500"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h4 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-12 flex items-center justify-center">
          <span className="mr-3">📩</span> İletişim
        </h4>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          <a
            href="https://www.linkedin.com/in/nurullah-mencik-6b692a216/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center"
          >
            <FaLinkedin className="w-5 h-5 mr-2" />
            LinkedIn
          </a>

          <a
            href="https://github.com/nurullahMencik"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center"
          >
            <FaGithub className="w-5 h-5 mr-2" />
            GitHub
          </a>

          <a
            href="mailto:nurullahmencik42@gmail.com"
            className="w-full sm:w-auto px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg shadow-md transition duration-300 flex items-center justify-center"
          >
            <FaEnvelope className="w-5 h-5 mr-2" />
            E-posta Gönder
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
