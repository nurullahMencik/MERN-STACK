import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const Love = () => {
  const audioRef = useRef(null);
  const [darkMode, setDarkMode] = useState(true);
  const [musicStarted, setMusicStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Music handling
  const handleStartMusic = () => {
    if (!musicStarted && audioRef.current) {
      audioRef.current.play()
        .then(() => setMusicStarted(true))
        .catch(e => console.log("Autoplay blocked:", e));
    }
  };

  const handleUserInteraction = () => {
    handleStartMusic();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const timer = setTimeout(handleStartMusic, 1000);
    window.addEventListener('click', handleUserInteraction);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('click', handleUserInteraction);
      document.body.style.overflow = "auto";
    };
  }, []);

  const toggleMode = (e) => {
    e.stopPropagation();
    setDarkMode(!darkMode);
  };

  // Responsive animation values
  const getRandomAnimation = () => {
    const animations = [
      { y: [0, isMobile ? -150 : -300], x: [0, 50], rotate: [0, 180] },
      { y: [0, isMobile ? -100 : -200], x: [0, -50, 50, 0], rotate: [0, 360] },
      { y: [0, isMobile ? -200 : -400], x: [0, Math.sin(Math.random() * Math.PI) * (isMobile ? 50 : 100)] },
      { y: [0, isMobile ? -150 : -300], scale: [0.5, 1.5, 0.8] }
    ];
    return animations[Math.floor(Math.random() * animations.length)];
  };

  // Element counts based on screen size
  const heartCount = isMobile ? 30 : 50;
  const starCount = isMobile ? 15 : 30;
  const snowCount = isMobile ? 10 : 20;
  const bubbleCount = isMobile ? 8 : 15;
  const birdCount = isMobile ? 3 : 5;

  return (
    <div
      onClick={handleUserInteraction}
      className={`relative min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white"
          : "bg-gradient-to-br from-pink-100 via-rose-50 to-amber-50 text-rose-900"
      } overflow-hidden flex flex-col items-center justify-center text-center p-4 md:p-6 font-serif`}
    >
      {/* Responsive Photos */}
      <motion.div 
        className={`absolute ${isMobile ? 'left-2 top-[20%]' : 'left-4 top-[40%]'} transform -translate-y-1/2 z-10`}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="relative group">
          <img
            src="/sol (1).jpeg"
            alt="Left"
            className={`${isMobile ? 'w-32 h-32' : 'w-48 md:w-64 h-48 md:h-64'} object-cover rounded-2xl border-4 border-pink-300 dark:border-purple-400 shadow-2xl transform group-hover:scale-105 transition-all duration-300`}
          />
          <div className="absolute inset-0 rounded-2xl border-2 border-white/50 pointer-events-none"></div>
          <div className="absolute -inset-3 rounded-2xl border border-white/20 pointer-events-none"></div>
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, 15, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🌸
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        className={`absolute ${isMobile ? 'right-2 top-[20%]' : 'right-4 top-[40%]'} transform -translate-y-1/2 z-10`}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.3 }}
      >
        <div className="relative group">
          <img
            src="/sol (2).jpeg"
            alt="Right"
            className={`${isMobile ? 'w-32 h-32' : 'w-48 md:w-64 h-48 md:h-64'} object-cover rounded-2xl border-4 border-pink-300 dark:border-purple-400 shadow-2xl transform group-hover:scale-105 transition-all duration-300`}
          />
          <div className="absolute inset-0 rounded-2xl border-2 border-white/50 pointer-events-none"></div>
          <div className="absolute -inset-3 rounded-2xl border border-white/20 pointer-events-none"></div>
          <motion.div
            className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-3xl md:text-4xl"
            animate={{ y: [0, -10, 0], rotate: [0, -15, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
          >
            🌹
          </motion.div>
        </div>
      </motion.div>

      {/* Day/Night Toggle */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMode}
        className="absolute top-4 right-4 md:top-5 md:right-5 z-50 bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-black/80 text-xs md:text-sm px-3 py-1 md:px-4 md:py-2 rounded-xl shadow-lg backdrop-blur-sm flex items-center gap-1 md:gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        {darkMode ? "🌞 Gündüz" : "🌙 Gece"}
      </motion.button>

      {/* Animated Elements */}
      
      {/* Floating Hearts */}
      {Array.from({ length: heartCount }).map((_, i) => {
        const heartTypes = ["💖", "💘", "💝", "💗", "💓", "💞", "💕"];
        const heart = heartTypes[Math.floor(Math.random() * heartTypes.length)];
        const size = Math.random() * (isMobile ? 20 : 25) + (isMobile ? 10 : 15);
        const color = darkMode 
          ? `hsl(${Math.random() * 60 + 300}, 80%, 70%)` 
          : `hsl(${Math.random() * 30 + 330}, 100%, 70%)`;
        
        return (
          <motion.div
            key={`heart-${i}`}
            className="absolute pointer-events-none"
            style={{
              fontSize: `${size}px`,
              color: color,
              filter: `drop-shadow(0 0 8px ${color})`
            }}
            initial={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              opacity: 0,
            }}
            animate={{
              ...getRandomAnimation(),
              opacity: [0, 0.8, 0],
              scale: [0.5, Math.random() + 0.8],
            }}
            transition={{
              duration: Math.random() * 10 + 5,
              repeat: Infinity,
              delay: Math.random() * 8,
            }}
          >
            {heart}
          </motion.div>
        );
      })}

      {/* Stars */}
      {Array.from({ length: starCount }).map((_, i) => (
        <motion.div
          key={`star-${i}`}
          className="absolute pointer-events-none"
          style={{
            fontSize: `${Math.random() * (isMobile ? 15 : 20) + (isMobile ? 5 : 10)}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
            rotate: [0, 180],
          }}
          transition={{
            duration: Math.random() * 5 + 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
      ))}

      {/* Snowflakes */}
      {Array.from({ length: snowCount }).map((_, i) => (
        <motion.div
          key={`snow-${i}`}
          className="absolute pointer-events-none text-white"
          style={{
            fontSize: `${Math.random() * (isMobile ? 15 : 20) + (isMobile ? 5 : 10)}px`,
            left: `${Math.random() * 100}%`,
          }}
          initial={{
            top: -50,
            opacity: 0,
          }}
          animate={{
            top: "110%",
            opacity: [0, 0.8, 0],
            x: [0, (Math.random() - 0.5) * (isMobile ? 50 : 100)],
          }}
          transition={{
            duration: Math.random() * 10 + 5,
            repeat: Infinity,
            delay: Math.random() * 10,
          }}
        >
          ❄️
        </motion.div>
      ))}

      {/* Bubbles */}
      {Array.from({ length: bubbleCount }).map((_, i) => (
        <motion.div
          key={`bubble-${i}`}
          className="absolute pointer-events-none text-blue-200/70"
          style={{
            fontSize: `${Math.random() * (isMobile ? 20 : 25) + (isMobile ? 10 : 15)}px`,
            left: `${Math.random() * 100}%`,
            bottom: -50,
          }}
          animate={{
            top: "110%",
            opacity: [0.5, 0.8, 0],
            x: [0, (Math.random() - 0.5) * (isMobile ? 15 : 30)],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            delay: Math.random() * 8,
          }}
        >
          🫧
        </motion.div>
      ))}

      {/* Birds */}
      {Array.from({ length: birdCount }).map((_, i) => (
        <motion.div
          key={`bird-${i}`}
          className="absolute pointer-events-none text-gray-300"
          style={{
            fontSize: isMobile ? "20px" : "28px",
            top: `${i * (isMobile ? 20 : 15) + 10}%`,
          }}
          initial={{ left: -50 }}
          animate={{ left: "110%" }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        >
          🕊️
        </motion.div>
      ))}

      {/* Main Content */}
      <div className={`z-20 ${isMobile ? 'max-w-xs' : 'max-w-xl'} mx-auto px-2 md:px-4`}>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 10, -10, 0],
            filter: [
              "drop-shadow(0 0 10px rgba(255,50,50,0.3))", 
              "drop-shadow(0 0 20px rgba(255,100,100,0.7))", 
              "drop-shadow(0 0 10px rgba(255,50,50,0.3))"
            ]
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
          className={`text-red-500 ${isMobile ? 'text-6xl' : 'text-8xl'} mb-4 md:mb-6 cursor-pointer`}
        >
          ❤️
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
          className={`${isMobile ? 'text-3xl' : 'text-5xl md:text-6xl'} font-bold mb-4 md:mb-6 tracking-tight`}
        >
          <motion.span 
            className="inline-block"
            whileHover={{ scale: 1.1 }}
          >
            Sevgilim
          </motion.span>{" "}
          <motion.span 
            className="inline-block"
            whileHover={{ scale: 1.1 }}
          >
            İçin
          </motion.span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 1.2, type: "spring" }}
          className={`bg-white/80 dark:bg-black/60 backdrop-blur-xl ${isMobile ? 'p-4' : 'p-6 md:p-8'} rounded-3xl shadow-2xl border-2 border-pink-300 dark:border-purple-400 text-gray-800 dark:text-white relative overflow-hidden`}
        >
          <div className="absolute -top-4 -left-4 text-3xl md:text-4xl text-pink-200 dark:text-purple-900/50">💫</div>
          <div className="absolute -bottom-4 -right-4 text-3xl md:text-4xl text-pink-200 dark:text-purple-900/50">💫</div>
          
         
          <motion.p
            className={`${isMobile ? 'text-sm' : 'text-lg'} mb-3 md:mb-4 leading-relaxed`}
            whileHover={{ scale: 1.01 }}
          >
            Bu sayfa sadece sana özel, çünkü sen her şeyin en güzeline layıksın!
          </motion.p>
          <motion.p
            className={`${isMobile ? 'text-xl' : 'text-2xl'} text-pink-500 dark:text-pink-300 font-semibold`}
            animate={{
              scale: [1, 1.05, 1],
              textShadow: ["0 0 5px rgba(255,100,100,0.3)", "0 0 15px rgba(255,100,100,0.7)", "0 0 5px rgba(255,100,100,0.3)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            Bide Seni çok ama çok seviyorum 💘
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="mt-6 md:mt-8 italic text-xs md:text-sm text-gray-700 dark:text-gray-300"
        >
          <motion.p
            whileHover={{ scale: 1.05 }}
          >
            Hazırlayan: Kalbini sana adamış birisi 💌
          </motion.p>
        </motion.div>
      </div>

      {/* Decorative Animations */}
       (
        <>
          <motion.div
            className="absolute top-20 right-10 text-5xl md:text-6xl z-0"
            animate={{
              y: [0, -15, 0],
              x: [0, 10, -10, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐳
          </motion.div>

          <motion.div
            className="absolute bottom-8 left-10 text-4xl md:text-5xl z-0"
            animate={{
              y: [0, -8, 0],
              rotate: [45, 55, 45],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🐋
          </motion.div>
        </>
     

      {/* Music */}
      <audio ref={audioRef} loop autoPlay>
        <source src="/a.mp3" type="audio/mpeg" />
      </audio>

      {/* Music Instruction */}
      {!musicStarted && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`fixed bottom-4 md:bottom-10 left-1/2 transform -translate-x-1/2 bg-black/70 text-white ${isMobile ? 'px-4 py-2 text-xs' : 'px-6 py-3 text-sm'} rounded-full backdrop-blur-sm flex items-center gap-2 z-50 cursor-pointer`}
        >
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🔊
          </motion.div>
          Müzik için tıklayın
        </motion.div>
      )}
    </div>
  );
};

export default Love;