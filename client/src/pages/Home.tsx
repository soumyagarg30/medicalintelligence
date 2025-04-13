import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

const Home: React.FC = () => {
  // Recent donations data
  const donations = [
    {
      id: 1,
      medicine: "Paracetamol 500mg",
      donor: "Anonymous",
      expiry: "12/2023",
      status: "Available",
    },
    {
      id: 2,
      medicine: "Metformin 850mg",
      donor: "Dr. Sharma",
      expiry: "06/2024",
      status: "Available",
    },
  ];

  // Government schemes data
  const schemes = [
    {
      id: 1,
      name: "Pradhan Mantri Jan Arogya Yojana (PM-JAY)",
      description: "Health insurance coverage up to ₹5 lakhs per family per year.",
    },
    {
      id: 2,
      name: "Ayushman Bharat",
      description: "Comprehensive healthcare including free drugs and diagnostic services.",
    },
    {
      id: 3,
      name: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana",
      description: "Access to quality medicines at affordable prices.",
    },
  ];

  // Resources data
  const resources = [
    {
      id: 1,
      name: "Medicine Storage Guidelines",
      description: "Learn how to properly store medications to maintain their efficacy.",
    },
    {
      id: 2,
      name: "Drug Interaction Checker",
      description: "Check potential interactions between medications you're taking.",
    },
    {
      id: 3,
      name: "Finding Affordable Medications",
      description: "Resources to help you find low-cost medication options.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="md:col-span-2">
            <section className="bg-white p-6 rounded-lg shadow-sm">
              <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                Medical Resource Redistribution Platform
              </h1>
              <p className="text-gray-700 mb-6">
                MediShare helps redistribute unused medications to those who need them most,
                reducing waste and improving access to essential treatments.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-accent p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-primary mb-2">Donate Medicines</h3>
                  <p className="text-gray-700 text-sm">
                    Donate your unused, unexpired medications to help those in need.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    Donate Now
                  </button>
                </div>
                <div className="bg-accent p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-primary mb-2">Request Medicines</h3>
                  <p className="text-gray-700 text-sm">
                    Request medications you need but cannot afford or access.
                  </p>
                  <button className="mt-4 px-4 py-2 bg-primary text-white rounded-md text-sm font-medium hover:bg-indigo-700">
                    Request Now
                  </button>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Donations</h2>
              {donations.map((donation) => (
                <div key={donation.id} className="border-b border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{donation.medicine}</h3>
                      <p className="text-sm text-gray-500">Donated by: {donation.donor}</p>
                      <p className="text-sm text-gray-500">Expiry: {donation.expiry}</p>
                    </div>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {donation.status}
                    </span>
                  </div>
                </div>
              ))}
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Government Schemes</h2>
              <ul className="space-y-3 text-sm">
                {schemes.map((scheme) => (
                  <li key={scheme.id} className="border-b border-gray-100 pb-2">
                    <a href="#" className="text-primary hover:text-indigo-700 font-medium">
                      {scheme.name}
                    </a>
                    <p className="text-gray-600 text-xs mt-1">{scheme.description}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Popular Resources</h2>
              <ul className="space-y-3 text-sm">
                {resources.map((resource) => (
                  <li key={resource.id} className="border-b border-gray-100 pb-2">
                    <a href="#" className="text-primary hover:text-indigo-700 font-medium">
                      {resource.name}
                    </a>
                    <p className="text-gray-600 text-xs mt-1">{resource.description}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

export default Home;
