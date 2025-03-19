import '@testing-library/jest-dom';

// Mock ResizeObserver which is required for charts
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}; 