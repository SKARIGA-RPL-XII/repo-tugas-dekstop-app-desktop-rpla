import { useEffect, useState } from "react";
import { runAppLoader } from "../utils/appLoader";
import LoadingBar from "./LoadingBar";
import { motion } from "framer-motion";

export default function AppLoader({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    runAppLoader(setProgress).then(onDone);
  }, []);

  return (
    <motion.div
      className="relative h-screen w-screen flex flex-col items-center justify-center bg-white/50 backdrop-blur-2xl text-black overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <motion.div
        className="absolute inset-0 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      />

      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.img
          src="/src/assets/logo.png"
          draggable="false"
          className="w-full h-24 mb-8"
          initial={{ y: 10 }}
          animate={{ y: [-6, 6, -6] }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <LoadingBar value={progress} />
        </motion.div>

        <motion.p
          className="mt-4 text-xs opacity-60 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          LOADING {progress}%
        </motion.p>
      </motion.div>
    </motion.div>
  );
}
