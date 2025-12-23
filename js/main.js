// MONDFRID UNIFORMS - Main JavaScript

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });
  }

  // Set active menu item based on current page
  setActiveMenuItem();

  // Contact form handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    handleContactForm(contactForm);
  }
});

// Set active menu item
function setActiveMenuItem() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage || (currentPage === '' && linkPage === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Contact Form Handler
function handleContactForm(form) {
  const formStatus = document.getElementById('formStatus');
  const clearBtn = document.getElementById('clearBtn');

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      form.reset();
      if (formStatus) formStatus.textContent = '';
    });
  }

  function validPhone(v) {
    const digits = v.replace(/\D/g, '');
    return digits.length >= 7 && digits.length <= 15;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (formStatus) formStatus.textContent = 'Sending...';

    const data = new FormData(form);

    // Validation
    if (!data.get('name')) {
      if (formStatus) formStatus.textContent = 'Please enter your name.';
      return;
    }
    if (!validPhone(data.get('phone'))) {
      if (formStatus) formStatus.textContent = 'Please enter a valid phone number.';
      return;
    }

    try {
      // For now, we'll use a simple approach - you can integrate with your backend later
      // Option 1: Send via email (using mailto as fallback)
      const phone = data.get('phone');
      const name = data.get('name');
      const message = data.get('message') || '';
      const quantity = data.get('quantity') || '';
      const uniformType = data.get('uniformType') || '';

      // WhatsApp integration (since phone number is available)
      const whatsappMessage = encodeURIComponent(
        `Hello MONDFRID UNIFORMS,\n\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Quantity: ${quantity}\n` +
        `Uniform Type: ${uniformType}\n` +
        `Message: ${message}`
      );
      
      // Open WhatsApp
      window.open(`https://wa.me/917092628108?text=${whatsappMessage}`, '_blank');

      if (formStatus) {
        formStatus.textContent = 'Redirecting to WhatsApp...';
        formStatus.style.color = 'var(--success)';
      }

      // Reset form after a delay
      setTimeout(() => {
        form.reset();
        if (formStatus) formStatus.textContent = '';
      }, 2000);

    } catch (err) {
      console.error(err);
      if (formStatus) {
        formStatus.textContent = 'Error occurred. Please call +91 70926 28108 directly.';
        formStatus.style.color = 'var(--error)';
      }
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

