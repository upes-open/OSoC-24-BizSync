import React from "react";

const testimonials = [
  {
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    author: "Jane Smith",
    avatar: "https://img.icons8.com/?size=100&id=20749&format=png&color=000000",
    rating: 5,
  },
  {
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    author: "Jane Smith",
    avatar: "https://img.icons8.com/?size=100&id=20749&format=png&color=000000",
    rating: 5,
  },
  {
    text: "Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.",
    author: "Jane Smith",
    avatar: "https://img.icons8.com/?size=100&id=20749&format=png&color=000000",
    rating: 5,
  },
];

const TestimonialCard = ({ text, author, avatar, rating }) => (
  <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg">
    <p className="mb-4">{text}</p>
    <div className="flex items-center">
      <img src={avatar} alt={author} className="w-12 h-12 rounded-full mr-4" />
      <div>
        <p className="font-semibold">{author}</p>
        <div className="flex">
          {[...Array(rating)].map((_, i) => (
            <svg
              key={i}
              className="w-5 h-5 text-yellow-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const Testimonials = () => {
  return (
    <div className="bg-[#0B0121] min-h-[50vh] flex items-center text-white py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">
          Trusted by teams at over 1,000 of the world's leading organizations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
