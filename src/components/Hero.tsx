export default function Hero() {
    return (
        <section className="relative bg-[#355e93] text-white mt-22 md:mt-8 py-32 px-12 rounded-xl w-full text-center shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-cover bg-center opacity-30" style={{ backgroundImage: "url('/GovFeedsHero.png')" }}></div>
            <div className="relative z-10">
                <h1 className="text-5xl font-extrabold mb-6 tracking-tight">
                    Government Data, Simplified
                </h1>
                <p className="text-xl max-w-3xl mx-auto leading-relaxed">
                    Aggregating official government data sources into one clear, easy-to-use platform.
                </p>
            </div>
        </section>
    )
}