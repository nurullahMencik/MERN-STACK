import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/nurullahMencik/repos")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Yeni gradient renk paleti
  const colors = [
    'from-blue-500/10 via-cyan-500/10 to-teal-500/10', // Mavi tonları
    'from-green-500/10 via-emerald-500/10 to-lime-500/10', // Yeşil tonları
    'from-amber-500/10 via-orange-500/10 to-red-500/10', // Sıcak tonlar
    'from-purple-500/10 via-violet-500/10 to-fuchsia-500/10', // Mor tonları
    'from-rose-500/10 via-pink-500/10 to-fuchsia-500/10', // Pembe tonları
    'from-indigo-500/10 via-blue-500/10 to-cyan-500/10' // Koyu mavi tonları
  ];

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

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"> {/* Arka plan rengi değişti */}
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="inline-block mb-4 text-sm font-semibold text-cyan-400 tracking-wider uppercase"> {/* Başlık rengi değişti */}
            Çalışmalarım
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6"> {/* Başlık rengi değişti */}
            <span className="relative inline-block">
              <span className="relative z-10">Projelerim</span>
              <span className="absolute bottom-0 left-0 w-full h-3 bg-cyan-900/30 z-0"></span> {/* Alt çizgi rengi değişti */}
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto"> {/* Metin rengi değişti */}
            Açık kaynak katkılarım ve yeteneklerimi sergileyen kişisel projelerim
          </p>
        </motion.div>
        
       {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-80 rounded-2xl bg-gray-800 animate-pulse backdrop-blur-sm"></div>
          ))}
        </div>
        ) : (
          <motion.div 
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project, index) => (
              <motion.div 
                key={project.id}
                variants={item}
                whileHover={{ y: -5 }}
                className={`group relative rounded-2xl overflow-hidden border border-gray-700 backdrop-blur-sm hover:shadow-lg transition-all duration-300 shadow-sm bg-gradient-to-br ${colors[index % colors.length]}`}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                
                <div className="relative p-6 h-full flex flex-col z-20">
                  <div className="flex items-start mb-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-br ${colors[index % colors.length].replace('/10', '/20')} mr-4 shadow-md`}>
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"> {/* İkon rengi değişti */}
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors"> {/* Başlık rengi değişti */}
                        {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <span className="text-sm text-gray-400">
                        {project.language || 'Çoklu Dil'}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-gray-300 mb-6 flex-grow"> {/* Metin rengi değişti */}
                    {project.description || "Bu proje için açıklama mevcut değil"}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.topics?.slice(0, 3).map(topic => (
                        <span 
                          key={topic} 
                          className="px-2 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-200 shadow-sm" 
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">    
                      <a
                        href={project.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 transition-colors duration-300 shadow-sm group-hover:shadow-md group-hover:border-cyan-400" 
                      >
                        Detayları Gör
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/nurullahMencik?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300 hover:shadow-lg" 
          >
            Tüm Projeleri Gör
            <svg className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.115 22 16.379 22 11.984 22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;