"use client";

import Footer from "@/components/shared/Footer";
import Navigation from "@/features/landingPage/components/Navigation";
import HeroSection from "@/features/landingPage/components/HeroSection";
import FeaturesSection from "@/features/landingPage/components/FeatureSection";
import TestimonialsSection from "@/features/landingPage/components/TestimonialsSection";
import CTASection from "@/features/landingPage/components/CTASection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </div>
  );
}
