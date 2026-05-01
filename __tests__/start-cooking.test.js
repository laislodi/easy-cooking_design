const fs = require('fs');
const path = require('path');

describe('Start Cooking Page', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../start-cooking/index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('HTML Structure Tests', () => {
    test('should have a backdrop element', () => {
      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).not.toBeNull();
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
      expect(links[1].getAttribute('href')).toBe('../customers/index.html');
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

    test('should have a signup page main section', () => {
      const signupPage = document.querySelector('.signup-page');
      expect(signupPage).not.toBeNull();
    });

    test('should have signup title', () => {
      const title = document.querySelector('.signup-title');
      expect(title).not.toBeNull();
      expect(title.textContent).toBe("Awesome! Let's dive right in!");
    });

    test('should have a footer with support and terms links', () => {
      const footer = document.querySelector('.main-footer');
      const footerLinks = document.querySelectorAll('.main-footer__link');

      expect(footer).not.toBeNull();
      expect(footerLinks.length).toBe(2);
    });
  });

  describe('Form Structure Tests', () => {
    test('should have a signup form', () => {
      const form = document.querySelector('.signup-form');
      expect(form).not.toBeNull();
      expect(form.getAttribute('action')).toBe('index.html');
    });

    test('should have title select with Mr. and Ms. options', () => {
      const titleSelect = document.querySelector('#title');
      const options = titleSelect.querySelectorAll('option');

      expect(titleSelect).not.toBeNull();
      expect(options.length).toBe(2);
      expect(options[0].value).toBe('mr');
      expect(options[0].textContent).toBe('Mr.');
      expect(options[1].value).toBe('ms');
      expect(options[1].textContent).toBe('Ms.');
    });

    test('should have title label associated with select', () => {
      const label = document.querySelector('label[for="title"]');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('Title');
    });

    test('should have first name input with label', () => {
      const input = document.querySelector('#first-name');
      const label = document.querySelector('label[for="first-name"]');

      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('First name');
    });

    test('should have last name input with label', () => {
      const input = document.querySelector('#last-name');
      const label = document.querySelector('label[for="last-name"]');

      expect(input).not.toBeNull();
      expect(input.type).toBe('text');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('Last name');
    });

    test('should have email input with label', () => {
      const input = document.querySelector('#email');
      const label = document.querySelector('label[for="email"]');

      expect(input).not.toBeNull();
      expect(input.type).toBe('email');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('E-Mail');
    });

    test('should have password input with label', () => {
      const input = document.querySelector('#password');
      const label = document.querySelector('label[for="password"]');

      expect(input).not.toBeNull();
      expect(input.type).toBe('password');
      expect(label).not.toBeNull();
      expect(label.textContent).toBe('Password');
    });

    test('should have agree terms checkbox with label', () => {
      const checkbox = document.querySelector('#agree-terms');
      const label = document.querySelector('label[for="agree-terms"]');

      expect(checkbox).not.toBeNull();
      expect(checkbox.type).toBe('checkbox');
      expect(label).not.toBeNull();
      expect(label.textContent).toContain('Agree to');
      expect(label.textContent).toContain('Terms & Conditions');
    });

    test('should have terms link inside checkbox label', () => {
      const label = document.querySelector('label[for="agree-terms"]');
      const link = label.querySelector('a');

      expect(link).not.toBeNull();
      expect(link.textContent).toBe('Terms & Conditions');
    });

    test('should have submit button', () => {
      const button = document.querySelector('.signup-form button[type="submit"]');

      expect(button).not.toBeNull();
      expect(button.classList.contains('button')).toBe(true);
      expect(button.textContent).toBe('Sign Up');
    });

    test('form should have all required fields in correct order', () => {
      const form = document.querySelector('.signup-form');
      const inputs = form.querySelectorAll('input, select');

      expect(inputs.length).toBe(6);
      expect(inputs[0].id).toBe('title');
      expect(inputs[1].id).toBe('first-name');
      expect(inputs[2].id).toBe('last-name');
      expect(inputs[3].id).toBe('email');
      expect(inputs[4].id).toBe('password');
      expect(inputs[5].id).toBe('agree-terms');
    });
  });

  describe('Form Content Tests', () => {
    test('title select should default to Mr.', () => {
      const titleSelect = document.querySelector('#title');
      expect(titleSelect.value).toBe('mr');
    });

    test('all text inputs should start empty', () => {
      const firstName = document.querySelector('#first-name');
      const lastName = document.querySelector('#last-name');
      const email = document.querySelector('#email');
      const password = document.querySelector('#password');

      expect(firstName.value).toBe('');
      expect(lastName.value).toBe('');
      expect(email.value).toBe('');
      expect(password.value).toBe('');
    });

    test('agree terms checkbox should start unchecked', () => {
      const checkbox = document.querySelector('#agree-terms');
      expect(checkbox.checked).toBe(false);
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

    test('form inputs should accept user input', () => {
      const firstName = document.querySelector('#first-name');
      const lastName = document.querySelector('#last-name');
      const email = document.querySelector('#email');
      const password = document.querySelector('#password');

      firstName.value = 'John';
      lastName.value = 'Doe';
      email.value = 'john.doe@example.com';
      password.value = 'secretpassword';

      expect(firstName.value).toBe('John');
      expect(lastName.value).toBe('Doe');
      expect(email.value).toBe('john.doe@example.com');
      expect(password.value).toBe('secretpassword');
    });

    test('title select should allow changing selection', () => {
      const titleSelect = document.querySelector('#title');

      expect(titleSelect.value).toBe('mr');

      titleSelect.value = 'ms';
      expect(titleSelect.value).toBe('ms');
    });

    test('checkbox should toggle when clicked', () => {
      const checkbox = document.querySelector('#agree-terms');

      expect(checkbox.checked).toBe(false);

      checkbox.click();
      expect(checkbox.checked).toBe(true);

      checkbox.click();
      expect(checkbox.checked).toBe(false);
    });
  });
});
