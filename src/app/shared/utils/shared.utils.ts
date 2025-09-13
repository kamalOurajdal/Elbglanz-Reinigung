export const scrollToId = (id: string): void => {
    const element = document.getElementById(id);
    // Select the header element
    const header = document.querySelector('header');

    if (element && header) {
      // Get the height of the sticky header
      const headerHeight = header.offsetHeight;

      // Calculate the position of the element relative to the top of the document
      const elementPosition =
        element.getBoundingClientRect().top + window.scrollY;

      // Calculate the final position, subtracting the header's height
      const offsetPosition = elementPosition - headerHeight;

      // Use window.scrollTo instead of element.scrollIntoView
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
}