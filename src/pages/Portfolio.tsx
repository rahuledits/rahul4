import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Eye, Calendar, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navigation from "@/components/navigation/Navigation";
import SiteBackground from "@/components/ui/site-background";
import { AnimatedButton } from '@/components/ui/animated-button';
import { toast } from '@/hooks/use-toast';
import { SparklesCore } from '@/components/ui/sparkles';

function launchConfetti(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const confettiCount = 120;
  const confetti = Array.from({ length: confettiCount }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * confettiCount,
    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    tilt: Math.random() * 10 - 10,
    tiltAngleIncremental: Math.random() * 0.07 + 0.05,
    tiltAngle: 0
  }));
  let angle = 0;
  let tiltAngle = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    angle += 0.01;
    tiltAngle += 0.1;
    for (let i = 0; i < confettiCount; i++) {
      let c = confetti[i];
      c.tiltAngle += c.tiltAngleIncremental;
      c.y += (Math.cos(angle + c.d) + 3 + c.r / 2) / 2;
      c.x += Math.sin(angle);
      c.tilt = Math.sin(c.tiltAngle - i / 3) * 15;
      ctx.beginPath();
      ctx.lineWidth = c.r;
      ctx.strokeStyle = c.color;
      ctx.moveTo(c.x + c.tilt + c.r / 3, c.y);
      ctx.lineTo(c.x + c.tilt, c.y + c.tilt + c.r / 5);
      ctx.stroke();
    }
    requestAnimationFrame(draw);
  }
  draw();
  setTimeout(() => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }, 2000);
}

