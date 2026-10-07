/* =========================================================
   Sir John Markel Noynay — Portfolio
   Interactive features: navigation, task tracker, gallery, lightbox
   ========================================================= */

(function () {
  "use strict";

  /* ---------- Navigation ---------- */
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("nav-toggle");
  var navLinks = document.getElementById("nav-links");

  function onScroll() {
    if (window.scrollY > 10) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  navToggle.addEventListener("click", function () {
    var isOpen = navLinks.classList.toggle("open");
    navToggle.classList.toggle("open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", function (e) {
    if (e.target.classList.contains("nav-link")) {
      navLinks.classList.remove("open");
      navToggle.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });

  /* ---------- Scroll spy (active nav link) ---------- */
  var sections = document.querySelectorAll("section[id]");
  var linkMap = {};
  document.querySelectorAll(".nav-link").forEach(function (link) {
    linkMap[link.getAttribute("href").slice(1)] = link;
  });

  var spyObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          document.querySelectorAll(".nav-link").forEach(function (l) {
            l.classList.remove("active");
          });
          var link = linkMap[entry.target.id];
          if (link) link.classList.add("active");
        }
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach(function (s) { spyObserver.observe(s); });

  /* ---------- Reveal on scroll ---------- */
  var revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  document.querySelectorAll(".reveal").forEach(function (el) {
    revealObserver.observe(el);
  });

  /* Stagger delays for hero elements */
  var heroReveals = document.querySelectorAll(".hero .reveal");
  heroReveals.forEach(function (el, i) {
    el.style.setProperty("--i", i);
  });

  /* ---------- Imago Gallery ---------- */
  var imagoImages = [
    "Screenshot 2026-10-06 182446 - Copy - Copy.png",
    "Screenshot 2026-10-06 182556.png",
    "Screenshot 2026-10-06 182605.png",
    "Screenshot 2026-10-06 182614.png",
    "Screenshot 2026-10-06 182622.png",
    "Screenshot 2026-10-06 182628.png",
    "Screenshot 2026-10-06 182635.png",
    "Screenshot 2026-10-06 182645.png",
    "Screenshot 2026-10-06 182652.png",
    "Screenshot 2026-10-06 182659.png",
    "Screenshot 2026-10-06 182705.png",
    "Screenshot 2026-10-06 182718.png",
    "Screenshot 2026-10-06 182725.png",
    "Screenshot 2026-10-06 182732.png",
    "Screenshot 2026-10-06 182739.png",
    "Screenshot 2026-10-06 182753.png",
    "Screenshot 2026-10-06 182801.png",
    "Screenshot 2026-10-06 182808.png",
    "Screenshot 2026-10-06 182814.png",
    "Screenshot 2026-10-06 182820.png",
    "Screenshot 2026-10-06 182829.png",
    "Screenshot 2026-10-06 182837.png",
    "Screenshot 2026-10-06 182847.png",
    "Screenshot 2026-10-06 182852.png",
    "Screenshot 2026-10-06 182857.png",
    "Screenshot 2026-10-06 182902.png",
    "Screenshot 2026-10-06 182908.png",
    "Screenshot 2026-10-06 182914.png",
    "Screenshot 2026-10-06 182919.png",
    "Screenshot 2026-10-06 182924.png",
    "Screenshot 2026-10-06 182930.png",
    "Screenshot 2026-10-06 182937.png",
    "Screenshot 2026-10-06 182943.png",
    "Screenshot 2026-10-06 182949.png",
    "Screenshot 2026-10-06 182955.png",
    "Screenshot 2026-10-06 183003.png"
  ];

  var gallery = document.getElementById("gallery");

  imagoImages.forEach(function (name, index) {
    var item = document.createElement("div");
    item.className = "gallery-item reveal";
    var img = document.createElement("img");
    img.src = encodeURI("Imago/" + name);
    img.alt = "Imago design screenshot " + (index + 1);
    img.loading = "lazy";
    item.appendChild(img);
    item.addEventListener("click", function () {
      openLightbox(index);
    });
    gallery.appendChild(item);
    revealObserver.observe(item);
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightbox-img");
  var lightboxCaption = document.getElementById("lightbox-caption");
  var lightboxClose = document.getElementById("lightbox-close");
  var lightboxPrev = document.getElementById("lightbox-prev");
  var lightboxNext = document.getElementById("lightbox-next");
  var currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  function updateLightbox() {
    var name = imagoImages[currentIndex];
    lightboxImg.src = encodeURI("Imago/" + name);
    lightboxImg.alt = "Imago design screenshot " + (currentIndex + 1);
    lightboxCaption.textContent = (currentIndex + 1) + " / " + imagoImages.length + " — " + name;
  }

  function stepLightbox(delta) {
    currentIndex = (currentIndex + delta + imagoImages.length) % imagoImages.length;
    updateLightbox();
  }

  lightboxClose.addEventListener("click", closeLightbox);
  lightboxPrev.addEventListener("click", function (e) { e.stopPropagation(); stepLightbox(-1); });
  lightboxNext.addEventListener("click", function (e) { e.stopPropagation(); stepLightbox(1); });
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowLeft") stepLightbox(-1);
    if (e.key === "ArrowRight") stepLightbox(1);
  });

  /* ---------- Task Tracker (localStorage) ---------- */
  var STORAGE_KEY = "jmn-portfolio-tasks";
  var taskForm = document.getElementById("task-form");
  var taskInput = document.getElementById("task-input");
  var taskList = document.getElementById("task-list");
  var taskEmpty = document.getElementById("task-empty");

  var tasks = [];
  try {
    var stored = localStorage.getItem(STORAGE_KEY);
    if (stored) tasks = JSON.parse(stored);
  } catch (err) {
    tasks = [];
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (err) {
      /* storage unavailable — tasks still work for this session */
    }
  }

  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.length === 0) {
      taskEmpty.style.display = "block";
      return;
    }
    taskEmpty.style.display = "none";

    tasks.forEach(function (task, index) {
      var li = document.createElement("li");
      li.className = "task-item" + (task.done ? " done" : "");

      var check = document.createElement("button");
      check.className = "task-check";
      check.setAttribute("aria-label", task.done ? "Mark as not done" : "Mark as done");
      check.textContent = "✓";
      check.addEventListener("click", function () {
        tasks[index].done = !tasks[index].done;
        saveTasks();
        renderTasks();
      });

      var text = document.createElement("span");
      text.className = "task-text";
      text.textContent = task.text;

      var del = document.createElement("button");
      del.className = "task-delete";
      del.setAttribute("aria-label", "Delete task");
      del.textContent = "×";
      del.addEventListener("click", function () {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
      });

      li.appendChild(check);
      li.appendChild(text);
      li.appendChild(del);
      taskList.appendChild(li);
    });
  }

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var value = taskInput.value.trim();
    if (!value) return;
    tasks.push({ text: value, done: false });
    taskInput.value = "";
    saveTasks();
    renderTasks();
    taskInput.focus();
  });

  renderTasks();
})();
