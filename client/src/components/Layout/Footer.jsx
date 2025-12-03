 const Footer = () => {
  return (
    <footer className="bg-[#0E172A] text-white py-3 border-t border-gray-700">
      <div className="max-w-7xl mx-auto text-center space-y-1">

        <h2 className="text-lg font-bold">
          <span className="text-[#06B6D4]">My</span>
          <span className="text-white">Auth</span>
        </h2>

        <p className="text-gray-400 text-xs">
          © {new Date().getFullYear()} MyAuth. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
