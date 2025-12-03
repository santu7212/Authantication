 const HeroSection = () => {
  return (
    <section className="bg-[#111C2E] text-white min-h-[80vh] flex items-center">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* --- LEFT (Centered Text) --- */}
        <div className="space-y-6 md:space-y-8">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-center md:text-left">
            Welcome to{" "}
            <span className="text-[#06B6D4]">MyAuth</span> <br/>
            Secure Access <br/>
            Simplified.
          </h1>

          <p className="text-gray-300 text-lg leading-relaxed max-w-xl mx-auto md:mx-0 text-center md:text-left">
            Login, register, verify email & reset passwords — all in one UI.
          </p>

          <div className="flex justify-center md:justify-start">
            <button className="bg-[#06B6D4] hover:bg-[#0894aa] text-white font-semibold px-6 py-3 rounded-md transition">
              Get Started →
            </button>
          </div>
        </div>

        {/* --- RIGHT CARD --- */}
        <div className="flex justify-center md:justify-end">
          <div className="bg-gradient-to-r from-[#3BA1E3] to-[#5EC4F1] text-white p-8 rounded-xl shadow-lg text-center w-[320px]">
            <h2 className="text-xl font-bold mb-2">Authentication UI</h2>
            <p className="text-sm">
              Login • Register • Reset Password • Email Verify
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
