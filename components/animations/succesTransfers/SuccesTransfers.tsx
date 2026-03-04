"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";

type SuccessAnimationProps = {
  show: boolean;
  onClose?: () => void;
};

export function SuccesTransfers({ show, onClose }: SuccessAnimationProps) {
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
            className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow-lg max-w-sm"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <motion.div
              className="bg-green-500 rounded-full p-4 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <Check size={48} className="text-white" />
            </motion.div>

            <motion.h2
              className="text-xl font-bold mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Virement effectué
            </motion.h2>

            <motion.p
              className="text-gray-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Votre virement a été réalisé avec succès.
            </motion.p>

            <motion.button
              onClick={onClose}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              OK
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
