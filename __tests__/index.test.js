const fs = require('fs');
const path = require('path');

describe('Index Page', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../index.html'), 'utf8');
    document.documentElement.innerHTML = html;
  });

  describe('HTML Structure Tests', () => {
    test('should have a backdrop element', () => {
      const backdrop = document.querySelector('.backdrop');
      expect(backdrop).not.toBeNull();
    });

    test('should have a modal with title and action buttons', () => {
      const modal = document.querySelector('.modal');
      const modalTitle = document.querySelector('.modal-title');
      const yesButton = document.querySelector('.modal-action[href]');
      const noButton = document.querySelector('.modal-action__negative');

      expect(modal).not.toBeNull();
      expect(modalTitle).not.toBeNull();
      expect(modalTitle.textContent).toBe('Do you want to continue?');
      expect(yesButton).not.toBeNull();
      expect(noButton).not.toBeNull();
    });

    test('should have a main header with brand and navigation', () => {
      const header = document.querySelector('.main-header');
      const brand = document.querySelector('.main-header__brand');
      const mainNav = document.querySelector('.main-nav');

      expect(header).not.toBeNull();
      expect(brand).not.toBeNull();
      expect(brand.textContent.trim()).toBe('EasyCooking');
      expect(mainNav).not.toBeNull();
    });

    test('should have a toggle button for mobile navigation', () => {
      const toggleButton = document.querySelector('.toggle-button');
      const bars = document.querySelectorAll('.toggle-button__bar');

      expect(toggleButton).not.toBeNull();
      expect(bars.length).toBe(3);
    });

    test('should have mobile navigation with correct links', () => {
      const mobileNav = document.querySelector('.mobile-nav');
      const mobileNavItems = document.querySelectorAll('.mobile-nav__item');

      expect(mobileNav).not.toBeNull();
      expect(mobileNavItems.length).toBe(4);
    });

    test('should have main navigation with correct links', () => {
      const navItems = document.querySelectorAll('.main-nav__item');
      const links = document.querySelectorAll('.main-nav__item a');

      expect(navItems.length).toBe(3);
      expect(links[0].getAttribute('href')).toBe('packages/index.html');
      expect(links[1].getAttribute('href')).toBe('customers/index.html');
      expect(links[2].getAttribute('href')).toBe('start-cooking/index.html');
    });

    test('should have a footer with support and terms links', () => {
      const footer = document.querySelector('.main-footer');
      const footerLinks = document.querySelectorAll('.main-footer__link');

      expect(footer).not.toBeNull();
      expect(footerLinks.length).toBe(2);
    });

    test('should have product overview section', () => {
      const productOverview = document.querySelector('#product-overview');
      const heading = productOverview.querySelector('h1');

      expect(productOverview).not.toBeNull();
      expect(heading.textContent).toBe('Eat the food you deserve.');
    });

    test('should have key features section with three features', () => {
      const keyFeatures = document.querySelector('#key-features');
      const featureItems = document.querySelectorAll('.key-feature');

      expect(keyFeatures).not.toBeNull();
      expect(featureItems.length).toBe(3);
    });
  });

  describe('Plan Content Tests', () => {
    test('should have three plan articles', () => {
      const plans = document.querySelectorAll('.plan');
      expect(plans.length).toBe(3);
    });

    test('should have FREE plan with correct content', () => {
      const plans = document.querySelectorAll('.plan');
      const freePlan = plans[0];

      const title = freePlan.querySelector('.plan-title');
      const price = freePlan.querySelector('.plan-price');
      const features = freePlan.querySelectorAll('.plan-feature');

      expect(title.textContent).toBe('FREE');
      expect(price.textContent).toBe('$0/month');
      expect(features.length).toBe(4);
      expect(features[0].textContent).toBe('50 recipes');
    });

    test('should have PLUS plan with correct content and highlighted', () => {
      const plans = document.querySelectorAll('.plan');
      const plusPlan = plans[1];

      const title = plusPlan.querySelector('.plan-title');
      const price = plusPlan.querySelector('.plan-price');
      const features = plusPlan.querySelectorAll('.plan-feature');
      const recommendedLabel = plusPlan.querySelector('.plan-title__highlighted');

      expect(plusPlan.classList.contains('plan__highlighted')).toBe(true);
      expect(recommendedLabel.textContent).toBe('RECOMMENDED');
      expect(title.textContent).toBe('PLUS');
      expect(price.textContent).toBe('$29/month');
      expect(features.length).toBe(4);
      expect(features[0].textContent).toBe('300 recipes');
    });

    test('should have PREMIUM plan with correct content', () => {
      const plans = document.querySelectorAll('.plan');
      const premiumPlan = plans[2];

      const title = premiumPlan.querySelector('.plan-title');
      const price = premiumPlan.querySelector('.plan-price');
      const features = premiumPlan.querySelectorAll('.plan-feature');

      expect(title.textContent).toBe('PREMIUM');
      expect(price.textContent).toBe('$99/month');
      expect(features.length).toBe(4);
      expect(features[0].textContent).toBe('All 500+ recipes');
    });

    test('each plan should have a CHOOSE PLAN button', () => {
      const planButtons = document.querySelectorAll('.plan .button');
      expect(planButtons.length).toBe(3);

      planButtons.forEach(button => {
        expect(button.textContent).toBe('CHOOSE PLAN');
      });
    });
  });

  describe('JavaScript Interaction Tests', () => {
    beforeEach(() => {
      const sharedJs = fs.readFileSync(path.resolve(__dirname, '../shared.js'), 'utf8');
      eval(sharedJs);
    });

    test('clicking CHOOSE PLAN button should open modal and backdrop', () => {
      const planButton = document.querySelector('.plan button');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);

      planButton.click();

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
    });

    test('clicking No button should close modal and backdrop', () => {
      const planButton = document.querySelector('.plan button');
      const noButton = document.querySelector('.modal-action__negative');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      planButton.click();
      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);

      noButton.click();
      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);
    });

    test('clicking backdrop should close modal and mobile nav', () => {
      const planButton = document.querySelector('.plan button');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');
      const mobileNav = document.querySelector('.mobile-nav');

      planButton.click();
      mobileNav.classList.add('open');

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
      expect(mobileNav.classList.contains('open')).toBe(true);

      backdrop.click();

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);
      expect(mobileNav.classList.contains('open')).toBe(false);
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

    test('all three CHOOSE PLAN buttons should open modal', () => {
      const planButtons = document.querySelectorAll('.plan button');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      planButtons.forEach((button, index) => {
        modal.classList.remove('open');
        backdrop.classList.remove('open');

        button.click();

        expect(modal.classList.contains('open')).toBe(true);
        expect(backdrop.classList.contains('open')).toBe(true);
      });
    });
  });
});
