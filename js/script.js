/* StayNest interactive functionality */
/* ========== START: CONFIGURATION ========== */
const STAYNEST_CONFIG = {
  // Owner-provided contact number. Verify ownership and WhatsApp activation before launch.
  // WhatsApp must be international digits only (country code + number, without +).
  whatsappNumber: "919368253357",
  // Phone number in international format.
  phoneNumber: "+919368253357",
  // Add confirmed property details in index.html before enabling public location/SEO data.
};
/* ========== END: CONFIGURATION ========== */

document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const nav = document.getElementById("primary-nav");
  const navLinks = [...document.querySelectorAll('.primary-nav a[href^="#"]')];

  /* ========== START: MOBILE NAVIGATION ========== */
  function setMenu(open) {
    if (!menuToggle || !nav) return;
    nav.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close navigation menu" : "Open navigation menu");
    document.body.classList.toggle("menu-open", open);
  }
  menuToggle?.addEventListener("click", () => setMenu(menuToggle.getAttribute("aria-expanded") !== "true"));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) setMenu(false);
  });
  /* ========== END: MOBILE NAVIGATION ========== */

  /* ========== START: SMOOTH SCROLLING ========== */
  navLinks.forEach((link) => link.addEventListener("click", () => setMenu(false)));
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      if (!targetId || targetId === "#") return;
      const target = document.querySelector(targetId);
      if (!target) return;
      event.preventDefault();
      setMenu(false);
      target.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
      if (history.replaceState) history.replaceState(null, "", targetId);
    });
  });
  /* ========== END: SMOOTH SCROLLING ========== */

  /* ========== START: STICKY HEADER ========== */
  function updateHeader() {
    header?.classList.toggle("scrolled", window.scrollY > 12);
    const sections = [...document.querySelectorAll("main section[id]")];
    let current = "home";
    const offset = (header?.offsetHeight || 80) + 100;
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top <= offset) current = section.id;
    });
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${current}`;
      link.classList.toggle("active", active);
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
  /* ========== END: STICKY HEADER ========== */

  /* ========== START: WHATSAPP LINKS ========== */
  function buildWhatsAppUrl(message) {
    const number = STAYNEST_CONFIG.whatsappNumber.replace(/\D/g, "");
    if (!number) return null;
    return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  }
  document.querySelectorAll(".js-whatsapp").forEach((link) => {
    const item = link.dataset.item;
    const message = link.dataset.message || (item
      ? `Hello StayNest, I would like to enquire about ${item}. Please share the current rate, availability, inclusions, and booking details.`
      : "Hello StayNest, I would like to enquire about accommodation. Please share current rates and availability.");
    const url = buildWhatsAppUrl(message);
    if (url) {
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    } else {
      link.href = "#contact";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("WhatsApp number is not configured yet. Please add the confirmed number in js/script.js.");
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
  /* ========== END: WHATSAPP LINKS ========== */

  /* ========== START: CALL LINKS ========== */
  document.querySelectorAll(".js-call").forEach((link) => {
    const number = STAYNEST_CONFIG.phoneNumber.trim();
    if (number) {
      link.href = `tel:${number.replace(/[^\d+]/g, "")}`;
    } else {
      link.href = "#contact";
      link.addEventListener("click", (event) => {
        event.preventDefault();
        alert("Phone number is not configured yet. Please add the confirmed number in js/script.js.");
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
      });
    }
  });
  /* ========== END: CALL LINKS ========== */

  /* ========== START: FAQ ACCORDION ========== */
  document.querySelectorAll(".faq-item button[aria-controls]").forEach((button) => {
    button.addEventListener("click", () => {
      const answer = document.getElementById(button.getAttribute("aria-controls"));
      const isOpen = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!isOpen));
      if (answer) answer.hidden = isOpen;
      const icon = button.querySelector("span");
      if (icon) icon.textContent = isOpen ? "+" : "−";
    });
  });
  /* ========== END: FAQ ACCORDION ========== */

  /* ========== START: ROOM FILTERS ========== */
  document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll(".filter-btn").forEach((candidate) => {
        const selected = candidate === button;
        candidate.classList.toggle("active", selected);
        candidate.setAttribute("aria-pressed", String(selected));
      });
      document.querySelectorAll(".room-card").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });
  /* ========== END: ROOM FILTERS ========== */

  /* ========== START: FORM VALIDATION ========== */
  const form = document.getElementById("enquiry-form");
  const status = document.getElementById("form-status");
  const checkin = document.getElementById("checkin");
  const checkout = document.getElementById("checkout");
  const today = new Date();
  const todayString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  if (checkin) checkin.min = todayString;
  if (checkout) checkout.min = todayString;
  checkin?.addEventListener("change", () => {
    if (checkout) {
      checkout.min = checkin.value || todayString;
      if (checkout.value && checkout.value <= checkin.value) checkout.value = "";
    }
    clearError("checkin");
    clearError("checkout");
  });
  checkout?.addEventListener("change", () => clearError("checkout"));

  function clearError(fieldId) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.removeAttribute("aria-invalid");
    if (error) error.textContent = "";
  }
  function setError(fieldId, message) {
    const input = document.getElementById(fieldId);
    const error = document.getElementById(`${fieldId}-error`);
    if (input) input.setAttribute("aria-invalid", "true");
    if (error) error.textContent = message;
  }
  function validateForm() {
    let valid = true;
    ["name", "phone", "email", "guests", "checkin", "checkout"].forEach(clearError);
    if (!document.getElementById("full-name").value.trim()) { setError("name", "Please enter your name."); valid = false; }
    const phoneValue = document.getElementById("phone").value.trim();
    if (!phoneValue || phoneValue.replace(/\D/g, "").length < 7) { setError("phone", "Please enter a valid phone number."); valid = false; }
    const emailValue = document.getElementById("email").value.trim();
    if (emailValue && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) { setError("email", "Please enter a valid email address."); valid = false; }
    if (!document.getElementById("guests").value) { setError("guests", "Please select the number of guests."); valid = false; }
    if (!checkin.value) { setError("checkin", "Please choose a check-in date."); valid = false; }
    else if (checkin.value < todayString) { setError("checkin", "Check-in cannot be in the past."); valid = false; }
    if (!checkout.value) { setError("checkout", "Please choose a check-out date."); valid = false; }
    else if (checkin.value && checkout.value <= checkin.value) { setError("checkout", "Check-out must be after check-in."); valid = false; }
    return valid;
  }
  form?.addEventListener("submit", (event) => {
    event.preventDefault();
    if (status) { status.textContent = ""; status.className = "form-status"; }
    if (!validateForm()) {
      if (status) { status.textContent = "Please review the highlighted fields and try again."; status.classList.add("error"); }
      form.querySelector('[aria-invalid="true"]')?.focus();
      return;
    }
    const values = new FormData(form);
    const message = [
      "Hello StayNest, I would like to enquire about a stay.",
      `Name: ${values.get("name")}`,
      `Phone: ${values.get("phone")}`,
      values.get("email") ? `Email: ${values.get("email")}` : "",
      `Check-in: ${values.get("checkin")}`,
      `Check-out: ${values.get("checkout")}`,
      `Guests: ${values.get("guests")}`,
      values.get("preference") ? `Preferred room/package: ${values.get("preference")}` : "",
      values.get("message") ? `Message: ${values.get("message")}` : "",
      "Please share current availability, total price (including taxes/fees), inclusions, and booking terms."
    ].filter(Boolean).join("\n");
    const url = buildWhatsAppUrl(message);
    if (!url) {
      if (status) { status.textContent = "Your details are valid, but the WhatsApp number has not been configured. No message was sent. Please contact the owner to configure it."; status.classList.add("error"); }
      return;
    }
    if (status) { status.textContent = "WhatsApp is opening with your enquiry. Review it and press Send in WhatsApp to submit it."; status.classList.add("success"); }
    window.open(url, "_blank", "noopener,noreferrer");
  });
  /* ========== END: FORM VALIDATION ========== */

  /* ========== START: BACK-TO-TOP / FOOTER YEAR ========== */
  const year = document.getElementById("current-year");
  if (year) year.textContent = new Date().getFullYear();
  /* ========== END: BACK-TO-TOP / FOOTER YEAR ========== */
});
