import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight, Zap } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] py-5  flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300cc66' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Energetic Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-30 animate-pulse" />
      <div
        className="absolute bottom-32 right-16 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "1s" }}
      />
      <div
        className="absolute top-1/3 right-1/4 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-ping"
        style={{ animationDelay: "2s" }}
      />
      <div
        className="absolute bottom-1/4 left-1/3 w-8 h-8 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-30 animate-bounce"
        style={{ animationDelay: "0.5s" }}
      />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* Dynamic Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-600/20 backdrop-blur-md border border-green-400/30 rounded-full text-green-300 font-bold text-sm hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-green-500/25"
          >
            <Zap className="w-5 h-5 mr-2 text-yellow-400 animate-pulse" />
            ⚡ #1 Sports Turf Platform ⚡
          </motion.div>

          {/* Power-packed Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-black text-white leading-tight font-poppins"
          >
            DOMINATE{" "}
            <motion.span
              className="bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: [
                  "0% 50%",
                  "100% 50%",
                  "0% 50%",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              THE GAME
            </motion.span>
          </motion.h1>

          {/* Energetic Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            🏆 Book premium sports turfs instantly •
            Real-time availability • Lightning-fast payments
            <br className="hidden sm:block" />
            <span className="text-green-400 font-bold">
              Your victory starts here!
            </span>
          </motion.p>

          {/* Action-packed CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-6 pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-12 py-6 text-xl font-bold shadow-2xl hover:shadow-green-500/40 transition-all duration-300 group border-2 border-green-400/50 rounded-xl"
              >
                🚀 START WINNING NOW
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-yellow-400/60 text-yellow-300 hover:text-white hover:bg-yellow-400/10 backdrop-blur-sm px-12 py-6 text-xl font-bold group rounded-xl hover:border-yellow-300 transition-all duration-300"
              >
                <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform text-yellow-400" />
                🎯 SEE THE ACTION
              </Button>
            </motion.div>
          </motion.div>

          {/* Championship Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.8 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-16"
          >
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-black text-green-400 font-poppins group-hover:text-green-300 transition-colors">
                50K+
              </div>
              <div className="text-gray-300 font-semibold">
                Champions Playing
              </div>
            </motion.div>
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-black text-yellow-400 font-poppins group-hover:text-yellow-300 transition-colors">
                200+
              </div>
              <div className="text-gray-300 font-semibold">
                Elite Venues
              </div>
            </motion.div>
            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-400 to-transparent" />
            <motion.div
              className="text-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <div className="text-4xl font-black text-cyan-400 font-poppins group-hover:text-cyan-300 transition-colors">
                24/7
              </div>
              <div className="text-gray-300 font-semibold">
                Game Support
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
