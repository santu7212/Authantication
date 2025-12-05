import { useContext } from "react";
import { AppContext } from "../context/AppContext";

const HomeUser = () => {
  const { user } = useContext(AppContext);  

  return (
    <section className="bg-[#111C2E] text-white min-h-[80vh] flex items-center py-10">
      <div className="max-w-4xl mx-auto px-6">

       
        <div className="bg-[#0E172A] p-8 rounded-xl shadow-lg border border-gray-700 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            Welcome back, <span className="text-[#06B6D4]">{user?.name}</span> 👋
          </h1>
          <p className="text-gray-300 text-lg">
            We're happy to see you again. You are successfully logged in.
          </p>
        </div>

        
        <div className="bg-gradient-to-r from-[#3BA1E3] to-[#5EC4F1] text-white p-6 rounded-xl shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-4">Your Account Details</h2>
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">Username:</span> {user?.name}
            </p>
            <p className="text-lg">
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
          </div>
        </div>

         
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-[#0E172A] p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Profile Status</h3>
            <p className="text-gray-300">
              Your profile is active and secure. Keep your account updated!
            </p>
          </div>

          <div className="bg-[#0E172A] p-6 rounded-xl shadow-lg border border-gray-700">
            <h3 className="text-xl font-semibold mb-2">Latest Message</h3>
            <p className="text-gray-300">
              You can now access dashboard features and manage authentication settings.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HomeUser;
