 const Footer = () => {
  return (
    <footer className="bg-white text-gray-700 py-10 border-t border-gray-300">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center space-y-4">

        {/* Brand */}
        <h2 className="text-2xl font-extrabold tracking-wide">
          <span className="text-teal-600">My</span>
          <span className="text-gray-600">Auth</span>
        </h2>

        {/* Small Description */}
        <p className="text-gray-500 text-sm max-w-xl mx-auto leading-relaxed">
          A secure and modern authentication interface built using React & Tailwind.
        </p>

        {/* Divider */}
        <div className="h-px bg-gray-300 my-4"></div>

        {/* Copyright */}
        <p className="text-gray-500 text-xs">
          © {new Date().getFullYear()} MyAuth — All Rights Reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
