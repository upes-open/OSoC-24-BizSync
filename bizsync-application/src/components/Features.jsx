import React from "react";

const FeatureCard = ({ icon, title, description, action, children }) => (
  <div className="bg-gray-800 rounded-lg p-6 flex flex-col shadow-lg shadow-purple-500/20">
    <div
      className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${icon.bg}`}
    >
      <img src={icon.src} alt={title} className="w-6 h-6" />
    </div>
    <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 mb-4 flex-grow">{description}</p>
    <a
      href="#"
      className="text-purple-400 hover:text-purple-300 transition-colors"
    >
      {action}
    </a>
    {children}
  </div>
);

const Features = () => {
  return (
    <div className="bg-[#0B0121] text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-2">
          Features that work for your future.
        </h2>
        <p className="text-gray-400 mb-12">
          Check out our amazing features and experience the power of Vaultflow
          for yourself.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FeatureCard
            icon={{
              src: "https://img.icons8.com/?size=100&id=3005&format=png&color=FFFFFF",
              bg: "bg-purple-700",
            }}
            title="Analytics Dashboard"
            description="Our Analytics Dashboard provides a clear and intuitive interface for you to easily analyze your data. From customizable graphs to real-time data updates, our dashboard offers everything you need to gain valuable insights."
            action="View dashboard"
          />
          <FeatureCard
            icon={{
              src: "https://img.icons8.com/?size=100&id=cfbeRO1dCCJo&format=png&color=FFFFFF",
              bg: "bg-purple-700",
            }}
            title="Lorem Ipsum"
            description="Reward your customers and incentivize engagement with our innovative digital credit tokens. Our tokens can be customized to match your branding, and are a flexible and scalable way to drive customer loyalty and encourage repeat business."
            action="View tokens"
          />
        </div>

        <div className="mt-6">
          <FeatureCard
            icon={{
              src: "https://img.icons8.com/?size=100&id=2778&format=png&color=FFFFFF",
              bg: "bg-pink-700",
            }}
            title="Lorem Ipsum"
            description="Our advanced code synchronization technology ensures that your data is always up-to-date and accurate, no matter where it's coming from. Whether you're integrating data from multiple sources or working with a team of developers, our synchronization technology makes it easy to collaborate and ensure that your data is consistent and reliable."
            action="View code collaboration"
          >
            <img
              src="/assets/erp.png"
              alt="Dashboard preview"
              className="mt-4 rounded-lg shadow-lg"
            />
          </FeatureCard>
        </div>
      </div>
    </div>
  );
};

export default Features;
