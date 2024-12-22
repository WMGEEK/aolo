import { useEffect } from "react";

const useResponsiveFontSize = () => {
    useEffect(() => {
        const flexible = (): void => {
            requestAnimationFrame(flexible);

            const pcAspectRatio: number = 1440 / 800; // PC aspect ratio
            const mobileAspectRatio: number = 375 / 812; // Mobile aspect ratio

            const aspectRatio: number = window.innerWidth / window.innerHeight;

            if (window.innerWidth > 0) {
                if (aspectRatio > pcAspectRatio) {
                    document.documentElement.style.fontSize = `calc(100vh / 800 * 10)`;
                } else {
                    document.documentElement.style.fontSize = `calc(100vw / 1440 * 10)`;
                }
            } else {
                if (aspectRatio > mobileAspectRatio) {
                    document.documentElement.style.fontSize = `calc(100vh / 812 * 10)`;
                } else {
                    document.documentElement.style.fontSize = `calc(100vw / 375 * 10)`;
                }
            }
        };

        flexible();
    }, []);
};

export default useResponsiveFontSize;