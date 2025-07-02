// ================= SCRIPTS FOR INTERACTION =================
document.addEventListener("DOMContentLoaded", function () {
  // Toggle image based on which service card is clicked
  const toggleImg = document.getElementById('toggle-image');
  const serviceCards = document.querySelectorAll('.service-card');
  if (toggleImg && serviceCards.length > 0) {
    serviceCards.forEach(function(card, index) {
      card.addEventListener('click', function () {
        // Mỗi card sẽ gán 1 ảnh riêng biệt
        let nextImage = '';
        let nextAlt = '';
        let nextClass = '';
        if (index === 0 || index === 2) {
          nextImage = '../public/group.png';
          nextAlt = 'Group';
          nextClass = 'group-img';
        } else if (index === 1) {
          nextImage = '../public/two-people.png';
          nextAlt = 'Two People';
          nextClass = 'two-people-img';
        }
        toggleImg.src = nextImage;
        toggleImg.alt = nextAlt;
        toggleImg.classList.remove('group-img', 'two-people-img');
        toggleImg.classList.add(nextClass);
      });
    });
  }

  // ================= MENU TOGGLE SCRIPT =================
  // Move header-container into mobile-menu-overlay when menu is open
  const menuIcon = document.getElementById('menuIcon');
  const mobileMenu = document.getElementById('mobileMenu');
  const headerContainer = document.getElementById('headerContainer');
  let headerParent = headerContainer ? headerContainer.parentNode : null;
  let headerNext = headerContainer ? headerContainer.nextSibling : null;
  if (menuIcon && mobileMenu && headerContainer) {
    menuIcon.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!mobileMenu.classList.contains('active')) {
        // Open menu
        document.body.classList.add('mobile-menu-open');
        mobileMenu.classList.add('active');
        mobileMenu.insertBefore(headerContainer, mobileMenu.firstChild);
        menuIcon.classList.add('active');
      } else {
        closeMenu();
      }
    });
    mobileMenu.addEventListener('click', function(e) {
      if (e.target === mobileMenu) {
        closeMenu();
      }
    });
    function closeMenu() {
      document.body.classList.remove('mobile-menu-open');
      mobileMenu.classList.remove('active');
      menuIcon.classList.remove('active');
      if (headerParent) {
        if (headerNext) {
          headerParent.insertBefore(headerContainer, headerNext);
        } else {
          headerParent.appendChild(headerContainer);
        }
      }
    }
    // Optional: close menu on nav click
    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  }

  // ================= NAVBAR SMOOTH SCROLL SCRIPT =================
  function scrollToSection(id) {
    const section = document.getElementById(id);
    if (section) {
      const headerOffset = 56; // chiều cao header sticky
      const elementPosition = section.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
  function scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }
  // Xử lý cho navbar chính
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      if (href === '#') {
        e.preventDefault();
        scrollToTop();
      } else if (href.startsWith('#')) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });
  // Xử lý cho mobile menu
  document.querySelectorAll('.mobile-menu-nav a').forEach(link => {
    link.addEventListener('click', function (e) {
      const href = link.getAttribute('href');
      e.preventDefault();
      // Đóng mobile menu trước
      document.getElementById('mobileMenu').classList.remove('active');
      document.body.classList.remove('mobile-menu-open');
      // Đợi menu đóng xong mới scroll (delay 200ms)
      setTimeout(() => {
        if (href === '#') {
          scrollToTop();
        } else if (href.startsWith('#')) {
          scrollToSection(href.substring(1));
        }
      }, 200);
    });
  });
});

// ================= MOBILE ONLY: MOVE DETAILS SCRIPT =================
function moveProtectionDetails() {
  const details = document.querySelector('.about-protection-details');
  const content = document.querySelector('.about-protection-content');
  const container = document.querySelector('.about-protection-container');
  if (!details || !content || !container) return;
  if (window.innerWidth <= 600) {
    // Nếu details đang nằm trong content thì di chuyển ra ngoài
    if (details.parentElement === content) {
      container.appendChild(details);
    }
  } else {
    // Nếu details đang nằm ngoài content thì di chuyển lại vào trong content
    if (details.parentElement === container) {
      content.appendChild(details);
    }
  }
}
window.addEventListener('resize', moveProtectionDetails);
window.addEventListener('DOMContentLoaded', moveProtectionDetails);

// ================= HERO IMAGE TAP SWITCH FOR MOBILE =================
function handleHeroImageTapMobile() {
  const heroImg = document.getElementById('toggle-image');
  if (!heroImg) return;
  // Remove previous listener if any
  heroImg.onclick = null;
  if (window.innerWidth <= 600) {
    heroImg.onclick = function (e) {
      const rect = heroImg.getBoundingClientRect();
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const mid = rect.left + rect.width / 2;
      if (x < mid) {
        // Tap left: group
        heroImg.src = '../public/group.png';
        heroImg.alt = 'Group';
        heroImg.classList.remove('two-people-img');
        heroImg.classList.add('group-img');
      } else {
        // Tap right: two-people
        heroImg.src = '../public/two-people.png';
        heroImg.alt = 'Two People';
        heroImg.classList.remove('group-img');
        heroImg.classList.add('two-people-img');
      }
    };
    // Support both touch and click for mobile
    heroImg.addEventListener('touchstart', heroImg.onclick);
    heroImg.addEventListener('click', heroImg.onclick);
  } else {
    // Remove mobile listeners on desktop
    heroImg.removeEventListener('touchstart', heroImg.onclick);
    heroImg.removeEventListener('click', heroImg.onclick);
  }
}
window.addEventListener('resize', handleHeroImageTapMobile);
window.addEventListener('DOMContentLoaded', handleHeroImageTapMobile); 