export const scrollToElement = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    const offsetTop = element.offsetTop - 90;

    // Adjust scrolling behavior for the page
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });
  }
};
