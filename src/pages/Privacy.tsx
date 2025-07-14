import React from 'react';
import Navigation from "@/components/navigation/Navigation";
import SiteBackground from "@/components/ui/site-background";
import { Shield, Lock, Eye, Database, Cookie, Users, FileText } from 'lucide-react';

const Privacy = ({ isDark, onThemeToggle }) => {
  return (
    <>
      <Navigation isDark={isDark} onThemeToggle={onThemeToggle} />
      <div className="min-h-screen relative overflow-hidden">
        {/* Site Background */}
        <SiteBackground 
          isDarkMode={isDark} 
          sparkleDensity={25}
          sparkleColor="#8b5cf6"
          sparkleSpeed={0.4}
        />
        
        <div className="relative z-40 pt-32 pb-16">
          <div className="max-w-4xl mx-auto px-6">
            {/* Header */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/[0.08] border border-white/[0.15] backdrop-blur-sm mb-6">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-sm font-medium text-white/80">
                  Privacy & Security
                </span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Privacy Policy
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                Your privacy and security are our top priorities. Learn how we protect your data.
              </p>
            </div>

            {/* Content */}
            <div className="space-y-12">
              {/* Information We Collect */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <Database className="h-6 w-6 text-blue-400" />
                  <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>We collect only the information necessary to provide our services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Contact Information:</strong> Name, email, and phone number when you submit our contact form</li>
                    <li><strong>Project Details:</strong> Information about your video editing projects and requirements</li>
                    <li><strong>Technical Data:</strong> Browser type, IP address, and device information for security purposes</li>
                    <li><strong>Usage Analytics:</strong> Anonymous data about how you interact with our website</li>
                  </ul>
                </div>
              </section>

              {/* How We Use Your Information */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <Users className="h-6 w-6 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>To respond to your inquiries and provide video editing services</li>
                    <li>To improve our website and services based on usage patterns</li>
                    <li>To ensure website security and prevent fraud</li>
                    <li>To comply with legal obligations and protect our rights</li>
                  </ul>
                </div>
              </section>

              {/* Data Security */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <Lock className="h-6 w-6 text-red-400" />
                  <h2 className="text-2xl font-bold text-white">Data Security</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>We implement industry-standard security measures to protect your data:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>HTTPS Encryption:</strong> All data transmission is encrypted using SSL/TLS</li>
                    <li><strong>Input Validation:</strong> All form inputs are sanitized to prevent XSS attacks</li>
                    <li><strong>Rate Limiting:</strong> Protection against spam and brute force attacks</li>
                    <li><strong>Content Security Policy:</strong> Prevents malicious code execution</li>
                    <li><strong>Secure Headers:</strong> Additional security headers to protect against common attacks</li>
                  </ul>
                </div>
              </section>

              {/* Cookies */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <Cookie className="h-6 w-6 text-yellow-400" />
                  <h2 className="text-2xl font-bold text-white">Cookies & Tracking</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>We use cookies and similar technologies for:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                    <li><strong>Analytics Cookies:</strong> Google Analytics to understand website usage</li>
                    <li><strong>Preference Cookies:</strong> Remember your theme and language preferences</li>
                  </ul>
                  <p className="mt-4">You can control cookie settings through your browser preferences.</p>
                </div>
              </section>

              {/* Third-Party Services */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <Eye className="h-6 w-6 text-purple-400" />
                  <h2 className="text-2xl font-bold text-white">Third-Party Services</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>We use the following third-party services:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Google Analytics:</strong> Website analytics and performance monitoring</li>
                    <li><strong>Google Fonts:</strong> Typography and design elements</li>
                    <li><strong>Social Media Platforms:</strong> Instagram, LinkedIn for business communication</li>
                  </ul>
                  <p className="mt-4">These services have their own privacy policies and data handling practices.</p>
                </div>
              </section>

              {/* Your Rights */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <div className="flex items-center gap-3 mb-6">
                  <FileText className="h-6 w-6 text-cyan-400" />
                  <h2 className="text-2xl font-bold text-white">Your Rights</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>You have the following rights regarding your personal data:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li><strong>Access:</strong> Request a copy of your personal data</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate data</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                    <li><strong>Portability:</strong> Request data in a portable format</li>
                    <li><strong>Objection:</strong> Object to processing of your data</li>
                  </ul>
                  <p className="mt-4">To exercise these rights, contact us at jirahulmeena@gmail.com</p>
                </div>
              </section>

              {/* Contact Information */}
              <section className="bg-white/[0.05] backdrop-blur-sm rounded-2xl p-8 border border-white/[0.1]">
                <h2 className="text-2xl font-bold text-white mb-6">Contact Us</h2>
                <div className="space-y-4 text-gray-300">
                  <p>If you have questions about this privacy policy or our data practices:</p>
                  <div className="bg-white/[0.05] rounded-lg p-4">
                    <p><strong>Email:</strong> jirahulmeena@gmail.com</p>
                    <p><strong>Location:</strong> Mumbai, India</p>
                    <p><strong>Last Updated:</strong> {new Date().toLocaleDateString()}</p>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Privacy; 