const Portfolio = ({ isDark, onThemeToggle }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  const categories = ['All', 'Music Videos', 'Commercials', 'Weddings', 'Short Films'];
  
  const projects = [
    {
      id: 1,
      title: "Ethereal Love Story",
      category: "Weddings",
      thumbnail: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=450&fit=crop",
      duration: "3:45",
      date: "Dec 2024",
      description: "A cinematic wedding film capturing the magical moments of Sarah & John's special day.",
      tags: ["Cinematic", "Emotional", "4K"],
      views: "12.5K",
      video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 2,
      title: "Urban Rhythms",
      category: "Music Videos",
      thumbnail: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=450&fit=crop",
      duration: "4:12",
      date: "Nov 2024",
      description: "High-energy music video with dynamic cuts and vibrant color grading.",
      tags: ["Fast-paced", "Colorful", "Urban"],
      views: "25.8K",
      video: "/2.mp4"
    },
    {
      id: 3,
      title: "Brand Vision",
      category: "Commercials",
      thumbnail: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop",
      duration: "1:30",
      date: "Oct 2024",
      description: "Corporate commercial showcasing innovative technology solutions.",
      tags: ["Professional", "Clean", "Modern"],
      views: "8.3K",
      video: "https://www.w3schools.com/html/movie.mp4"
    },
    {
      id: 4,
      title: "Midnight Dreams",
      category: "Short Films",
      thumbnail: "https://images.unsplash.com/photo-1489599735036-ad5877043088?w=800&h=450&fit=crop",
      duration: "8:22",
      date: "Sep 2024",
      description: "A psychological thriller exploring the boundaries between dreams and reality.",
      tags: ["Thriller", "Atmospheric", "Suspense"],
      views: "18.7K",
      video: "https://www.w3schools.com/html/mov_bbb.mp4"
    },
    {
      id: 5,
      title: "Golden Hour",
      category: "Music Videos",
      thumbnail: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop",
      duration: "3:28",
      date: "Aug 2024",
      description: "Romantic indie music video shot during golden hour with natural lighting.",
      tags: ["Natural", "Romantic", "Indie"],
      views: "31.2K",
      video: "/2.mp4"
    },
    {
      id: 6,
      title: "Tech Innovation",
      category: "Commercials",
      thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=450&fit=crop",
      duration: "2:15",
      date: "Jul 2024",
      description: "Product launch video featuring cutting-edge technology and sleek design.",
      tags: ["Tech", "Sleek", "Futuristic"],
      views: "15.4K",
      video: "https://www.w3schools.com/html/movie.mp4"
    }
  ];

  const filteredProjects = selectedCategory === 'All' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);

  const [showVideo, setShowVideo] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [currentVideoUrl, setCurrentVideoUrl] = useState("");
  const [playingProjectId, setPlayingProjectId] = useState(null);
  const confettiRef = useRef(null);

  // Location-based pricing
  const [isIndia, setIsIndia] = useState(false);
  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data && data.country_code === 'IN') setIsIndia(true);
      })
      .catch(() => {});
  }, []);

  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden">
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDark} 
          sparkleDensity={45}
          sparkleColor="#8b5cf6"
          sparkleSpeed={0.7}
        />

        <div className="relative z-40 container mx-auto px-6 py-20">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-500 bg-clip-text text-transparent">
              My Portfolio
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              A curated collection of my best video editing and cinematography work, 
              showcasing diverse styles and creative approaches across various genres.
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={`${
                  selectedCategory === category 
                    ? "bg-gradient-to-r from-orange-500 to-pink-500 border-0" 
                    : "border-white/20 bg-white/5 hover:bg-white/10"
                } transition-all duration-300`}
              >
                {category}
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            layout
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`group bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 hover:border-white/30 ${playingProjectId === project.id ? 'md:col-span-2 lg:col-span-3 z-20 scale-[1.03] shadow-2xl' : ''}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0, scale: playingProjectId === project.id ? 1.03 : 1, boxShadow: playingProjectId === project.id ? '0 8px 40px 0 #f59e42cc' : '0 2px 8px 0 #0002' }}
                transition={{ layout: { duration: 0.7, type: 'spring' }, scale: { duration: 0.5 }, boxShadow: { duration: 0.5 }, opacity: { duration: 0.6, delay: index * 0.1 }, y: { duration: 0.6, delay: index * 0.1 } }}
                whileHover={{ y: -10 }}
                layout
              >
                {/* Thumbnail or Video */}
                <div className="relative overflow-hidden">
                  {playingProjectId === project.id ? (
                    <motion.div 
                      className="w-full aspect-video flex items-center justify-center relative group"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                      layout
                    >
                      {/* Static subtle border shadow */}
                      <div className="absolute inset-0 z-10 rounded-xl pointer-events-none" style={{boxShadow:'0 0 32px 4px #f59e4280, 0 0 12px 2px #f472b680'}}></div>
                      {/* Simple semi-transparent background */}
                      <div className="absolute inset-0 z-0 rounded-xl bg-white/5" />
                      {/* Close button with lighter animation */}
                      <button
                        onClick={() => setPlayingProjectId(null)}
                        className="absolute top-2 right-2 z-30 bg-black/60 hover:bg-orange-500 text-white rounded-full p-2 shadow-md transition-all duration-150 focus:outline-none scale-100 hover:scale-110"
                        aria-label="Close video"
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
                        </svg>
                      </button>
                      {/* Video player */}
                      <video
                        src={project.video}
                        autoPlay
                        controls
                        className="w-full h-full object-contain bg-black rounded-xl border-4 border-orange-500 shadow-lg transition-all duration-300 mx-auto min-h-[300px] md:min-h-[400px] lg:min-h-[500px] z-20"
                        onEnded={() => setPlayingProjectId(null)}
                      />
                      {/* Project title overlay */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30 px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500/90 to-pink-500/90 text-white font-semibold text-base shadow-md animate-fade-in-up">
                        {project.title}
                      </div>
                    </motion.div>
                  ) : (
                    <>
                      <img 
                        src={project.thumbnail} 
                        alt={project.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                        <Button 
                          size="lg"
                          className="bg-white/20 backdrop-blur-sm border-white/30 hover:bg-white/30 opacity-0 group-hover:opacity-100 transition-all duration-300"
                          onClick={() => setPlayingProjectId(project.id)}
                        >
                          <Play className="w-5 h-5 mr-2" />
                          Watch
                        </Button>
                      </div>
                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
                        {project.duration}
                      </div>
                    </>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                      {project.category}
                    </Badge>
                    <div className="flex items-center text-gray-400 text-sm">
                      <Eye className="w-4 h-4 mr-1" />
                      {project.views}
                    </div>
                    {/* Location-based price display */}
                    <div className="ml-2 px-3 py-1 rounded-full bg-black/30 text-white text-xs font-semibold">
                      {isIndia
                        ? (project.id === 1 ? '$15' : project.id === 2 ? '$25' : project.id === 3 ? '$50' : '$25')
                        : (project.price || '$69')}
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-300 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag}
                        className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center text-gray-500 text-sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <canvas ref={confettiRef} width={window.innerWidth} height={window.innerHeight} style={{position:'fixed',top:0,left:0,pointerEvents:'none',zIndex:9999}} />
      {/* Add the button at the bottom of the page */}
      <div className="w-full flex justify-center pb-12">
        <AnimatedButton className="mt-8 text-lg" onClick={() => {
          toast({ title: "🎉 Surprise!", description: "Confetti party! You clicked the forbidden button. 💃🕺" });
          launchConfetti(confettiRef.current);
          setShowVideo(true);
        }}>
          Don't Click It
        </AnimatedButton>
      </div>
    </>
  );
};

export default Portfolio;
