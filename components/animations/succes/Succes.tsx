"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

export function SuccessAnimation({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-full p-6 shadow-lg flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ type: "spring", duration: 0.6 }}
          >
            <Check size={48} className="text-green-500 animate-pulse" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
