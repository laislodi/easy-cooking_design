const fs = require('fs');
const path = require('path');

describe('Packages Page', () => {
  let html;

  beforeEach(() => {
    html = fs.readFileSync(path.resolve(__dirname, '../packages/index.html'), 'utf8');
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
      expect(yesButton.getAttribute('href')).toBe('../start-cooking/index.html');
      expect(noButton).not.toBeNull();
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
      expect(links[0].getAttribute('href')).toBe('index.html');
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

    test('should have a background element', () => {
      const background = document.querySelector('.background');
      expect(background).not.toBeNull();
    });

    test('should have a footer with support and terms links', () => {
      const footer = document.querySelector('.main-footer');
      const footerLinks = document.querySelectorAll('.main-footer__link');

      expect(footer).not.toBeNull();
      expect(footerLinks.length).toBe(2);
    });
  });

  describe('Package Content Tests', () => {
    test('should have three package sections', () => {
      const packages = document.querySelectorAll('.package');
      expect(packages.length).toBe(3);
    });

    test('should have PLUS package with correct content', () => {
      const plusPackage = document.querySelector('#plus');
      const title = plusPackage.querySelector('.package-title');
      const badge = plusPackage.querySelector('.package-badge');
      const subtitle = plusPackage.querySelector('.package-subtitle');
      const description = plusPackage.querySelector('.package-description');

      expect(plusPackage).not.toBeNull();
      expect(plusPackage.classList.contains('package')).toBe(true);
      expect(title.textContent).toBe('Our PLUS package');
      expect(badge.textContent).toBe('RECOMMENDED');
      expect(subtitle.textContent).toBe('For 300 more complex and delicious recipes.');
      expect(description.textContent).toContain('300 recipes');
    });

    test('should have FREE package with correct content', () => {
      const freePackage = document.querySelector('#free');
      const title = freePackage.querySelector('.package-title');
      const subtitle = freePackage.querySelector('.package-subtitle');
      const description = freePackage.querySelector('.package-description');

      expect(freePackage).not.toBeNull();
      expect(freePackage.classList.contains('package')).toBe(true);
      expect(title.textContent).toBe('Our FREE package');
      expect(subtitle.textContent).toBe('For 50 recipes and learning the basics of cooking.');
      expect(description.textContent).toContain('50 recipes');
    });

    test('should have PREMIUM package with correct content and highlighted', () => {
      const premiumPackage = document.querySelector('#premium');
      const title = premiumPackage.querySelector('.package-title');
      const subtitle = premiumPackage.querySelector('.package-subtitle');
      const description = premiumPackage.querySelector('.package-description');

      expect(premiumPackage).not.toBeNull();
      expect(premiumPackage.classList.contains('package')).toBe(true);
      expect(premiumPackage.classList.contains('package__highlighted')).toBe(true);
      expect(title.textContent).toBe('Our PREMIUM package');
      expect(subtitle.textContent).toBe('All recipes and more.');
      expect(description.textContent).toContain('500+ recipes');
    });

    test('each package should have a link wrapper', () => {
      const packages = document.querySelectorAll('.package');

      packages.forEach(pkg => {
        const link = pkg.querySelector('a');
        expect(link).not.toBeNull();
      });
    });

    test('packages should be in correct order: PLUS, FREE, PREMIUM', () => {
      const packages = document.querySelectorAll('.package');

      expect(packages[0].id).toBe('plus');
      expect(packages[1].id).toBe('free');
      expect(packages[2].id).toBe('premium');
    });

    test('only PLUS package should have RECOMMENDED badge', () => {
      const plusBadge = document.querySelector('#plus .package-badge');
      const freeBadge = document.querySelector('#free .package-badge');
      const premiumBadge = document.querySelector('#premium .package-badge');

      expect(plusBadge).not.toBeNull();
      expect(freeBadge).toBeNull();
      expect(premiumBadge).toBeNull();
    });

    test('only PREMIUM package should be highlighted', () => {
      const plusPackage = document.querySelector('#plus');
      const freePackage = document.querySelector('#free');
      const premiumPackage = document.querySelector('#premium');

      expect(plusPackage.classList.contains('package__highlighted')).toBe(false);
      expect(freePackage.classList.contains('package__highlighted')).toBe(false);
      expect(premiumPackage.classList.contains('package__highlighted')).toBe(true);
    });
  });

  describe('JavaScript Interaction Tests', () => {
    beforeEach(() => {
      const sharedJs = fs.readFileSync(path.resolve(__dirname, '../shared.js'), 'utf8');
      const packageJs = fs.readFileSync(path.resolve(__dirname, '../packages/package.js'), 'utf8');
      eval(sharedJs);
      eval(packageJs);
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

    test('clicking PLUS package should open modal and backdrop', () => {
      const plusPackage = document.querySelector('#plus');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);

      plusPackage.click();

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
    });

    test('clicking FREE package should open modal and backdrop', () => {
      const freePackage = document.querySelector('#free');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);

      freePackage.click();

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
    });

    test('clicking PREMIUM package should open modal and backdrop', () => {
      const premiumPackage = document.querySelector('#premium');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);

      premiumPackage.click();

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
    });

    test('clicking No button should close modal and backdrop', () => {
      const plusPackage = document.querySelector('#plus');
      const noButton = document.querySelector('.modal-action__negative');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      plusPackage.click();
      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);

      noButton.click();
      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);
    });

    test('clicking backdrop should close modal and mobile nav', () => {
      const plusPackage = document.querySelector('#plus');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');
      const mobileNav = document.querySelector('.mobile-nav');

      plusPackage.click();
      mobileNav.classList.add('open');

      expect(modal.classList.contains('open')).toBe(true);
      expect(backdrop.classList.contains('open')).toBe(true);
      expect(mobileNav.classList.contains('open')).toBe(true);

      backdrop.click();

      expect(modal.classList.contains('open')).toBe(false);
      expect(backdrop.classList.contains('open')).toBe(false);
      expect(mobileNav.classList.contains('open')).toBe(false);
    });

    test('all three package sections should open modal when clicked', () => {
      const packages = document.querySelectorAll('.package');
      const modal = document.querySelector('.modal');
      const backdrop = document.querySelector('.backdrop');

      packages.forEach((pkg) => {
        modal.classList.remove('open');
        backdrop.classList.remove('open');

        pkg.click();

        expect(modal.classList.contains('open')).toBe(true);
        expect(backdrop.classList.contains('open')).toBe(true);
      });
    });
  });
});
