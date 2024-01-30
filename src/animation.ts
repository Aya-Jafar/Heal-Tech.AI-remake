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
