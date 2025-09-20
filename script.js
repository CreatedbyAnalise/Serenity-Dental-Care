// Loading Animation
window.addEventListener("load", () => {
  console.log("[v0] Page loaded, starting preloader sequence")

  // Reduced timing for better UX - show progress animation for 1.5 seconds
  setTimeout(() => {
    const loadingOverlay = document.getElementById("loadingOverlay")
    const mainContent = document.getElementById("mainContent")

    console.log("[v0] Starting preloader fade out")

    // Fade out preloader
    loadingOverlay.classList.add("fade-out")

    // Show main content with smooth entrance
    setTimeout(() => {
      console.log("[v0] Showing main content")
      mainContent.classList.add("show")
      mainContent.style.opacity = "1"
      mainContent.style.transform = "translateY(0)"
      loadingOverlay.style.display = "none"
    }, 400)
  }, 1500) // Reduced from 3000ms to 1500ms
})

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const targetId = this.getAttribute("href").substring(1)
    scrollToSection(targetId)
  })
})

// Navbar Background Change on Scroll
window.addEventListener("scroll", () => {
  const navbar = document.getElementById("navbar")
  const navbarLogo = document.getElementById("navbar-logo")
  const navLinks = document.querySelectorAll(".nav-link")

  if (window.scrollY > 50) {
    navbar.classList.remove("bg-transparent", "backdrop-blur-sm")
    navbar.classList.add("bg-navy/95", "backdrop-blur-md", "shadow-lg")

    // Keep text colors white for better contrast against dark navy
    navbarLogo.classList.remove("text-navy")
    navbarLogo.classList.add("text-white")

    navLinks.forEach((link) => {
      link.classList.remove("text-navy")
      link.classList.add("text-white")
    })
  } else {
    // Top of page - transparent with white text
    navbar.classList.remove("bg-navy/95", "backdrop-blur-md", "shadow-lg")
    navbar.classList.add("bg-transparent", "backdrop-blur-sm")

    // Change text colors back to white
    navbarLogo.classList.remove("text-navy")
    navbarLogo.classList.add("text-white")

    navLinks.forEach((link) => {
      link.classList.remove("text-navy")
      link.classList.add("text-white")
    })
  }
})

// Scroll-based Reveal Animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible")
    }
  })
}, observerOptions)

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el)
})

// Button Click Microinteractions
document.querySelectorAll(".btn-hover").forEach((button) => {
  button.addEventListener("click", function (e) {
    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = this.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.width = ripple.style.height = size + "px"
    ripple.style.left = x + "px"
    ripple.style.top = y + "px"
    ripple.classList.add("ripple")

    this.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)

    // Success feedback for appointment buttons
    if (this.textContent.includes("Appointment") || this.textContent.includes("Schedule")) {
      const originalText = this.textContent
      this.textContent = "✓ Request Sent!"
      this.style.backgroundColor = "#4A9B8E"

      setTimeout(() => {
        this.textContent = originalText
        this.style.backgroundColor = ""
      }, 2000)
    }
  })
})

// Form Submission with Success Animation
const contactForm = document.querySelector("form")
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    // Loading state
    submitBtn.textContent = "Scheduling..."
    submitBtn.disabled = true

    // Simulate API call
    setTimeout(() => {
      // Success state
      submitBtn.textContent = "✓ Appointment Requested!"
      submitBtn.style.backgroundColor = "#4A9B8E"

      // Show success message
      const successMsg = document.createElement("div")
      successMsg.className = "mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg"
      successMsg.innerHTML = "<strong>Success!</strong> We'll contact you within 24 hours to confirm your appointment."
      this.appendChild(successMsg)

      // Reset form
      setTimeout(() => {
        this.reset()
        submitBtn.textContent = originalText
        submitBtn.disabled = false
        submitBtn.style.backgroundColor = ""
        successMsg.remove()
      }, 3000)
    }, 1500)
  })
}

