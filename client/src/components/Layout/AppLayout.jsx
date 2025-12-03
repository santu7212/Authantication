 import Header from "./Header";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#0E172A]">

      {/* Header */}
      <Header />

      {/* Main Content (Hero, Login pages, etc.) */}
      <main className="flex-grow bg-[#111C2E]">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default AppLayout;
