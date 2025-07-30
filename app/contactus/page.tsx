"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheckCircle, FiAlertCircle, FiSend, FiMapPin, FiPhone, FiMail, FiMessageSquare } from "react-icons/fi";

// Form data type
type FormData = {
  name: string;
  email: string;
  message: string;
  subject: string;
};

// Initial form state
const initialFormData: FormData = {
  name: "",
  email: "",
  message: "",
  subject: "General Inquiry"
};

// Form validation
type FormErrors = Partial<Record<keyof FormData, string>>;

const validateForm = (data: FormData): FormErrors => {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = "Name is required";
  if (!data.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is invalid";
  }
  if (!data.message.trim()) errors.message = "Message is required";
  return errors;
};

export default function ContactUs() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{success: boolean; message: string} | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSubmitStatus({
        success: true,
        message: 'Message sent successfully! We\'ll get back to you soon.'
      });
      setFormData(initialFormData);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to send message. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <main className="flex-1 w-full">
        {/* Contact Section */}
        <section className="py-16 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                className="space-y-12"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              > <div className="relative mb-12 text-center">
              <motion.h1 
                className="text-5xl md:text-6xl font-bold tracking-tight"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 800,
                  letterSpacing: '-0.05em',
                  lineHeight: '1.1'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Easy to Reach
                  </span>
                  <span className="relative z-10 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Easy to Reach
                  </span>
                </span>
              </motion.h1>
              <motion.p 
                className="mt-4 text-3xl md:text-4xl"
                style={{
                  fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
                  fontWeight: 500,
                  letterSpacing: '-0.02em',
                  lineHeight: '1.3'
                }}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <span className="relative inline-block">
                  <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Ready to Help
                  </span>
                  <span className="relative z-10 bg-gradient-to-r from-blue-400 to-cyan-500 bg-clip-text text-transparent">
                    Ready to Help
                  </span>
                </span>
              </motion.p>
            </div>
                <div>
                  <h2 className="text-3xl font-light text-gray-900 mb-8">Let's Connect</h2>
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{
                      background: 'linear-gradient(135deg, #EA4335 0%, #FBBC05 25%, #34A853 50%, #4285F4 75%)',
                    }}>
                      <FiMapPin className="w-5 h-5 text-white" />
                    </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Visit Us</h3>
                        <p className="text-gray-600 leading-relaxed">
                          Matrix Smart Learning<br />
                          173, Nanjundapuram Road<br />
                          Ramanathapuram, Coimbatore – 641045
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#34A853] rounded-full flex items-center justify-center flex-shrink-0">
                        <FiPhone className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Call Us</h3>
                        <a 
                          href="tel:+918489918000" 
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          +91 84899 18000
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#EA4335] rounded-full flex items-center justify-center flex-shrink-0">
                        <FiMail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 mb-2">Email Us</h3>
                        <a 
                          href="mailto:matrixeduworld@gmail.com" 
                          className="text-gray-600 hover:text-gray-900 transition-colors"
                        >
                          matrixeduworld@gmail.com
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Section */}
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.653834424419!2d77.0021656147519!3d10.99039399217649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba859b7c62a5a7f%3A0x386cf858d531a11f!2sMatrix%20Smart%20Learning!5e0!3m2!1sen!2sin!4v1627042824555!5m2!1sen!2sin"
                    width="150%"
                    height="150"
                    style={{ border: 0 }}
                    allowFullScreen={true}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Matrix Smart Learning Location"
                  ></iframe>
                </div>

                <div className="p-6 bg-gray-50 rounded-2xl">
                  <h3 className="font-medium text-gray-900 mb-4">Business Hours</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Monday - Friday</span>
                      <span className="text-gray-900">9:00 AM - 9:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Saturday - Sunday</span>
                      <span className="text-gray-900">10:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="mb-8 text-center">
                  <motion.h3 
                    className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 mt-10"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    Get in Touch with the
                    <span className="bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent ml-2">
                      CLASSA Team
                    </span>
                  </motion.h3>
                  <motion.div 
                    className="h-1 w-20 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto rounded-full"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.5, delay: 0.4, ease: "easeOut" }}
                  />
                </div>
                <div className="bg-white border border-gray-200 rounded-2xl p-8">
                  <h2 className="text-3xl font-light text-gray-900 mb-8">Send Message</h2>
                  
                  <AnimatePresence>
                    {submitStatus && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className={`p-4 mb-6 rounded-lg ${
                          submitStatus.success 
                            ? 'bg-green-50 text-green-800 border border-green-200' 
                            : 'bg-red-50 text-red-800 border border-red-200'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          {submitStatus.success ? (
                            <FiCheckCircle className="w-5 h-5" />
                          ) : (
                            <FiAlertCircle className="w-5 h-5" />
                          )}
                          <p className="text-sm">{submitStatus.message}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className={`w-full p-4 border rounded-lg bg-white transition-colors ${
                          errors.name 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-gray-400'
                        } focus:outline-none`}
                      />
                      {errors.name && <p className="mt-2 text-sm text-red-600">{errors.name}</p>}
                    </div>
                    
                    <div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className={`w-full p-4 border rounded-lg bg-white transition-colors ${
                          errors.email 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-gray-400'
                        } focus:outline-none`}
                      />
                      {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
                    </div>
                    
                    <div>
                      <select
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full p-4 border border-gray-200 rounded-lg bg-white focus:border-gray-400 focus:outline-none"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Partnership">Partnership</option>
                        <option value="Support">Support</option>
                        <option value="Demo Request">Demo Request</option>
                      </select>
                    </div>
                    
                    <div>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Your message..."
                        rows={6}
                        className={`w-full p-4 border rounded-lg bg-white transition-colors resize-none ${
                          errors.message 
                            ? 'border-red-300 focus:border-red-500' 
                            : 'border-gray-200 focus:border-gray-400'
                        } focus:outline-none`}
                      />
                      {errors.message && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-3 px-6 py-4 text-white font-medium rounded-lg transition-all ${
                        isSubmitting 
                          ? 'bg-blue-500 cursor-not-allowed' 
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <FiSend className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-blue-50 pt-12 pb-4 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h2 className="text-2xl font-bold mb-4">
                <span style={{
                  background: 'linear-gradient(90deg, #007DC6 0%, #12881F 20%, #EDC531 40%, #F29553 60%, #A422D0 80%, #E75C5C 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block'
                }}>
                  CLASSA
                </span>
              </h2>
              <p className="text-black mb-4">
                Empowering educational institutions with comprehensive solutions for academic excellence and institutional growth.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-blue-900 hover:text-gray-700 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#1DA1F2] hover:text-gray-700 transition-colors">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-[#0A66C2] hover:text-gray-700 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-[#FF0000] hover:text-gray-700 transition-colors">
                  <span className="sr-only">YouTube</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M23.499 6.203a3.008 3.008 0 0 0-2.089-2.089c-1.87-.501-9.4-.501-9.4-.501s-7.509-.01-9.399.501a3.008 3.008 0 0 0-2.088 2.09A31.258 31.26 0 0 0 0 12.01a31.258 31.26 0 0 0 .523 5.785 3.008 3.008 0 0 0 2.088 2.089c1.869.502 9.4.502 9.4.502s7.508 0 9.399-.502a3.008 3.008 0 0 0 2.089-2.09 31.258 31.26 0 0 0 .5-5.784 31.258 31.26 0 0 0-.5-5.808zm-13.891 9.4V8.407l6.266 3.604z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h1 className="font-medium text-blue-900 mb-4"><b>Quick Links</b></h1>
              <ul className="space-y-3">
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Home</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">About Us</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Services</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Careers</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors"> Blog</a></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h1 className="font-medium text-blue-900 mb-4"><b>Support</b></h1>
              <ul className="space-y-3">
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Help Center</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-black hover:text-gray-700 transition-colors">Contact Support</a></li>
                <li><a href="https://calendly.com/matrixeduworld/demo" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-700 transition-colors">Book Demo</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-2 pt-2 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-2">
            <p className="text-black text-sm">
              &copy; {new Date().getFullYear()} CLASSA. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm text-black">
              <span>Made in India &nbsp;</span>
              <a href="mailto:matrixeduworld@gmail.com" className="hover:text-gray-700 transition-colors">
                matrixeduworld@gmail.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}