// Parallax Effect for Hero Section - DISABLED to fix overlap issue
// window.addEventListener("scroll", () => {
//   const scrolled = window.pageYOffset
//   const parallax = document.querySelector(".parallax-bg")
//   const speed = scrolled * 0.5

//   if (parallax) {
//     parallax.style.transform = `translateY(${speed}px)`
//   }
// })

// Card Hover Effects with Stagger
document.querySelectorAll(".card-hover").forEach((card, index) => {
  card.addEventListener("mouseenter", function () {
    // Stagger animation for multiple cards
    setTimeout(() => {
      this.style.transform = "translateY(-8px) scale(1.02)"
    }, index * 50)
  })

  card.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)"
  })
})

// Mobile Menu Toggle (if needed)
const mobileMenuBtn = document.createElement("button")
mobileMenuBtn.className = "md:hidden text-navy"
mobileMenuBtn.innerHTML = `
    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
    </svg>
`

// Add CSS for ripple effect
const style = document.createElement("style")
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .success-pulse {
        animation: success-pulse 0.6s ease-out;
    }
    
    @keyframes success-pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`
document.head.appendChild(style)

// Smooth page transitions for internal links
document.addEventListener("DOMContentLoaded", () => {
  console.log("[v0] DOM loaded, initializing content")

  // Initial setup - main content starts hidden but ensure it exists
  const mainContent = document.getElementById("mainContent")
  if (mainContent) {
    mainContent.style.opacity = "0"
    mainContent.style.transform = "translateY(30px)"
    mainContent.style.transition = "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
  }

  // Initialize navigation links after DOM is ready
  initializeNavigation()

  initializeServiceAccordions()
})

function initializeNavigation() {
  // Smooth Scroll for Navigation Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      scrollToSection(targetId)
    })
  })
}

function scrollToSection(targetId) {
  const target = document.getElementById(targetId)
  if (target) {
    const navbar = document.getElementById("navbar")
    const navbarHeight = navbar ? navbar.offsetHeight : 80
    const targetPosition = target.offsetTop - navbarHeight - 20

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    })
  }
}

function initializeServiceAccordions() {
  const serviceAccordions = document.querySelectorAll(".service-accordion")

  serviceAccordions.forEach((accordion) => {
    const toggleButton = accordion.querySelector(".service-toggle")
    const content = accordion.querySelector(".service-content")
    const icon = accordion.querySelector(".service-icon")

    if (!toggleButton || !content || !icon) return

    toggleButton.addEventListener("click", () => {
      const isCurrentlyOpen = accordion.classList.contains("open")

      // Close all other accordions with smooth animation
      serviceAccordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion && otherAccordion.classList.contains("open")) {
          const otherContent = otherAccordion.querySelector(".service-content")
          const otherIcon = otherAccordion.querySelector(".service-icon")

          otherAccordion.classList.remove("open")
          otherContent.style.maxHeight = "0px"
          otherIcon.classList.remove("open")
        }
      })

      // Toggle current accordion with smooth animation
      if (isCurrentlyOpen) {
        // Close current accordion
        accordion.classList.remove("open")
        content.style.maxHeight = "0px"
        icon.classList.remove("open")
      } else {
        // Open current accordion
        accordion.classList.add("open")
        content.style.maxHeight = content.scrollHeight + "px"
        icon.classList.add("open")

        // Add microinteraction feedback
        toggleButton.style.transform = "scale(0.98)"
        setTimeout(() => {
          toggleButton.style.transform = "scale(1)"
        }, 150)
      }
    })

    // Add hover effects for better UX
    toggleButton.addEventListener("mouseenter", () => {
      if (!accordion.classList.contains("open")) {
        toggleButton.style.backgroundColor = "rgba(74, 155, 142, 0.05)"
      }
    })

    toggleButton.addEventListener("mouseleave", () => {
      toggleButton.style.backgroundColor = ""
    })
  })
}
