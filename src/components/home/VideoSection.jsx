import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react";

const VideoSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const videoRef = useRef(null);
  const sliderRef = useRef(null);

  // Slider content - images only (videos commented out)
  const sliderContent = [
    {
      type: "image",
      src: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/007a00eb13e5b489.jpg?q=80",
      title: "Special Offers",
    },
    {
      type: "image",
      src: "https://cornflowerblue-lion-884998.hostingersite.com/wp-content/uploads/2025/07/2.png",
      title: "Featured Banner 1",
    },
    {
      type: "image",
      src: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/9cb1a4418dfd0451.jpg?q=80",
      title: "Local Services",
    },
    {
      type: "image",
      src: "https://cornflowerblue-lion-884998.hostingersite.com/wp-content/uploads/2025/07/1.png",
      title: "Featured Banner 2",
    },
    {
      type: "image",
      src: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/f5b3f45e2775e6c5.jpeg?q=80",
      title: "Seasonal Offers",
    },
    {
      type: "image",
      src: "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/a2a09b43f88343de.jpeg?q=80",
      title: "Business Directory",
    },
  ];

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    // Auto-slide timer - every 3.2 seconds
    const slideTimer = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
      }
    }, 3200);

    return () => {
      window.removeEventListener("resize", checkMobile);
      clearInterval(slideTimer);
    };
  }, [isPaused, sliderContent.length]);

  // Handle video loading for video slides
  useEffect(() => {
    const currentItem = sliderContent[currentSlide];
    if (currentItem?.type === "video" && videoRef.current) {
      const video = videoRef.current;

      const handleLoadedData = () => setIsLoading(false);
      const handleCanPlay = () => setIsLoading(false);
      const handleWaiting = () => setIsLoading(true);
      const handlePlaying = () => setIsLoading(false);

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("playing", handlePlaying);

      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsLoading(false);
      });

      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("playing", handlePlaying);
      };
    } else if (currentItem?.type === "image") {
      setIsLoading(false);
    }
  }, [currentSlide, sliderContent]);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliderContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + sliderContent.length) % sliderContent.length
    );
  };

  const handleMouseEnter = () => {
    setShowControls(true);
    setIsPaused(true);
  };

  const handleMouseLeave = () => {
    setShowControls(false);
    setIsPaused(false);
  };

  const currentItem = sliderContent[currentSlide];

  return (
    <section className="pt-0 pb-4 lg:pt-1 lg:pb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Slider Container */}
          <div
            ref={sliderRef}
            className="relative w-full h-40 sm:h-56 md:h-64 lg:h-72 bg-black rounded-xl lg:rounded-2xl shadow-xl overflow-hidden"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Current Slide Content */}
            <div className="absolute inset-0 w-full h-full">
              {currentItem?.type === "video" ? (
                <motion.video
                  ref={videoRef}
                  key={currentSlide} // Force re-render for new video
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0 w-full h-full"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: isMobile ? "cover" : "cover",
                    objectPosition: isMobile ? "center center" : "center",
                    transform: isMobile ? "scale(1.2)" : "none",
                  }}
                  muted={isMuted}
                  loop
                  autoPlay
                  playsInline
                  preload="auto"
                  onError={(e) => console.error("Video loading error:", e)}
                >
                  <source src={currentItem.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </motion.video>
              ) : (
                <motion.img
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
                  src={currentItem?.src}
                  alt={currentItem?.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    objectPosition: "center",
                  }}
                  onLoad={() => setIsLoading(false)}
                  onError={(e) => {
                    console.error("Image loading error:", e);
                    setIsLoading(false);
                  }}
                />
              )}
            </div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>

            {/* Navigation Arrows */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-y-0 left-2 flex items-center"
            >
              <button
                onClick={prevSlide}
                className="w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200"
                title="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-y-0 right-2 flex items-center"
            >
              <button
                onClick={nextSlide}
                className="w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200"
                title="Next"
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </motion.div>

            {/* Mute/Unmute Control - Only for videos */}
            {currentItem?.type === "video" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: showControls ? 1 : 0 }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-2 right-2"
              >
                <button
                  onClick={toggleMute}
                  className="w-8 h-8 bg-black bg-opacity-70 hover:bg-opacity-90 rounded-full flex items-center justify-center transition-all duration-200"
                  title={isMuted ? "Unmute" : "Mute"}
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4 text-white" />
                  ) : (
                    <Volume2 className="w-4 h-4 text-white" />
                  )}
                </button>
              </motion.div>
            )}

            {/* Slide Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {sliderContent.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    index === currentSlide
                      ? "bg-white"
                      : "bg-white bg-opacity-50 hover:bg-opacity-75"
                  }`}
                  title={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Decorative Elements - Same as before */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-15 -z-10"></div>
          <div className="absolute top-1 left-1 right-1 bottom-1 bg-black bg-opacity-3 rounded-xl -z-20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
