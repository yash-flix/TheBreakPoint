import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useAutoScroll = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top smoothly when route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return null;
};
