// speed-insights.js — Vercel Speed Insights initialization
// This module loads and initializes Vercel Speed Insights for performance tracking.
// Speed Insights automatically tracks web vitals and other performance metrics.
// No data is tracked in development mode.

(function () {
  'use strict';

  // Only initialize in production (when deployed on Vercel)
  // The script will automatically detect the environment
  if (typeof window === 'undefined') {
    return;
  }

  // Initialize the Speed Insights queue
  function initQueue() {
    if (window.si) return;
    window.si = function (...params) {
      window.siq = window.siq || [];
      window.siq.push(params);
    };
  }

  // Detect if we're in development mode
  function isDevelopment() {
    try {
      // Check various development indicators
      if (window.location.hostname === 'localhost' ||
          window.location.hostname === '127.0.0.1' ||
          window.location.hostname.includes('local')) {
        return true;
      }
    } catch (_e) {
      // ignore
    }
    return false;
  }

  // Inject the Speed Insights script
  function injectSpeedInsights() {
    initQueue();

    // Determine the script source
    const isDev = isDevelopment();
    const scriptSrc = isDev
      ? 'https://va.vercel-scripts.com/v1/speed-insights/script.debug.js'
      : '/_vercel/speed-insights/script.js';

    // Check if script is already loaded
    if (document.head.querySelector(`script[src*="${scriptSrc}"]`)) {
      return;
    }

    // Create and configure the script element
    const script = document.createElement('script');
    script.src = scriptSrc;
    script.defer = true;

    // Add SDK identification
    script.dataset.sdkn = '@vercel/speed-insights';
    script.dataset.sdkv = '2.0.0';

    // Handle script load errors
    script.onerror = function () {
      console.log(
        `[Vercel Speed Insights] Failed to load script from ${scriptSrc}. ` +
        'Please check if any content blockers are enabled and try again.'
      );
    };

    // Inject the script into the page
    document.head.appendChild(script);

    if (isDev) {
      console.log('[Vercel Speed Insights] Initialized in debug mode');
    }
  }

  // Initialize Speed Insights when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', injectSpeedInsights);
  } else {
    injectSpeedInsights();
  }
})();
