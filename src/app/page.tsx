"use client"
import { Ripple } from "@/components/magicui/ripple";
import { AuroraText } from "@/components/magicui/aurora-text";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { useRouter } from "next/navigation";
import { RetroGrid } from "@/components/magicui/retro-grid";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  function handleSignup() {
    router.push('/signup')
  }
  return (
    <div className="min-h-screen w-full bg-[#000000] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 z-[1]">
        <RetroGrid 
          className="opacity-20"
          angle={45}
          cellSize={40}
          lightLineColor="white"
          darkLineColor="white"
        />
        <Ripple 
          color="white"
          mainCircleSize={400}
          mainCircleOpacity={0.15}
          numCircles={6}
          className="w-full h-full"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-[2] min-h-screen flex flex-col">
        {/* Hero Section */}
        <section className="flex-1 flex flex-col items-center justify-center px-4 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <AuroraText className="text-8xl font-bold mb-6">WEBSITE B</AuroraText>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
              Experience the future of web design with our innovative platform. 
              Join us in creating something extraordinary.
            </h2>
            <ShimmerButton 
              onClick={handleSignup} 
              className="text-lg px-8 py-4"
              shimmerColor="#FF0080"
            >
              Get Started Now
            </ShimmerButton>
          </motion.div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Innovative Design",
                description: "Cutting-edge UI components that make your website stand out"
              },
              {
                title: "Lightning Fast",
                description: "Optimized performance for the best user experience"
              },
              {
                title: "Modern Stack",
                description: "Built with the latest technologies for future-proof solutions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:border-white/20 transition-colors"
              >
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

