import React from 'react'

export default function Foot() {
  return (
    <footer className="bg-black relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Section */}
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 border-2 border-white/40 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-2xl">R</span>
              </div>
              <h3 className="text-xl font-semibold text-white">Royal Brews</h3>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Purveyors of exceptional coffee experiences since 1890. 
              Crafting perfection in every cup.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h4 className="text-white font-medium mb-3">Navigation</h4>
            <ul className="space-y-2.5">
              {['About us', 'Contact us', 'Support', 'Help'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white text-sm transition-all duration-300
                    hover:underline underline-offset-4">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-white font-medium mb-3">Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>+1 (555) 123-4567</p>
              <p>contact@royalbrews.com</p>
              <p>Fifth Avenue, New York<br/>NY 10001, United States</p>
            </div>
          </div>

          {/* Social Media */}
          <div className="space-y-4">
            <h4 className="text-white font-medium mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {['fbicn', 'inicn', 'yticn', 'xicn'].map((icon, index) => (
                <a 
                  key={index} 
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center
                    hover:bg-white/10 transition-all duration-300"
                >
                  <img 
                    src={`./${icon}.png`} 
                    alt="" 
                    className="w-5 h-5 invert brightness-0 hover:brightness-100 transition-all"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="pt-8 border-t border-white/10">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} Royal Brews. All Rights Reserved.<br/>
            Crafted with ♥ by Prashanth Chowdary
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>
    </footer>
  )
}