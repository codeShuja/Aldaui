import { useState, useEffect } from "react";

const Carousel = ({ images }: { images: string[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fadeClass, setFadeClass] = useState("opacity-100");

    useEffect(() => {
        const interval = setInterval(() => {
            setFadeClass("opacity-0");

            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
                setFadeClass("opacity-100");
            });
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10"></div>

            <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
                <img
                    src={images[currentIndex]}
                    alt="Carousel Image"
                    className={`w-full h-screen object-cover transition-opacity duration-1000 ${fadeClass}`}
                />
            </div>

            <div className="absolute inset-0 flex justify-center items-center z-20">
                <div className="text-center text-white px-4 md:px-8 max-w-lg">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-shadow-md">
                        Explore the Wonders of Nature
                    </h2>
                    <p className="text-lg mb-6">
                        Embark on unforgettable journeys through stunning landscapes and connect with the beauty of the world.
                    </p>
                    <button className="px-6 py-2 bg-blue-600 text-white rounded-full text-lg hover:bg-blue-700 transition-all">
                        Start Your Adventure
                    </button>
                </div>

            </div>
        </div>
    );
};

export default Carousel;
