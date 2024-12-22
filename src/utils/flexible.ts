export const flexible = (): void => {
  requestAnimationFrame(flexible);

  // Select all elements with the '.desktop' class
  // const box: NodeListOf<HTMLElement> = document.querySelectorAll('.desktop');

  // Standard aspect ratios for PC and mobile
  const pcAspectRatio: number = 1440 / 800; // PC aspect ratio
  const mobileAspectRatio: number = 375 / 812; // Mobile aspect ratio

  // Current device aspect ratio
  const aspectRatio: number = window.innerWidth / window.innerHeight;

  // Check if the device is a PC or mobile
  if (window.innerWidth > 0) {
    // For PC
    if (aspectRatio > pcAspectRatio) {
      // If width-to-height ratio > standard ratio: adjust based on height
      document.documentElement.style.fontSize = `calc(100vh / 800 * 10)`;
    } else {
      // Otherwise, adjust based on width
      document.documentElement.style.fontSize = `calc(100vw / 1440 * 10)`;
    }
  } else {
    // For mobile
    if (aspectRatio > mobileAspectRatio) {
      // If width-to-height ratio > standard ratio: adjust based on height
      document.documentElement.style.fontSize = `calc(100vh / 812 * 10)`;
    } else {
      // Otherwise, adjust based on width
      document.documentElement.style.fontSize = `calc(100vw / 375 * 10)`;
    }

    // Apply a custom scale for '.desktop' elements on mobile
    // box.forEach((box: HTMLElement) => box.style.setProperty('--scale', '1'));
  }

  // Scale .desktop elements based on the window size
  // box.forEach((box: HTMLElement) => {
  //   let scale: number = 1;
  //   box.style.setProperty('--scale', '1');

  //   const clientWidth: number = box.getBoundingClientRect().width;
  //   const clientHeight: number = box.getBoundingClientRect().height;

  //   if (clientWidth > window.innerWidth) {
  //     scale = window.innerWidth / clientWidth;
  //   }
  //   if (clientHeight > window.innerHeight) {
  //     scale = window.innerHeight / clientHeight;
  //   }

  //   // Set the scale with a fixed decimal precision
  //   box.style.setProperty('--scale', scale.toFixed(5));
  // });
};
