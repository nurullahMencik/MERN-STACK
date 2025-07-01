import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.github.com/users/nurullahMencik/repos")
      .then((res) => res.json())
      .then((data) => {
        // Filter out forked repositories and sort by most recent push
        const filteredProjects = data
          .filter(project => !project.fork)
          .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at));
        setProjects(filteredProjects);
        setIsLoading(false);
      })
      .catch(() => setIsLoading(false));
  }, []);

  // Yeni sofistike renk paleti (ışıltısız)
  const colors = [
    'from-blue-600/20 via-purple-700/20 to-pink-800/20', // Derin Mavi-Mor-Pembe
    'from-green-600/20 via-teal-700/20 to-cyan-800/20',  // Orman Yeşili-Turkuaz
    'from-red-600/20 via-orange-700/20 to-amber-800/20', // Kırmızı-Turuncu-Amber
    'from-indigo-600/20 via-violet-700/20 to-fuchsia-800/20',// Indigo-Menekşe-Fuşya
    'from-lime-600/20 via-yellow-700/20 to-orange-800/20', // Açık Yeşil-Sarı-Turuncu
    'from-sky-600/20 via-blue-700/20 to-indigo-800/20'   // Gökyüzü Mavisi-Koyu Mavi-Indigo
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
    hidden: { opacity: 0, y: 50, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-800 relative overflow-hidden"> {/* Arka plan rengi bg-gray-800 olarak değişti */}
      {/* Arka plan kod resmi efekti */}
      <div className="absolute inset-0 z-0 opacity-5">
        <pre className="text-green-400 font-mono text-xs leading-none whitespace-pre-wrap animate-code-scroll">
          {`
            function generateRandomCode() {
              const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{};:,.<>/?';
              let code = '';
              for (let i = 0; i < 5000; i++) {
                code += chars[Math.floor(Math.random() * chars.length)];
                if (Math.random() < 0.01) code += '\\n';
              }
              return code;
            }
            console.log(generateRandomCode());
            import React, { useState, useEffect } from 'react';
            import { motion } from 'framer-motion';

            const AnimatedSection = ({ children }) => {
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {children}
                </motion.div>
              );
            };

            const fetchData = async (url) => {
              const response = await fetch(url);
              if (!response.ok) throw new Error('Network response was not ok');
              return response.json();
            };

            // ... your project logic here ...
            if (project.status === 'completed') {
                renderCompletionBadge();
            } else {
                renderInProgressBadge();
            }
            const projectData = await fetchData('https://api.github.com/users/your-username/repos');
            projectData.forEach(repo => {
                console.log(\`Repo Name: \${repo.name}, Language: \${repo.language || 'N/A'}\`);
            });
            // End of script
          `}
        </pre>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-16"
        >

          <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-6 relative">
            <span className="relative inline-block">
              <span className="relative z-10">Projelerim</span>
              <span className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-blue-700/50 to-purple-700/50 transform skew-x-12 z-0 opacity-75"></span>
            </span>
          </h2>

        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-96 rounded-3xl bg-gray-800/50 animate-pulse border border-gray-700 backdrop-blur-md shadow-xl"></div>
            ))}
          </div>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={item}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0,0,0,0.3), 0 10px 10px -5px rgba(0,0,0,0.15)" }}
                transition={{ type: "spring", stiffness: 300, damping: 10 }}
                className={`group relative rounded-3xl overflow-hidden border border-gray-700 backdrop-blur-md hover:border-cyan-500 transition-all duration-500 shadow-lg bg-gradient-to-br ${colors[index % colors.length]}`}
              >
                <div className="relative p-8 h-full flex flex-col justify-between z-20">
                  <div className="flex items-start mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${colors[index % colors.length].replace('/20', '/40')} mr-4 shadow-xl`}>
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-cyan-400 transition-colors duration-300">
                        {project.name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </h3>
                      <span className="text-md font-medium text-gray-400">
                        {project.language || 'Çoklu Dil'}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-300 mb-8 flex-grow leading-relaxed">
                    {project.description || "Bu proje için açıklama henüz eklenmemiş. Ancak bu bir geliştirme harikasıdır!"}
                  </p>

                  <div className="mt-auto">
                    <div className="flex flex-wrap gap-3 mb-6">
                      {project.topics?.slice(0, 3).map(topic => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 text-xs font-semibold rounded-full bg-gray-800 text-gray-200 border border-gray-600 shadow-md transform hover:scale-105 transition-transform duration-200"
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
                        className={`inline-flex items-center px-5 py-2.5 text-sm font-bold rounded-lg bg-gray-800 text-white border border-gray-600 hover:bg-gray-700 transition-all duration-300 shadow-lg group-hover:shadow-xl group-hover:border-cyan-500`}
                      >
                        Detayları Gör
                        <svg className="w-5 h-5 ml-2 -mr-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: "easeOut" }}
          className="text-center mt-20"
        >
          <a
            href="https://github.com/nurullahMencik?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center px-8 py-4 border border-transparent text-lg font-extrabold rounded-full shadow-lg text-white bg-gradient-to-r from-cyan-500 to-blue-700 hover:from-cyan-600 hover:to-blue-800 transition-all duration-400 transform hover:scale-105`}
          >
            Tüm Projeleri Keşfet
            <svg className="w-6 h-6 ml-3 -mr-1 group-hover:translate-x-1 transition-transform duration-300" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.115 22 16.379 22 11.984 22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;