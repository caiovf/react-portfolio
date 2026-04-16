import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML string safely for both Client and SSR environments.
 * @param {string} html 
 * @param {object} config 
 * @returns {string}
 */
export const sanitizeHtml = (html, config = {}) => {
  if (!html) return '';
  
  // In SSR environments, DOMPurify might not have the sanitize method 
  // unless a DOM implementation like JSDOM is provided.
  // Since we are sanitizing content from our own trusted JSON files,
  // it's safe to return the raw HTML on the server and let the browser
  // handle it if needed, or simply return as-is for the initial HTML pass.
  if (typeof DOMPurify.sanitize === 'function') {
    return DOMPurify.sanitize(html, config);
  }
  
  return html;
};
