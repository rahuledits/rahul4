
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { GlareCard } from "@/components/ui/glare-card";
import { SparklesCore } from "@/components/ui/sparkles";
import { Star, Quote, Award, Zap } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [{
    quote: "Rahul's expertise in video editing transformed our corporate presentation into a compelling visual narrative. His attention to detail and professional approach exceeded our expectations, resulting in a 40% increase in client engagement.",
    name: "Priya Sharma",
    designation: "Chief Marketing Officer",
    company: "TechCorp Solutions",
    location: "Mumbai, India",
    src: "/3t.jpeg"
  }, {
    quote: "Working with Rahul was a game-changer for our music video production. His technical skills and creative vision delivered a final product that perfectly captured our artistic direction and resonated with our audience.",
    name: "Arjun Patel",
    designation: "Senior Producer",
    company: "Bollywood Records",
    location: "Delhi, India",
    src: "/2t.jpeg"
  }, {
    quote: "Rahul's documentary work demonstrates exceptional storytelling capabilities. His ability to capture authentic moments and weave them into compelling narratives has significantly enhanced our brand's market presence.",
    name: "Anjali Desai",
    designation: "Director of Communications",
    company: "InnovateTech",
    location: "Bangalore, India",
    src: "/1t.jpeg"
  }, {
    quote: "The integration of AI-enhanced motion graphics in our promotional content was executed flawlessly. Rahul's innovative approach to video editing has positioned us as industry leaders in digital marketing.",
    name: "Rajesh Kumar",
    designation: "Creative Director",
    company: "Digital Dynamics",
    location: "Hyderabad, India",
    src: "/4t.jpeg"
  }, {
    quote: "Rahul's cinematography and post-production expertise elevated our event coverage to cinematic standards. His work consistently delivers exceptional quality that exceeds industry benchmarks.",
    name: "Meera Singh",
    designation: "Executive Producer",
    company: "Cinema Studios",
    location: "Chennai, India",
    src: "/5t.jpeg"
  }];

  return (
    <section id="testimonials" className="py-16 sm:py-32 px-2 sm:px-4 relative overflow-x-hidden w-full">
      {/* Animated Background Sparkles */}
      <div className="absolute inset-0">
        <SparklesCore 
          background="transparent"
          minSize={0.3}
          maxSize={1.2}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#f97316"
          speed={1.2}
        />
      </div>
      <div className="max-w-7xl mx-auto relative z-10 w-full">
        {/* Enhanced Header */}
        <motion.div 
          className="text-center mb-10 sm:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          {/* Professional Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/20 to-indigo-500/20 backdrop-blur-sm border border-blue-500/30 mb-6"
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Award className="h-4 w-4 text-blue-400" />
            </motion.div>
            <span className="text-sm font-medium text-blue-300">Client Testimonials</span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>
          <motion.h2 
            className="text-2xl sm:text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.h2>
          <motion.p 
            className="text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Professional feedback from executives and decision-makers who have experienced our video editing expertise
          </motion.p>
          {/* Professional Stats */}
          <motion.div 
            className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-8 mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Award className="h-4 w-4 text-blue-400" />
              <span>150+ Enterprise Clients</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Zap className="h-4 w-4 text-indigo-400" />
              <span>99.8% Success Rate</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-gray-300 dark:bg-gray-600" />
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <Quote className="h-4 w-4 text-blue-400" />
              <span>Industry Recognition</span>
            </div>
          </motion.div>
        </motion.div>
        {/* Enhanced Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="w-full sm:md:basis-1/2 lg:basis-1/3 flex justify-center">
                  <motion.div 
                    className="p-2 sm:p-4 w-full max-w-md"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -10 }}
                  >
                    <div className="bg-white dark:bg-gray-800/50 backdrop-blur-xl rounded-2xl p-4 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:-translate-y-2 h-full relative overflow-hidden">
                      {/* Professional Quote Icon */}
                      <motion.div
                        className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity"
                        animate={{ rotate: [0, 2, -2, 0] }}
                        transition={{ duration: 6, repeat: Infinity }}
                      >
                        <Quote className="h-20 w-20 text-blue-400" />
                      </motion.div>
                      {/* Rating Stars */}
                      <div className="flex items-center gap-1 mb-6">
                        {[...Array(5)].map((_, i) => (
                          <motion.div
                            key={i}
                            initial={{ scale: 0, rotate: 180 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3, delay: i * 0.1 }}
                            viewport={{ once: true }}
                          >
                            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          </motion.div>
                        ))}
                      </div>
                      <div className="flex flex-col h-full relative z-10">
                        <blockquote className="text-gray-700 dark:text-gray-300 flex-grow text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 font-medium">
                          "{testimonial.quote}"
                        </blockquote>
                        <div className="flex items-center">
                          <motion.div
                            className="relative"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          >
                            <img
                              src={testimonial.src}
                              alt={testimonial.name}
                              className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover mr-2 sm:mr-4 border-2 border-blue-400/30"
                            />
                            {/* Professional glow effect */}
                            <div className="absolute inset-0 rounded-full bg-blue-400/10 blur-md scale-110" />
                          </motion.div>
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 dark:text-white text-base sm:text-lg">{testimonial.name}</h4>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-semibold">{testimonial.designation}</p>
                            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-500">{testimonial.company}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-600">{testimonial.location}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified Executive</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Professional Hover Effects */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                        initial={false}
                      />
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Enhanced Carousel Controls */}
            <CarouselPrevious className="text-gray-900 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110 transition-transform" />
            <CarouselNext className="text-gray-900 dark:text-white border-gray-300 dark:border-white/30 hover:bg-gray-100 dark:hover:bg-white/10 hover:scale-110 transition-transform" />
          </Carousel>
        </motion.div>
        {/* Professional CTA */}
        <motion.div
          className="text-center mt-10 sm:mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-sm border border-blue-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Award className="h-5 w-5 text-blue-400" />
            <span className="text-gray-700 dark:text-gray-300 font-semibold">Trusted by 150+ Enterprise Clients</span>
            <motion.div
              className="w-2 h-2 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
