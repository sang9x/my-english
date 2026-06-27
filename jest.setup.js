require('@testing-library/jest-dom');

// Mock window.speechSynthesis
if (typeof window !== 'undefined') {
  Object.defineProperty(window, 'speechSynthesis', {
    value: {
      speak: jest.fn(),
      cancel: jest.fn(),
    },
    writable: true,
  });
}
