import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  User, 
  MessageSquare, 
  Building, 
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap,
  Plus,
  Music,
  FileVideo,
  Zap as ZapIcon
} from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Get in touch via email",
    value: "jirahulmeena@gmail.com",
    link: "mailto:jirahulmeena@gmail.com",
    gradient: "from-blue-500/20 to-cyan-500/20",
    hoverColor: "blue"
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Speak directly with our team",
    value: "+91 6378013808",
    link: "tel:+916378013808",
    gradient: "from-green-500/20 to-emerald-500/20",
    hoverColor: "green"
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our headquarters",
    value: "Mumbai, India",
    link: "#",
    gradient: "from-purple-500/20 to-pink-500/20",
    hoverColor: "purple"
  }
];

const companyStats = [
  { label: "Response Time", value: "< 18 hours", icon: Clock },
  { label: "Global Clients", value: "50+", icon: Globe },
  { label: "Security Level", value: "Premium", icon: Shield },
  { label: "Success Rate", value: "99.9%", icon: Zap }
];

const projectTypes = [
  "Music Video",
  "Commercial/Ad",
  "Wedding Video",
  "Corporate Video",
  "Short Film",
  "Social Media Content",
  "Event Coverage",
  "Other"
];

const budgetRangesINR = [
  "Under ₹2,000",
  "₹2,000 - ₹4,000",
  "₹4,000 - ₹6,000",
  "₹6,000 - ₹8,000",
  "₹8,000 - ₹10,000",
  "₹10,000 - ₹15,000",
  "₹15,000 - ₹25,000",
  "₹25,000+",
  "Let's discuss"
];

const budgetRangesUSD = [
  "Under $25",
  "$25 - $50",
  "$50 - $75",
  "$75 - $100",
  "$100 - $125",
  "$125 - $200",
  "$200 - $300",
  "$300+",
  "Let's discuss"
];

const optionalServices = [
  {
    id: 'rushDelivery',
    title: "Rush Delivery",
    description: "Get your project completed in 24-48 hours",
    priceUSD: "+40% of package price",
    priceINR: "+40% of package price",
    icon: ZapIcon,
    gradient: "from-orange-500/20 to-red-500/20"
  },
  {
    id: 'additionalRevisions',
    title: "Additional Revisions",
    description: "Beyond the included revisions",
    priceUSD: "+15% of package price",
    priceINR: "+15% of package price",
    icon: Plus,
    gradient: "from-blue-500/20 to-cyan-500/20"
  },
  {
    id: 'customMusic',
    title: "Custom Music",
    description: "Original soundtrack composition",
    priceUSD: "+60% of package price",
    priceINR: "+60% of package price",
    icon: Music,
    gradient: "from-purple-500/20 to-pink-500/20"
  },
  {
    id: 'extraFormats',
    title: "Extra Formats",
    description: "Multiple aspect ratios for different platforms",
    priceUSD: "+20% of package price",
    priceINR: "+20% of package price",
    icon: FileVideo,
    gradient: "from-green-500/20 to-emerald-500/20"
  }
];

