export const handleMouseMove = (e: React.MouseEvent, id: string): void => {
  const { clientX, clientY } = e;
  const card = document.getElementById(id);
  if (card) {
    const { left, top, width, height } = card.getBoundingClientRect();
    const mouseX = clientX - left;
    const mouseY = clientY - top;
    const rotationX = 5 - (10 * mouseY) / height;
    const rotationY = (10 * mouseX) / width - 5;
    card.style.transform = `perspective(1000px) rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
  }
};

export const handleMouseLeave = (e: React.MouseEvent, id: string): void => {
  const card = document.getElementById(id);
  if (card) {
    card.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  }
};

export const transition = { type: "spring", duration: 0.8 };

export const slideAnimation = (direction: any) => {
  return {
    initial: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      opacity: 0,
      transition: { ...transition, delay: 0.5 },
    },
    animate: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: { ...transition, delay: 0 },
    },
    exit: {
      x: direction === "left" ? -100 : direction === "right" ? 100 : 0,
      y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
      transition: { ...transition, delay: 0 },
    },
  };
};

export const fadeAnimation = {
  initial: {
    opacity: 0,
    transition: { ...transition, delay: 0.5 },
  },
  animate: {
    opacity: 1,
    transition: { ...transition, delay: 0 },
  },
  exit: {
    opacity: 0,
    transition: { ...transition, delay: 0 },
  },
};

export const headTextAnimation = {
  initial: { x: 100, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 5,
    stiffness: 40,
    restDelta: 0.001,
    duration: 0.3,
  },
};

export const headContentAnimation = {
  initial: { y: 100, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: {
    type: "spring",
    damping: 7,
    stiffness: 30,
    restDelta: 0.001,
    duration: 0.6,
    delay: 0.2,
    delayChildren: 0.2,
  },
};

export const headContainerAnimation = {
  initial: { x: -100, opacity: 0, transition: { ...transition, delay: 0.5 } },
  animate: { x: 0, opacity: 1, transition: { ...transition, delay: 0 } },
  exit: { x: -100, opacity: 0, transition: { ...transition, delay: 0 } },
};

export const popupVariants = {
  hidden: {
    y: "100%", // Start the popup below the viewport
    opacity: 0,
    transition: {
      duration: 0.5, // Slower animation
      type: "spring", // Transition type
      damping: 20, // Adjust damping and stiffness for the desired effect
      stiffness: 200,
    },
  },
  visible: {
    y: "0%", // Bring the popup to its original position
    opacity: 1,
    transition: {
      duration: 0.01, // Slower animation
      type: "spring", // Transition type
      damping: 20, // Adjust damping and stiffness for the desired effect
      stiffness: 200,
    },
  },
};

export const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export const scaleOnHover = {
  scale: 1.1,
  transition: { duration: 0.3 },
};

export const stagger = {
  visible: { transition: { staggerChildren: 0.4 } },
};

export const textVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
};
