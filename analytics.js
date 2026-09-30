// Vercel Web Analytics - Static Site Implementation
// This script initializes Vercel Web Analytics for the static HTML site

(function() {
  'use strict';
  
  // Initialize the analytics queue
  if (!window.va) {
    window.va = function() {
      (window.vaq = window.vaq || []).push(arguments);
    };
  }
  
  // Detect environment
  var mode = 'production'; // Static sites are always production when deployed
  window.vam = mode;
  
  // Get the script source
  var scriptSrc = '/_vercel/insights/script.js';
  
  // Check if script is already loaded
  if (document.head.querySelector('script[src*="' + scriptSrc + '"]')) {
    return;
  }
  
  // Create and inject the analytics script
  var script = document.createElement('script');
  script.src = scriptSrc;
  script.defer = true;
  script.setAttribute('data-mode', mode);
  
  script.onerror = function() {
    console.log(
      '[Vercel Web Analytics] Failed to load script. ' +
      'Please enable Web Analytics in your Vercel project dashboard.'
    );
  };
  
  document.head.appendChild(script);
})();
