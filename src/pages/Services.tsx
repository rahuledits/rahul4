import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, Zap, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CardSpotlight } from "@/components/ui/card-spotlight";
import { Link } from 'react-router-dom';
import Navigation from "@/components/navigation/Navigation";
import SiteBackground from "@/components/ui/site-background";

const Services = ({ isDark, onThemeToggle }) => {
  const [currency, setCurrency] = useState('USD');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const packages = [
    {
      name: "Basic Edit",
      icon: <Zap className="w-8 h-8" />,
      priceUSD: "$24.99",
      priceINR: "₹2,199",
      duration: "2-3 days",
      description: "Professional Adobe Premiere Pro editing for quality projects",
      features: [
        "Adobe Premiere Pro Professional Editing",
        "Advanced Color Correction & Grading", 
        "Professional Audio Enhancement",
        "2-3 Day Delivery",
        "2 revisions included",
        "4K delivery option",
        "Custom visual narratives",
        "Social media optimization"
      ],
      popular: false,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      name: "Professional",
      icon: <Star className="w-8 h-8" />,
      priceUSD: "$79.99",
      priceINR: "₹6,999",
      duration: "3-5 days",
      description: "Premium Adobe After Effects & Premiere Pro mastery",
      features: [
        "Adobe After Effects Advanced VFX",
        "Adobe Premiere Pro Professional Editing",
        "Custom Motion Graphics & Animation",
        "Cinematic Color Grading",
        "Professional Sound Design & Mixing",
        "4K/8K delivery options",
        "Custom thumbnails & graphics",
        "Engaging visual narratives",
        "3 revisions included"
      ],
      popular: true,
      gradient: "from-orange-500 to-pink-500"
    },
    {
      name: "Cinematic",
      icon: <Crown className="w-8 h-8" />,
      priceUSD: "$169.99",
      priceINR: "₹14,999",
      duration: "5-7 days",
      description: "Hollywood-grade post-production excellence",
      features: [
        "Adobe After Effects Hollywood VFX",
        "Adobe Premiere Pro Master Editing",
        "Advanced Motion Graphics & 3D",
        "Cinematic Color Grading & LUTs",
        "Visual Effects & Compositing",
        "Custom Graphics & Branding",
        "Personal Consultation & Strategy",
        "Premium visual storytelling",
        "Unlimited revisions",
        "Project files included"
      ],
      popular: false,
      gradient: "from-purple-500 to-indigo-500"
    }
  ];

  const additionalServices = [
    {
      id: 'rushDelivery',
      title: "Rush Delivery",
      description: "Get your project completed in 24-48 hours",
      priceUSD: "+50% of package price",
      priceINR: "+50% of package price"
    },
    {
      id: 'additionalRevisions',
      title: "Additional Revisions",
      description: "Beyond the included revisions",
      priceUSD: "+20% of package price",
      priceINR: "+20% of package price"
    },
    {
      id: 'customMusic',
      title: "Custom Music",
      description: "Original soundtrack composition",
      priceUSD: "+70% of package price",
      priceINR: "+70% of package price"
    },
    {
      id: 'extraFormats',
      title: "Extra Formats",
      description: "Multiple aspect ratios for different platforms",
      priceUSD: "+30% of package price",
      priceINR: "+30% of package price"
    }
  ];

  const handleServiceToggle = (serviceId: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceId) 
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const getContactUrl = (packageName?: string) => {
    const params = new URLSearchParams();
    if (selectedServices.length > 0) {
      params.set('services', selectedServices.join(','));
    }
    if (packageName) {
      params.set('package', packageName);
    }
    params.set('currency', currency);
    return `/contact?${params.toString()}`;
  };

  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden">
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDark} 
          sparkleDensity={50}
          sparkleColor="#8b5cf6"
          sparkleSpeed={0.8}
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
              Services & Pricing
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              Professional video editing services tailored to your needs. 
              From simple cuts to cinematic masterpieces, I've got you covered.
            </p>
            
            {/* Currency Toggle */}
            <motion.div 
              className="flex justify-center mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
                <button
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currency === 'USD' 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  🇺🇸 USD
                </button>
                <button
                  onClick={() => setCurrency('INR')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    currency === 'INR' 
                      ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg' 
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  🇮🇳 INR
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Pricing Packages */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-10">
                    <span className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}
                
                <CardSpotlight
                  className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 relative h-full"
                  color="#8b5cf6"
                  radius={200}
                >
                  <CardHeader className="text-center relative z-10">
                    <div className={`mx-auto mb-4 p-3 rounded-full bg-gradient-to-br ${pkg.gradient} text-white`}>
                      {pkg.icon}
                    </div>
                    <CardTitle className="text-2xl font-bold text-white mb-2">
                      {pkg.name}
                    </CardTitle>
                    <div className="text-4xl font-bold text-white mb-2">
                      {currency === 'USD' ? pkg.priceUSD : pkg.priceINR}
                    </div>
                    <p className="text-gray-400">{pkg.duration}</p>
                    <p className="text-gray-500 text-xs mt-1">*Prices exclude applicable taxes</p>
                    <p className="text-gray-300 text-sm mt-2">{pkg.description}</p>
                  </CardHeader>
                  
                  <CardContent className="relative z-10">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-center text-gray-300">
                          <Check className="w-5 h-5 text-green-400 mr-3 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <Link to={getContactUrl(pkg.name)}>
                      <Button 
                        className={`w-full bg-gradient-to-r ${pkg.gradient} hover:opacity-90 border-0 text-white font-semibold py-3 relative z-10`}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </CardContent>
                </CardSpotlight>
              </motion.div>
            ))}
          </div>

          {/* Additional Services */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Additional Services</h2>
            
            {selectedServices.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 bg-gradient-to-r from-orange-500/10 to-pink-500/10 border border-orange-400/30 rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold mb-2">Selected Services:</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedServices.map(serviceId => {
                        const service = additionalServices.find(s => s.id === serviceId);
                        return service ? (
                          <span key={serviceId} className="px-3 py-1 bg-orange-500/20 border border-orange-400/30 rounded-full text-orange-300 text-sm">
                            {service.title}
                          </span>
                        ) : null;
                      })}
                    </div>
                  </div>
                  <Button
                    onClick={() => setSelectedServices([])}
                    variant="outline"
                    size="sm"
                    className="border-orange-400/30 text-orange-300 hover:bg-orange-500/10"
                  >
                    Clear All
                  </Button>
                </div>
              </motion.div>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {additionalServices.map((service, index) => (
                <CardSpotlight
                  key={service.id}
                  className={`bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/20 cursor-pointer transition-all ${
                    selectedServices.includes(service.id) 
                      ? 'border-orange-400/50 bg-orange-500/10' 
                      : 'hover:bg-white/[0.08]'
                  }`}
                  color="#f97316"
                  radius={150}
                  onClick={() => handleServiceToggle(service.id)}
                >
                  <div className="flex justify-between items-start relative z-10">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400 text-sm">{service.description}</p>
                    </div>
                    <div className="text-orange-400 font-bold text-right">
                      <div>{currency === 'USD' ? service.priceUSD : service.priceINR}</div>
                      <div className="text-orange-300/60 text-xs">excl. tax</div>
                    </div>
                  </div>
                  {selectedServices.includes(service.id) && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center"
                    >
                      <Check className="w-4 h-4 text-white" />
                    </motion.div>
                  )}
                </CardSpotlight>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Let's discuss your vision and create something amazing together. 
                Contact me for a free consultation and custom quote.
              </p>
              <Link to={getContactUrl()}>
                <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:opacity-90 border-0 text-white font-semibold px-8 py-3 text-lg">
                  Get Free Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Services;
