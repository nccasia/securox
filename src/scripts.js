// ================= MENU TOGGLE SCRIPT =================
// Move header-container into mobile-menu-overlay when menu is open
const menuIcon = document.getElementById("menuIcon");
const mobileMenu = document.getElementById("mobileMenu");
const headerContainer = document.getElementById("headerContainer");
let headerParent = headerContainer ? headerContainer.parentNode : null;
let headerNext = headerContainer ? headerContainer.nextSibling : null;
if (menuIcon && mobileMenu && headerContainer) {
  menuIcon.addEventListener("click", function (e) {
    e.stopPropagation();
    if (!mobileMenu.classList.contains("active")) {
      // Open menu
      document.body.classList.add("mobile-menu-open");
      mobileMenu.classList.add("active");
      mobileMenu.insertBefore(headerContainer, mobileMenu.firstChild);
      menuIcon.classList.add("active");
    } else {
      closeMenu();
    }
  });
  mobileMenu.addEventListener("click", function (e) {
    if (e.target === mobileMenu) {
      closeMenu();
    }
  });
  function closeMenu() {
    document.body.classList.remove("mobile-menu-open");
    mobileMenu.classList.remove("active");
    menuIcon.classList.remove("active");
    if (headerParent) {
      if (headerNext) {
        headerParent.insertBefore(headerContainer, headerNext);
      } else {
        headerParent.appendChild(headerContainer);
      }
    }
  }
  // Optional: close menu on nav click
  mobileMenu
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
}

// ================= NAVBAR SMOOTH SCROLL SCRIPT =================
function scrollToSection(id) {
  const section = document.getElementById(id);
  if (section) {
    const headerOffset = 56;
    const elementPosition =
      section.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerOffset;
    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  }
}
function scrollToTop() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    if (href === "#") {
      e.preventDefault();
      scrollToTop();
    } else if (href.startsWith("#")) {
      e.preventDefault();
      scrollToSection(href.substring(1));
    }
  });
});

document.querySelectorAll(".mobile-menu-nav a").forEach((link) => {
  link.addEventListener("click", function (e) {
    const href = link.getAttribute("href");
    e.preventDefault();

    document.getElementById("mobileMenu").classList.remove("active");
    document.body.classList.remove("mobile-menu-open");

    setTimeout(() => {
      if (href === "#") {
        scrollToTop();
      } else if (href.startsWith("#")) {
        scrollToSection(href.substring(1));
      }
    }, 200);
  });
});

// ================= MOBILE ONLY: MOVE DETAILS SCRIPT =================
function moveProtectionDetails() {
  const details = document.querySelector(".about-protection-details");
  const content = document.querySelector(".about-protection-content");
  const container = document.querySelector(".about-protection-container");
  if (!details || !content || !container) return;
  if (window.innerWidth <= 600) {
    if (details.parentElement === content) {
      container.appendChild(details);
    }
  } else {
    if (details.parentElement === container) {
      content.appendChild(details);
    }
  }
}
window.addEventListener("resize", moveProtectionDetails);
window.addEventListener("DOMContentLoaded", moveProtectionDetails);

// Add sendEmail function at the end of the file
async function sendEmail(email) {
  try {
    const response = await fetch(
      "https://email.ncc.asia/ncc-site-api-sendmail",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          content: "From Securox",
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Failed to send email:", error);
    return null;
  }
}

function showToast(message, isError = false) {
  const newsletterForm = document.querySelector(".footer-newsletter");
  if (!newsletterForm) return;
  const toast = newsletterForm.querySelector(".toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.remove("error");
  if (isError) toast.classList.add("error");
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
    toast.classList.remove("error");
  }, 3500);
}

document.addEventListener("DOMContentLoaded", function () {
  const newsletterForm = document.querySelector(".footer-newsletter");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput ? emailInput.value.trim() : "";
      if (!email) {
        return;
      }
      const result = await sendEmail(email);
      if (result) {
        newsletterForm.reset();
        showToast("Thank you for signing up!");
      } else {
        showToast("Failed to send. Please try again later.", true);
      }
    });
  }
});
