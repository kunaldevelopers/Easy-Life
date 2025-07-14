import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const VideoSection = () => {
  const [isMuted, setIsMuted] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      // Handle video loading events
      const handleLoadedData = () => {
        setIsLoading(false);
      };

      const handleCanPlay = () => {
        setIsLoading(false);
      };

      const handleWaiting = () => {
        setIsLoading(true);
      };

      const handlePlaying = () => {
        setIsLoading(false);
      };

      video.addEventListener("loadeddata", handleLoadedData);
      video.addEventListener("canplay", handleCanPlay);
      video.addEventListener("waiting", handleWaiting);
      video.addEventListener("playing", handlePlaying);

      // Ensure video plays automatically and continuously
      video.play().catch((error) => {
        console.log("Autoplay prevented:", error);
        setIsLoading(false);
      });

      // Cleanup event listeners
      return () => {
        video.removeEventListener("loadeddata", handleLoadedData);
        video.removeEventListener("canplay", handleCanPlay);
        video.removeEventListener("waiting", handleWaiting);
        video.removeEventListener("playing", handlePlaying);
      };
    }
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="py-4 lg:py-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Video Container - Reduced Height */}
          <div
            className="relative w-full h-48 sm:h-56 md:h-64 lg:h-72 bg-black rounded-xl lg:rounded-2xl shadow-xl overflow-hidden"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
          >
            {/* Video Element */}
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted={isMuted}
              loop
              autoPlay
              playsInline
              preload="auto"
              onError={(e) => console.error("Video loading error:", e)}
              poster="https://marketingmind.in/wp-content/uploads/2020/07/Bisleri.png"
            >
              <source
                src="https://memolatest.com/wp-content/uploads/2025/07/%E2%80%98Samajhdaar-Jaante-Hain-Har-Paani-Ki-Bottle-Bisleri-Nahin-Hindi-30-Sec-Bisleri-India-720p-h264.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Video Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-10"></div>

            {/* Mute/Unmute Control - Only Option */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: showControls ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-2 right-2"
            >
              {/* Mute/Unmute Button */}
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

            {/* Loading Indicator - Fixed Logic */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
          </div>

          {/* Decorative Elements - Reduced */}
          <div className="absolute -inset-2 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl opacity-15 -z-10"></div>

          {/* Additional Shadow Layer - Reduced */}
          <div className="absolute top-1 left-1 right-1 bottom-1 bg-black bg-opacity-3 rounded-xl -z-20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoSection;
