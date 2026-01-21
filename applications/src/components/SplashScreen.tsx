import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface SplashScreenProps {
  onFinish?: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = [
      setTimeout(() => setStep(1), 400),
      setTimeout(() => setStep(2), 1200),
      setTimeout(() => setStep(3), 2000),
      setTimeout(() => setStep(4), 2600),
      setTimeout(() => setStep(5), 3400),
    ];
    return () => t.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onFinish?.();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
      <div className="relative w-[900px] h-[400px] flex items-center justify-center">
        
        <div className="absolute inset-0 bg-white z-10" />

        <AnimatePresence>
          {step <= 2 && (
            <motion.div
              key="oval-base"
              className="absolute bottom-20 left-1/2 -translate-x-1/2 bg-[#F2E9E0] z-20"
              style={{
                width: 620,
                height: 140,
                borderRadius: "70% / 90%",
              }}
              initial={{ scale: 1, opacity: 1, y: 0 }}
              animate={{
                scale: step >= 1 ? 0.6 : 1,
                opacity: step >= 1 ? 0 : 1,
                y: step >= 1 ? 30 : 0,
              }}
              exit={{ scale: 0, opacity: 0, y: 40 }}
              transition={{ duration: 0.65, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        <motion.img
          src="/src/assets/logo-collapse.svg"
          className={`absolute w-44 ${
            step <= 0 ? "z-0" : "z-30"
          }`}
          draggable="false"
          initial={{ y: 120, scale: 0.5, opacity: 0 }}
          animate={{
            y: step === 1 ? -250 : step === 2 ? 40 : step >= 3 ? 0 : 120,
            x: step >= 4 ? -150 : 0,
            opacity: 1,
            scale: 1,
          }}
          transition={{
            type: "spring",
            stiffness: 180,
            damping: 18,
            mass: 0.9,
          }}
        />

        <AnimatePresence>
          {step >= 5 && (
            <div className="absolute left-[50%] translate-x-[-20px] w-[360px] h-[90px] overflow-hidden z-40">
              <motion.div
                className="absolute inset-0 bg-white z-10"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.img
                src="/src/assets/logo-skarpos.png"
                className="w-full z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                draggable="false"
              />
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
