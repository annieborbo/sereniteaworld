/**
 * Serenitea Theme JS
 * Handles: scroll header, product gallery, intersection observer animations
 */

(function() {
  'use strict';

  /* ---------- Sticky Header scroll effect ---------- */
  var header = document.getElementById('site-header');
  if (header) {
    var onScroll = function() {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Product image gallery ---------- */
  var slides = document.querySelectorAll('.product-image-slide');
  var thumbs = document.querySelectorAll('.product-thumb');

  if (thumbs.length > 0) {
    thumbs.forEach(function(thumb) {
      thumb.addEventListener('click', function() {
        var index = parseInt(this.getAttribute('data-index'), 10);

        slides.forEach(function(s) { s.classList.remove('active'); });
        thumbs.forEach(function(t) { t.classList.remove('active'); });

        if (slides[index]) slides[index].classList.add('active');
        this.classList.add('active');
      });
    });
  }

  /* ---------- Intersection Observer for animations ---------- */
  if ('IntersectionObserver' in window) {
    var animatedEls = document.querySelectorAll('.animate-fade-up, .animate-fade-in');

    // Hide initially
    animatedEls.forEach(function(el) {
      el.style.opacity = '0';
    });

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedEls.forEach(function(el) {
      observer.observe(el);
    });
  }

  /* ---------- Smooth scroll for anchor links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

})();
