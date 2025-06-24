import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Alex Rodriguez",
      role: "Football Team Captain",
      quote:
        "PlaySync revolutionized how we book our training sessions. Real-time availability is a game-changer!",
      rating: 5,
      avatar: "AR",
      sport: "⚽",
    },
    {
      name: "Sarah Williams",
      role: "Venue Owner",
      quote:
        "Managing bookings has never been easier. PlaySync increased our revenue by 40% in just 3 months!",
      rating: 5,
      avatar: "SW",
      sport: "🏟️",
    },
    {
      name: "Mike Chen",
      role: "Basketball Enthusiast",
      quote:
        "Secure payments and instant confirmations. PlaySync makes booking courts effortless and reliable!",
      rating: 5,
      avatar: "MC",
      sport: "🏀",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 to-yellow-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-10 animate-bounce-light" />
      <div
        className="absolute bottom-20 left-10 w-24 h-24 bg-green-400 rounded-full opacity-10 animate-bounce-light"
        style={{ animationDelay: "1s" }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-poppins">
            Loved by{" "}
            <span className="bg-gradient-to-r from-green-600 to-yellow-500 bg-clip-text text-transparent">
              Athletes
            </span>{" "}
            Worldwide
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of players and venue owners who
            trust PlaySync for their sporting needs.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.2,
                duration: 0.6,
              }}
              viewport={{ once: true }}
              className="group"
            >
              <Card className="h-full border-0 shadow-xl hover-lift bg-white/90 backdrop-blur-sm relative overflow-hidden">
                {/* Sport Icon */}
                <div className="absolute top-4 right-4 text-2xl opacity-20 group-hover:opacity-40 transition-opacity">
                  {testimonial.sport}
                </div>

                <CardContent className="p-8">
                  {/* Rating Stars */}
                  <div className="flex items-center mb-6">
                    {Array(testimonial.rating)
                      .fill(0)
                      .map((_, i) => (
                        <Star
                          key={i}
                          className="h-5 w-5 text-yellow-400 fill-current"
                        />
                      ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-gray-700 text-lg leading-relaxed mb-6 italic relative">
                    <span className="text-4xl text-green-500 absolute -top-2 -left-2 opacity-30">
                      {'"'}
                    </span>
                    {testimonial.quote}
                    <span className="text-4xl text-green-500 opacity-30">
                      {'"'}
                    </span>
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center">
                    <div className="w-12 h-12 rounded-full sport-gradient flex items-center justify-center text-white font-bold mr-4">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 font-poppins">
                        {testimonial.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-16 flex flex-wrap justify-center items-center gap-8 text-center"
        >
          <div className="flex items-center space-x-2 text-gray-600">
            <Star className="h-5 w-5 text-yellow-400 fill-current" />
            <span className="font-semibold">4.9/5</span>
            <span>Average Rating</span>
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-300" />
          <div className="text-gray-600">
            <span className="font-semibold">10,000+</span>{" "}
            Reviews
          </div>
          <div className="hidden sm:block w-px h-6 bg-gray-300" />
          <div className="text-gray-600">
            <span className="font-semibold">99.9%</span>{" "}
            Uptime
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
