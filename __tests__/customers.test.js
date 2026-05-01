const fs = require('fs');
const path = require('path');

describe('Customers Page', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../customers/index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('HTML Structure Tests', () => {
    test('should have a backdrop element', () => {
      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).not.toBeNull();
    });

    test('should not have a modal element', () => {
      const modal = document.querySelector('.modal');
      expect(modal).toBeNull();
    });

    test('should have a main header with brand linking to home', () => {
      const header = document.querySelector('.main-header');
      const brand = document.querySelector('.main-header__brand');

      expect(header).not.toBeNull();
      expect(brand).not.toBeNull();
      expect(brand.textContent.trim()).toBe('EasyCooking');
      expect(brand.getAttribute('href')).toBe('../index.html');
    });

    test('should have a toggle button for mobile navigation', () => {
      const toggleButton = document.querySelector('.toggle-button');
      const bars = document.querySelectorAll('.toggle-button__bar');

      expect(toggleButton).not.toBeNull();
      expect(bars.length).toBe(3);
    });

    test('should have main navigation with correct links', () => {
      const navItems = document.querySelectorAll('.main-nav__item');
      const links = document.querySelectorAll('.main-nav__item a');

      expect(navItems.length).toBe(3);
      expect(links[0].getAttribute('href')).toBe('../packages/index.html');
      expect(links[0].textContent).toBe('Packages');
      expect(links[1].getAttribute('href')).toBe('index.html');
      expect(links[1].textContent).toBe('Customers');
      expect(links[2].getAttribute('href')).toBe('../start-cooking/index.html');
      expect(links[2].textContent).toBe('Start Cooking');
    });

    test('should have mobile navigation with correct links', () => {
      const mobileNav = document.querySelector('.mobile-nav');
      const mobileNavItems = document.querySelectorAll('.mobile-nav__item');

      expect(mobileNav).not.toBeNull();
      expect(mobileNavItems.length).toBe(4);
    });

    test('should have mobile nav with Home link', () => {
      const homeLink = document.querySelector('.mobile-nav__item a[href="../index.html"]');
      expect(homeLink).not.toBeNull();
      expect(homeLink.textContent).toBe('Home');
    });

    test('should have a main element', () => {
      const main = document.querySelector('main');
      expect(main).not.toBeNull();
    });

    test('should have a testimonial list', () => {
      const testimonialList = document.querySelector('.testimonial-list');
      expect(testimonialList).not.toBeNull();
    });

    test('should have a footer with support and terms links', () => {
      const footer = document.querySelector('.main-footer');
      const footerLinks = document.querySelectorAll('.main-footer__link');

      expect(footer).not.toBeNull();
      expect(footerLinks.length).toBe(2);
    });
  });

  describe('Testimonial Content Tests', () => {
    test('should have two testimonials', () => {
      const testimonials = document.querySelectorAll('.testimonial');
      expect(testimonials.length).toBe(2);
    });

    test('should have customer 1 - Tom Cling with correct content', () => {
      const customer1 = document.querySelector('#customer-1');
      const name = customer1.querySelector('.testimonial-name');
      const subtitle = customer1.querySelector('.testimonial-subtitle');
      const text = customer1.querySelector('.testimonial-text');
      const businessLink = customer1.querySelector('.testimonial-subtitle a');

      expect(customer1).not.toBeNull();
      expect(name.textContent).toBe('Tom Cling');
      expect(subtitle.textContent).toContain('Owner of');
      expect(businessLink.textContent).toBe('Good Pastry');
      expect(businessLink.getAttribute('href')).toBe('good-pastry.com');
      expect(text.textContent).toContain('EasyCooking helped me');
    });

    test('should have customer 2 - Chris Tomlin with correct content', () => {
      const customer2 = document.querySelector('#customer-2');
      const name = customer2.querySelector('.testimonial-name');
      const subtitle = customer2.querySelector('.testimonial-subtitle');
      const text = customer2.querySelector('.testimonial-text');
      const businessLink = customer2.querySelector('.testimonial-subtitle a');

      expect(customer2).not.toBeNull();
      expect(name.textContent).toBe('Chris Tomlin');
      expect(subtitle.textContent).toContain('Owner of');
      expect(businessLink.textContent).toBe('Good Food');
      expect(businessLink.getAttribute('href')).toBe('good-food.com');
      expect(text.textContent).toContain('EasyCooking helped me');
    });

    test('testimonials should be in correct order', () => {
      const testimonials = document.querySelectorAll('.testimonial');

      expect(testimonials[0].id).toBe('customer-1');
      expect(testimonials[1].id).toBe('customer-2');
    });
  });

  describe('Testimonial Structure Tests', () => {
    test('each testimonial should have an image container', () => {
      const testimonials = document.querySelectorAll('.testimonial');

      testimonials.forEach(testimonial => {
        const imageContainer = testimonial.querySelector('.testimonial-image_container');
        expect(imageContainer).not.toBeNull();
      });
    });

    test('each testimonial should have an image with alt text', () => {
      const testimonials = document.querySelectorAll('.testimonial');

      testimonials.forEach(testimonial => {
        const image = testimonial.querySelector('.testimonial-image');
        expect(image).not.toBeNull();
        expect(image.getAttribute('alt')).not.toBe('');
        expect(image.getAttribute('src')).not.toBe('');
      });
    });

    test('customer 1 image should have correct src and alt', () => {
      const customer1 = document.querySelector('#customer-1');
      const image = customer1.querySelector('.testimonial-image');

      expect(image.getAttribute('src')).toBe('../images/customer-1.jpeg');
      expect(image.getAttribute('alt')).toBe('Tom Cling - Customer');
    });

    test('customer 2 image should have correct src and alt', () => {
      const customer2 = document.querySelector('#customer-2');
      const image = customer2.querySelector('.testimonial-image');

      expect(image.getAttribute('src')).toBe('../images/customer-2.jpg');
      expect(image.getAttribute('alt')).toBe('Chris Tomlin - Customer');
    });

    test('each testimonial should have an info section', () => {
      const testimonials = document.querySelectorAll('.testimonial');

      testimonials.forEach(testimonial => {
        const info = testimonial.querySelector('.testimonial-info');
        expect(info).not.toBeNull();
      });
    });

    test('each testimonial info should have name, subtitle, and text', () => {
      const testimonials = document.querySelectorAll('.testimonial');

      testimonials.forEach(testimonial => {
        const name = testimonial.querySelector('.testimonial-name');
        const subtitle = testimonial.querySelector('.testimonial-subtitle');
        const text = testimonial.querySelector('.testimonial-text');

        expect(name).not.toBeNull();
        expect(subtitle).not.toBeNull();
        expect(text).not.toBeNull();
      });
    });
  });

  describe('JavaScript Interaction Tests', () => {
    beforeEach(() => {
      const sharedJs = fs.readFileSync(path.resolve(__dirname, '../shared.js'), 'utf8');
      eval(sharedJs);
    });

    test('clicking toggle button should open mobile nav and backdrop', () => {
      const toggleButton = document.querySelector('.toggle-button');
      const mobileNav = document.querySelector('.mobile-nav');
      const backdrop = document.querySelector('.backdrop');

      expect(mobileNav.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);

      toggleButton.click();

      expect(mobileNav.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
    });

    test('clicking backdrop should close mobile nav', () => {
      const toggleButton = document.querySelector('.toggle-button');
      const mobileNav = document.querySelector('.mobile-nav');
      const backdrop = document.querySelector('.backdrop');

      toggleButton.click();
      expect(mobileNav.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);

      backdrop.click();

      expect(mobileNav.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);
    });
  });
});
