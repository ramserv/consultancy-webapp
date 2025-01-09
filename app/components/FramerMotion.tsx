import { motion } from "framer-motion";

export const MotionSection = ({ children }: { children: React.ReactNode }) => {
  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
};
