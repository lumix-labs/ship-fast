document.addEventListener('DOMContentLoaded', function() {
  // Get all forms
  const betaForm = document.getElementById('demo-form'); // Keeping the ID but changing the purpose
  const newsletterForm = document.getElementById('newsletter-form');
  
  // N8n webhook URL - replace this with your actual n8n webhook URL
  const N8N_WEBHOOK_URL = 'https://prasannak.app.n8n.cloud/webhook-test/demo-request';
  
  // Handle beta registration form submission
  if (betaForm) {
    betaForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const name = document.getElementById('demo-name').value;
      const company = document.getElementById('demo-company').value;
      const email = document.getElementById('demo-email').value;
      const teamSize = document.getElementById('demo-team-size').value;
      
      // Show loading state
      const submitButton = betaForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Submitting...';
      
      // Remove any existing error messages
      const existingError = betaForm.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Send data to n8n webhook
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          company: company,
          email: email,
          teamSize: teamSize,
          formType: 'beta',
          source: window.location.href,
          timestamp: new Date().toISOString()
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        betaForm.innerHTML = '<div class="success-message"><h3>Thank you for joining our beta!</h3><p>We\'ll notify you when beta access becomes available. We\'re currently building in public and will keep you updated on our progress.</p></div>';
        
        // Track form submission event (if analytics is set up)
        if (typeof gtag === 'function') {
          gtag('event', 'beta_registration', {
            'event_category': 'form',
            'event_label': 'beta_access',
            'product_focus': 'bigtech_capabilities'
          });
        }
      })
      .catch(error => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'There was an error submitting your request. Please try again or contact us directly.';
        betaForm.prepend(errorDiv);
        
        // Log error
        console.error('Error:', error);
      });
    });
  }
  
  // Handle newsletter form submission
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const email = newsletterForm.querySelector('input[type="email"]').value;
      
      // Show loading state
      const submitButton = newsletterForm.querySelector('button[type="submit"]');
      const originalButtonText = submitButton.textContent;
      submitButton.disabled = true;
      submitButton.textContent = 'Subscribing...';
      
      // Remove any existing error messages
      const existingError = newsletterForm.querySelector('.error-message');
      if (existingError) {
        existingError.remove();
      }
      
      // Send data to n8n webhook
      fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          formType: 'newsletter',
          source: window.location.href,
          timestamp: new Date().toISOString()
        })
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Show success message
        const formContainer = newsletterForm.parentElement;
        newsletterForm.remove();
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<p>Thanks for subscribing! We\'ll send you weekly updates on our build journey.</p>';
        formContainer.appendChild(successMessage);
        
        // Track form submission event (if analytics is set up)
        if (typeof gtag === 'function') {
          gtag('event', 'newsletter_subscription', {
            'event_category': 'form',
            'event_label': 'build_journey'
          });
        }
      })
      .catch(error => {
        // Reset button
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
        
        // Show error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = 'There was an error subscribing you. Please try again or contact us directly.';
        newsletterForm.prepend(errorDiv);
        
        // Log error
        console.error('Error:', error);
      });
    });
  }
});
