import React from "react";

export default function ContactUs() {
  return (
    <section className="py-12 px-6 rounded-xl border border-gray-200 shadow-lg w-full max-w-3xl text-center">
      <h2 className="text-2xl font-bold mb-4 text-slate-600">Get in Touch</h2>
      <p className="text-gray-700 mb-6">
        Have questions or ideas? We’d love to hear from you.
      </p>
      <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-800">
        Contact Us
      </button>
    </section>
  );
}
