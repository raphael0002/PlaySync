import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy } from "lucide-react";

const CTASection = () => {
  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300cc66' fill-opacity='0.1'%3E%3Cpath d='M20 20c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10zm10 0c0-5.5-4.5-10-10-10s-10 4.5-10 10 4.5 10 10 10 10-4.5 10-10z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Championship Energy Elements */}
      <div className="absolute top-20 left-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-30 animate-pulse" />
      <div
        className="absolute bottom-16 right-1/3 w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full opacity-25 animate-bounce"
        style={{ animationDelay: "1.5s" }}
      />
      <div
        className="absolute top-1/3 left-1/6 w-12 h-12 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full opacity-20 animate-ping"
        style={{ animationDelay: "0.8s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          {/* Championship Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
              type: "spring",
              bounce: 0.4,
            }}
            viewport={{ once: true }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-yellow-500/20 to-orange-600/20 backdrop-blur-md border border-yellow-400/40 rounded-full text-yellow-300 font-black text-lg hover:scale-105 transition-all duration-300 cursor-pointer shadow-2xl"
          >
            <Trophy className="w-6 h-6 mr-3 text-yellow-400 animate-pulse" />
            🏆 JOIN THE CHAMPIONS LEAGUE 🏆
          </motion.div>

          {/* Power Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-black text-white font-poppins leading-tight"
          >
            READY TO{" "}
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
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              DOMINATE?
            </motion.span>
          </motion.h2>

          {/* Championship Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            viewport={{ once: true }}
            className="text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            🚀 Join the elite PlaySync community and
            experience the future of sports turf booking.
            <br className="hidden sm:block" />
            <span className="text-green-400 font-bold">
              Your championship journey starts NOW!
            </span>
          </motion.p>

          {/* Championship CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            viewport={{ once: true }}
            className="pt-8"
          >
            <motion.div
              whileHover={{ scale: 1.1, y: -10 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white px-16 py-8 text-2xl font-black shadow-2xl hover:shadow-green-500/50 transition-all duration-300 group border-2 border-green-400/50 rounded-2xl"
              >
                🏆 START DOMINATING NOW
                <ArrowRight className="ml-4 h-8 w-8 group-hover:translate-x-3 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Championship Features List */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row justify-center items-center gap-12 pt-12 text-gray-300"
          >
            <motion.div
              className="flex items-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <span className="w-4 h-4 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse" />
              <span className="font-bold text-lg group-hover:text-green-400 transition-colors">
                ⚡ Instant Access
              </span>
            </motion.div>
            <motion.div
              className="flex items-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <span className="w-4 h-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mr-3 animate-pulse" />
              <span className="font-bold text-lg group-hover:text-yellow-400 transition-colors">
                🏆 Zero Setup Fees
              </span>
            </motion.div>
            <motion.div
              className="flex items-center group cursor-pointer"
              whileHover={{ scale: 1.1 }}
            >
              <span className="w-4 h-4 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-full mr-3 animate-pulse" />
              <span className="font-bold text-lg group-hover:text-blue-400 transition-colors">
                🚀 Champion Support
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
