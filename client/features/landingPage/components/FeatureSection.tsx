import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CreditCard,
  Users,
  Zap,
  Trophy,
  Target,
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      title: "⚡ Lightning Booking",
      description:
        "Reserve your turf in under 15 seconds with our booking system.",
      icon: Zap,
      gradient: "from-yellow-400 to-orange-500",
      bgColor: "bg-yellow-50",
      hoverColor: "hover:shadow-yellow-400/25",
      sport: "🏃‍♂️",
    },
    {
      title: "🔥 Live Match Status",
      description:
        "Real-time availability across all premium venues. See what's hot right now!",
      icon: Users,
      gradient: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
      hoverColor: "hover:shadow-green-400/25",
      sport: "⚽",
    },
    {
      title: "🏆 Champion Payments",
      description:
        "Military-grade secure payments that process faster than your winning goal.",
      icon: CreditCard,
      gradient: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      hoverColor: "hover:shadow-blue-400/25",
      sport: "🏀",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Sport-themed background elements */}
      <div className="absolute top-20 right-20 text-6xl opacity-5 animate-bounce">
        ⚽
      </div>
      <div className="absolute bottom-20 left-20 text-6xl opacity-5 animate-pulse">
        🏀
      </div>
      <div className="absolute top-1/2 left-1/4 text-4xl opacity-5 animate-ping">
        🏆
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Championship Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 rounded-full mb-6"
          >
            <Trophy className="w-6 h-6 text-green-600 mr-2" />
            <span className="text-green-700 font-bold">
              WHY CHAMPIONS CHOOSE US
            </span>
          </motion.div>

          <h2 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 font-poppins">
            GAME-CHANGING{" "}
            <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              FEATURES
            </span>
          </h2>
          <p className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-medium">
            🚀 Experience the most advanced turf booking
            platform built for serious athletes and
            champions like you.
          </p>
        </motion.div>

        {/* Interactive Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.7,
                type: "spring",
                bounce: 0.3,
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              <motion.div
                whileHover={{ y: -10, rotateY: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Card
                  className={`h-full border-0 shadow-xl ${feature.hoverColor} bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative cursor-pointer`}
                >
                  {/* Sport emoji background */}
                  <div className="absolute top-4 right-4  opacity-10 group-hover:opacity-20 transition-opacity text-6xl group-hover:scale-110 transform duration-300">
                    {feature.sport}
                  </div>

                  <CardHeader className="text-center pb-6 relative z-10">
                    <motion.div
                      className={`w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-6 group-hover:scale-125 transition-all duration-300 shadow-2xl`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="h-10 w-10 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-black text-gray-900 font-poppins group-hover:text-green-600 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center relative z-10">
                    <p className="text-gray-600 text-lg leading-relaxed font-medium group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </CardContent>

                  {/* Animated border */}
                  <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-green-400 via-emerald-500 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Championship Speed Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full text-white font-black text-xl shadow-2xl cursor-pointer"
          >
            <Target className="w-6 h-6 mr-3 animate-spin" />
            ⚡ Average booking time: 12 seconds ⚡
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
