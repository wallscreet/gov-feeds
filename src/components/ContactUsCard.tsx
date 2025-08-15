import Link from 'next/link';

export default function ContactUs() {
  return (
    <section className="py-12 px-6 bg-white rounded-xl border border-gray-200 shadow-lg w-full max-w-4xl text-center">
      <h2 className="text-2xl font-bold mb-4 text-[#355e93]">Get in Touch</h2>
      <p className="text-[#355e93] mb-6">
        Have questions or ideas? We’d love to hear from you.
      </p>
      <Link href="/contact" className="bg-[#355e93] text-white py-2 px-4 rounded-lg hover:bg-blue-800 inline-block">
        Contact Us
      </Link>
    </section>
  );
}

