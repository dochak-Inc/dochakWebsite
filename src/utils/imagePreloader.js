import React from 'react';

// Image preloader utility to cache images and prevent repeated loading
class ImagePreloader {
  constructor() {
    this.cache = new Map();
    this.loadingPromises = new Map();
  }

  // Preload a single image
  preloadImage(src) {
    // Return cached promise if already loading/loaded
    if (this.loadingPromises.has(src)) {
      return this.loadingPromises.get(src);
    }

    // Return resolved promise if already cached
    if (this.cache.has(src)) {
      return Promise.resolve(this.cache.get(src));
    }

    // Create new loading promise
    const loadingPromise = new Promise((resolve, reject) => {
      const img = new Image();
      
      img.onload = () => {
        this.cache.set(src, img);
        this.loadingPromises.delete(src);
        resolve(img);
      };
      
      img.onerror = (error) => {
        this.loadingPromises.delete(src);
        reject(error);
      };
      
      // Set crossOrigin for better caching
      img.crossOrigin = 'anonymous';
      img.src = src;
    });

    this.loadingPromises.set(src, loadingPromise);
    return loadingPromise;
  }

  // Preload multiple images
  preloadImages(srcArray) {
    return Promise.all(srcArray.map(src => this.preloadImage(src)));
  }

  // Check if image is cached
  isCached(src) {
    return this.cache.has(src);
  }

  // Get cached image
  getCached(src) {
    return this.cache.get(src);
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
    this.loadingPromises.clear();
  }
}

// Create singleton instance
const imagePreloader = new ImagePreloader();

export default imagePreloader;

// React hook for image preloading
export const useImagePreloader = (images) => {
  const [loadingStates, setLoadingStates] = React.useState({});
  const [errors, setErrors] = React.useState({});

  React.useEffect(() => {
    if (!images || images.length === 0) return;

    const imageArray = Array.isArray(images) ? images : [images];
    
    // Initialize loading states
    const initialStates = {};
    imageArray.forEach(src => {
      initialStates[src] = imagePreloader.isCached(src) ? 'loaded' : 'loading';
    });
    setLoadingStates(initialStates);

    // Preload images
    const preloadPromises = imageArray.map(src => 
      imagePreloader.preloadImage(src)
        .then(() => {
          setLoadingStates(prev => ({ ...prev, [src]: 'loaded' }));
          setErrors(prev => ({ ...prev, [src]: null }));
        })
        .catch(error => {
          setLoadingStates(prev => ({ ...prev, [src]: 'error' }));
          setErrors(prev => ({ ...prev, [src]: error }));
        })
    );

    return () => {
      // Cleanup if component unmounts during loading
      preloadPromises.forEach(promise => {
        if (promise && typeof promise.cancel === 'function') {
          promise.cancel();
        }
      });
    };
  }, [images]);

  return { loadingStates, errors };
};