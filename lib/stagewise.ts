declare global {
  interface Window {
    Stagewise?: any;
  }
}

export function initializeStagewise() {
  if (typeof window !== 'undefined') {
    // Load the Stagewise script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@stagewise/toolbar/dist/index.umd.js';
    script.async = true;
    script.onload = () => {
      if (window.Stagewise) {
        const toolbar = window.Stagewise.init({
          projectId: 'your-project-id', // Replace with your actual project ID
          environment: process.env.NODE_ENV === 'production' ? 'production' : 'development',
        });
        return toolbar;
      }
    };
    document.head.appendChild(script);
  }
  return null;
}
