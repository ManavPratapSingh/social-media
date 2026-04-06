import { motion } from "framer-motion";

const Wave = ({ color, duration, delay, opacity, scaleX = 1, scaleY = 1, xOffset = ["-20%", "0%", "-20%"] }) => (
  <motion.svg
    viewBox="0 0 1000 100"
    preserveAspectRatio="none"
    className="absolute w-[200%] h-full left-[-50%]"
    initial={{ x: "-10%", y: "10%" }}
    animate={{ 
      x: xOffset, 
      y: ["5%", "-5%", "5%"] 
    }}
    transition={{
      duration: duration,
      repeat: Infinity,
      ease: "easeInOut",
      delay: delay
    }}
    style={{ opacity, scaleX, scaleY }}
  >
    <path
      d="M0,50 C150,0 350,0 500,50 C650,100 850,100 1000,50 L1000,100 L0,100 Z"
      fill={color}
    />
  </motion.svg>
);

export default function SimpleWaves() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[var(--color-bg)]">
      {/* Wave Layers */}
      <div className="absolute bottom-0 left-0 w-full h-[60vh]">
        {/* Layer 1: Secondary Color - Normal Orientation */}
        <Wave 
          color="var(--color-secondary)" 
          duration={18} 
          delay={0} 
          opacity={0.3} 
          scaleY={1.5} 
          xOffset={["-15%", "5%", "-15%"]}
        />
        
        {/* Layer 2: Primary Color - Flipped Horizontally for contrast */}
        <Wave 
          color="var(--color-primary)" 
          duration={25} 
          delay={-4} 
          opacity={0.25} 
          scaleX={-1} 
          scaleY={1.8} 
          xOffset={["-5%", "-25%", "-5%"]}
        />
        
        {/* Layer 3: Light Primary - Different Phase and Range */}
        <Wave 
          color="var(--color-primary-light)" 
          duration={15} 
          delay={-8} 
          opacity={0.2} 
          scaleY={1.2} 
          xOffset={["-25%", "0%", "-25%"]}
        />
      </div>

      {/* Decorative Radial Overlay for smooth blending */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,transparent_0%,var(--color-bg)_80%)]" />
    </div>
  );
}