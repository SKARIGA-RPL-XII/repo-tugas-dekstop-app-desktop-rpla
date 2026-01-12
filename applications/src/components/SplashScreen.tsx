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
        {/* Ini portal e ta komentar soale masih salah */}

        {/* <AnimatePresence>
          {step <= 2 && (
            <motion.div
              className="absolute w-[620px] h-[140px] rounded-full bg-[#E5D9C8] bottom-32 left-1/2 -translate-x-1/2 z-20"
              initial={{ scaleY: 0, y: 100 }}
              animate={{ scaleY: 1, y: 0 }}
              exit={{ scaleY: 0, y: 100 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            />
          )}
        </AnimatePresence> */}

        <motion.img
          src="/src/assets/logo-collapse.svg"
          className="absolute w-44 z-10"
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
            <div className="absolute left-[50%] translate-x-[-20px] w-[360px] h-[90px] overflow-hidden">
              <motion.div
                className="absolute inset-0 bg-white z-20"
                initial={{ x: 0 }}
                animate={{ x: "100%" }}
                transition={{ duration: 0.9, ease: "easeInOut" }}
              />
              <motion.img
                src="/src/assets/logo-skarpos.png"
                className="w-full"
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