export function PremiumContact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    timeline: '',
    projectType: '',
    budget: '',
    message: '',
    currency: 'INR'
  });
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Read URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const servicesParam = urlParams.get('services');
    const packageParam = urlParams.get('package');
    const currencyParam = urlParams.get('currency');
    
    if (servicesParam) {
      const services = servicesParam.split(',').filter(Boolean);
      setSelectedServices(services);
    }
    
    if (packageParam) {
      setFormData(prev => ({ ...prev, projectType: packageParam }));
    }
    
    if (currencyParam && (currencyParam === 'USD' || currencyParam === 'INR')) {
      setFormData(prev => ({ ...prev, currency: currencyParam }));
    }
  }, []);

  // Package information for display
  const packageInfo = {
    "Basic Edit": {
      priceUSD: "$19.99",
      priceINR: "₹1,699",
      duration: "2-3 days",
      gradient: "from-blue-500 to-cyan-500"
    },
    "Professional": {
      priceUSD: "$69.99",
      priceINR: "₹5,999",
      duration: "3-5 days",
      gradient: "from-orange-500 to-pink-500"
    },
    "Cinematic": {
      priceUSD: "$149.99",
      priceINR: "₹12,999",
      duration: "5-7 days",
      gradient: "from-purple-500 to-indigo-500"
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { 
      opacity: 1, 
      y: 0
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  return (
    <section className="relative py-32 bg-black/80 dark:bg-black/80 bg-white/90 backdrop-blur-sm text-white dark:text-white text-gray-900 overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient mesh */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.08] via-purple-500/[0.05] to-rose-500/[0.08] dark:from-indigo-500/[0.08] dark:via-purple-500/[0.05] dark:to-rose-500/[0.08]"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundSize: '400% 400%'
          }}
        />
        
        {/* Moving orbs */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, 200, 0],
            y: [0, 100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-rose-400/10 rounded-full blur-3xl"
          animate={{
            x: [0, -150, 0],
            y: [0, -80, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Communication lines */}
        <div className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent"
              style={{
                left: `${20 + (i * 15)}%`,
                top: `${25 + (i * 8)}%`,
                transform: `rotate(${30 + i * 20}deg)`
              }}
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scaleY: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>

      <motion.div 
        ref={containerRef}
        className="relative z-10 max-w-7xl mx-auto px-6"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          variants={fadeInUp}
        >
          <motion.div
            className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(255, 255, 255, 0.3)" }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="h-4 w-4 text-indigo-300" />
            </motion.div>
            <span className="text-sm font-medium text-white/80">
              ✨ Let's Connect
            </span>
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </motion.div>

          <motion.h2 
            className="text-4xl sm:text-6xl md:text-7xl font-bold mb-8 tracking-tight"
            variants={fadeInUp}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-white/80">
              Start Your
            </span>
            <br />
            <motion.span 
              className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-600 dark:from-indigo-300 dark:via-purple-300 dark:to-rose-300"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Project
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="text-xl sm:text-2xl text-gray-600 dark:text-white/60 max-w-4xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Ready to elevate your content with professional video production? Let's discuss your project requirements and create a tailored solution that exceeds your expectations.
          </motion.p>
        </motion.div>

        {/* Stats Bar */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
          variants={fadeInUp}
        >
          {companyStats.map((stat, index) => (
            <motion.div
              key={index}
              className="text-center p-6 bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15] group hover:bg-white/[0.08] transition-all"
              whileHover={{ scale: 1.05, y: -5 }}
              variants={fadeInUp}
            >
              <motion.div
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center mx-auto mb-3"
                whileHover={{ rotateY: 180 }}
                transition={{ duration: 0.6 }}
              >
                <stat.icon className="w-6 h-6 text-indigo-300" />
              </motion.div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            <div>
              <h3 className="text-3xl font-bold text-white mb-4">Project Consultation</h3>
              <p className="text-white/60 text-lg">
                Share your project details and receive a comprehensive proposal within 24 hours.
              </p>
            </div>

            {/* Selected Plan Display */}
            {formData.projectType && packageInfo[formData.projectType] && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 bg-gradient-to-br from-white/[0.08] to-white/[0.05] backdrop-blur-xl rounded-2xl border border-white/[0.15]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${packageInfo[formData.projectType].gradient} flex items-center justify-center`}>
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{formData.projectType}</h4>
                      <p className="text-white/60 text-sm">
                        {formData.currency === 'USD' ? packageInfo[formData.projectType].priceUSD : packageInfo[formData.projectType].priceINR} • {packageInfo[formData.projectType].duration}
                      </p>
                      <p className="text-white/40 text-xs mt-1">
                        *Prices exclude applicable taxes
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white/60 text-sm">Selected Plan</div>
                    <div className={`text-transparent bg-clip-text bg-gradient-to-r ${packageInfo[formData.projectType].gradient} font-bold text-lg`}>
                      {formData.currency === 'USD' ? packageInfo[formData.projectType].priceUSD : packageInfo[formData.projectType].priceINR}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <input
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all ${
                          errors.name ? 'border-red-400' : 'border-gray-300 dark:border-white/[0.15]'
                        }`}
                      />
                      {errors.name && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.name}
                        </motion.p>
                      )}
                    </div>

                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all ${
                          errors.email ? 'border-red-400' : 'border-gray-300 dark:border-white/[0.15]'
                        }`}
                      />
                      {errors.email && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-red-400 text-sm mt-2"
                        >
                          {errors.email}
                        </motion.p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <input
                        type="tel"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                    </div>

                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <input
                        type="text"
                        placeholder="Project Timeline"
                        value={formData.timeline}
                        onChange={(e) => handleInputChange('timeline', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <select
                        value={formData.projectType}
                        onChange={(e) => handleInputChange('projectType', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 transition-all"
                      >
                        <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select project type</option>
                        {projectTypes.map(type => (
                          <option key={type} value={type} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{type}</option>
                        ))}
                      </select>
                    </div>

                    <div className="relative">
                      <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <select
                        value={formData.currency}
                        onChange={(e) => {
                          handleInputChange('currency', e.target.value);
                          handleInputChange('budget', ''); // Reset budget when currency changes
                        }}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 transition-all"
                      >
                        <option value="INR" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">🇮🇳 INR (₹)</option>
                        <option value="USD" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">🇺🇸 USD ($)</option>
                      </select>
                    </div>

                    <div className="relative">
                      <Zap className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white/40" />
                      <select
                        value={formData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white focus:outline-none focus:border-indigo-400 transition-all"
                      >
                        <option value="" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Select budget range</option>
                        {(formData.currency === 'INR' ? budgetRangesINR : budgetRangesUSD).map(range => (
                          <option key={range} value={range} className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">{range}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-gray-500 dark:text-white/40" />
                    <textarea
                      placeholder="Tell us about your project..."
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      className={`w-full pl-10 pr-4 py-4 bg-white/[0.08] dark:bg-white/[0.08] bg-gray-50 border rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 focus:outline-none focus:border-indigo-400 transition-all resize-none ${
                        errors.message ? 'border-red-400' : 'border-gray-300 dark:border-white/[0.15]'
                      }`}
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-400 text-sm mt-2"
                      >
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Optional Services Section */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 mb-4">
                      <Sparkles className="h-5 w-5 text-indigo-300" />
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white">Optional Services</h4>
                      <span className="text-sm text-gray-600 dark:text-white/60">(Select any additional services you need)</span>
                    </div>

                    {/* Cost Summary */}
                    {formData.projectType && packageInfo[formData.projectType] && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-4 p-3 bg-gradient-to-r from-indigo-500/[0.08] to-purple-500/[0.08] rounded-xl border border-indigo-400/30"
                      >
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-700 dark:text-white/80">Base Package (excl. tax):</span>
                          <span className="text-gray-900 dark:text-white font-medium">
                            {formData.currency === 'USD' ? packageInfo[formData.projectType].priceUSD : packageInfo[formData.projectType].priceINR}
                          </span>
                        </div>
                        {selectedServices.length > 0 && (
                          <>
                            <div className="flex items-center justify-between text-sm mt-1">
                              <span className="text-gray-700 dark:text-white/80">Additional Services:</span>
                              <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                                {selectedServices.length} selected
                              </span>
                            </div>
                            <div className="mt-2 pt-2 border-t border-gray-300 dark:border-white/10">
                              <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-600 dark:text-white/60">Estimated Total (excl. tax):</span>
                                <span className="text-indigo-600 dark:text-indigo-300 font-semibold">
                                  {formData.currency === 'USD' ? 'Custom Quote' : 'Custom Quote'}
                                </span>
                              </div>
                              <p className="text-gray-500 dark:text-white/40 text-xs mt-1">
                                *Final price will be calculated based on your specific requirements
                              </p>
                              <p className="text-gray-500 dark:text-white/40 text-xs">
                                *All prices exclude applicable taxes and fees
                              </p>
                            </div>
                          </>
                        )}
                      </motion.div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {optionalServices.map((service) => (
                        <motion.div
                          key={service.id}
                          className={`relative p-4 rounded-xl border transition-all cursor-pointer group ${
                            selectedServices.includes(service.id)
                              ? 'bg-gradient-to-br from-indigo-500/20 to-purple-500/20 border-indigo-400/50'
                              : 'bg-gray-50 dark:bg-white/[0.05] border-gray-200 dark:border-white/[0.15] hover:bg-gray-100 dark:hover:bg-white/[0.08]'
                          }`}
                          onClick={() => handleServiceToggle(service.id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <div className="flex items-start gap-3">
                            <motion.div
                              className={`w-10 h-10 rounded-lg bg-gradient-to-br ${service.gradient} border border-white/20 flex items-center justify-center flex-shrink-0`}
                              whileHover={{ scale: 1.1, rotateY: 180 }}
                              transition={{ duration: 0.6 }}
                            >
                              <service.icon className="w-5 h-5 text-white" />
                            </motion.div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="text-gray-900 dark:text-white font-medium text-sm">{service.title}</h5>
                                <motion.div
                                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                                    selectedServices.includes(service.id)
                                      ? 'bg-indigo-500 border-indigo-500'
                                      : 'border-white/30'
                                  }`}
                                  animate={{
                                    scale: selectedServices.includes(service.id) ? [1, 1.2, 1] : 1
                                  }}
                                  transition={{ duration: 0.2 }}
                                >
                                  {selectedServices.includes(service.id) && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </motion.div>
                              </div>
                              <p className="text-gray-600 dark:text-white/60 text-xs mb-2">{service.description}</p>
                              <p className="text-indigo-600 dark:text-indigo-300 text-xs font-medium">
                                {formData.currency === 'USD' ? service.priceUSD : service.priceINR}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <motion.div
                          className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Submit Project Request
                          <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-12"
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                  >
                    <CheckCircle className="w-10 h-10 text-green-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Message Sent!</h3>
                  <p className="text-gray-600 dark:text-white/60 text-lg mb-6">
                    Thank you for reaching out. We'll get back to you within 24 hours.
                  </p>

                  {/* Selected Plan Summary */}
                  {formData.projectType && packageInfo[formData.projectType] && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-gray-50 dark:bg-white/[0.05] rounded-xl p-4 border border-gray-200 dark:border-white/[0.15] mb-6"
                    >
                      <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Selected Package:</h4>
                      <div className="flex items-center justify-between text-sm mb-2">
                        <span className="text-gray-700 dark:text-white/80">{formData.projectType}</span>
                        <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                          {formData.currency === 'USD' ? packageInfo[formData.projectType].priceUSD : packageInfo[formData.projectType].priceINR}
                        </span>
                      </div>
                      <div className="text-gray-600 dark:text-white/60 text-xs">
                        Duration: {packageInfo[formData.projectType].duration}
                      </div>
                      <div className="text-gray-500 dark:text-white/40 text-xs mt-1">
                        *Price excludes applicable taxes
                      </div>
                    </motion.div>
                  )}
                  
                  {selectedServices.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="bg-gray-50 dark:bg-white/[0.05] rounded-xl p-4 border border-gray-200 dark:border-white/[0.15] mb-6"
                    >
                      <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Selected Additional Services:</h4>
                      <div className="space-y-2">
                        {selectedServices.map(serviceId => {
                          const service = optionalServices.find(s => s.id === serviceId);
                          return service ? (
                            <div key={serviceId} className="flex items-center justify-between text-sm">
                              <span className="text-gray-700 dark:text-white/80">{service.title}</span>
                              <span className="text-indigo-600 dark:text-indigo-300 font-medium">
                                {formData.currency === 'USD' ? service.priceUSD : service.priceINR}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </motion.div>
                  )}
                  <motion.button
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', timeline: '', projectType: '', budget: '', message: '', currency: 'INR' });
                      setSelectedServices([]);
                    }}
                    className="px-6 py-3 bg-gray-100 dark:bg-white/[0.08] border border-gray-300 dark:border-white/[0.15] rounded-xl text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-white/[0.12] transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Send Another Message
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Contact Methods */}
          <motion.div 
            className="space-y-8"
            variants={fadeInUp}
          >
            <div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Other ways to reach us</h3>
              <p className="text-gray-600 dark:text-white/60 text-lg">
                Choose the method that works best for you.
              </p>
            </div>

            <div className="space-y-6">
              {contactMethods.map((method, index) => (
                <motion.a
                  key={index}
                  href={method.link}
                  className="block p-6 bg-gray-50 dark:bg-white/[0.05] backdrop-blur-xl rounded-2xl border border-gray-200 dark:border-white/[0.15] hover:bg-gray-100 dark:hover:bg-white/[0.08] transition-all group"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.02, y: -2 }}
                >
                  <div className="flex items-center gap-4">
                    <motion.div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-white/20 flex items-center justify-center`}
                      whileHover={{ scale: 1.1, rotateY: 180 }}
                      transition={{ duration: 0.6 }}
                    >
                      <method.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    <div className="flex-1">
                      <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">{method.title}</h4>
                      <p className="text-gray-600 dark:text-white/60 text-sm mb-2">{method.description}</p>
                      <p className="text-gray-900 dark:text-white font-medium">{method.value}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-500 dark:text-white/40 group-hover:text-gray-700 dark:group-hover:text-white group-hover:translate-x-1 transition-all" />
                  </div>
                </motion.a>
              ))}
            </div>

            {/* Additional Info */}
            <motion.div
              className="p-6 bg-gradient-to-br from-indigo-500/[0.08] to-purple-500/[0.08] backdrop-blur-xl rounded-2xl border border-indigo-400/30"
              variants={fadeInUp}
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Quick Response Guarantee</h4>
              <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed">
                We pride ourselves on rapid response times. All inquiries are typically answered within 2 hours during business hours, 
                and we'll schedule a call within 24 hours to discuss your project in detail.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-gray-400 dark:bg-white/20 rounded-full"
            style={{
              left: `${10 + (i * 12)}%`,
              top: `${20 + (i * 10)}%`,
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.6,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
} 