(function ($) {
    ("use strict");

    /**-----------------------------
     *  Mobile Menu
     * ---------------------------*/
    // When a menu item with children is clicked inside the .mobile_menu_nav
    $(".mobile_menu_nav .menu-item-has-children > a").on("click", function (e) {
        // Prevent default action for anchor tags
        e.preventDefault();

        // Close any open submenus (this ensures only one is open at a time)
        $(".mobile_menu_nav .menu-item-has-children").not($(this).parent()).removeClass("open").children(".sub-menu").slideUp();

        // Toggle the submenu of the clicked menu item
        $(this).parent().toggleClass("open").children(".sub-menu").slideToggle();
    });

    /* -----------------------------------------------------
    loader
    ----------------------------------------------------- */
    window.addEventListener("load", () => {
        const loader = document.getElementById("loader-wrapper");
        loader.style.opacity = "0";
        loader.style.transition = "opacity 0.5s ease";

        setTimeout(() => {
            loader.style.display = "none";
        }, 500);
    });
    /* -----------------------------------------------------
    Header sticky
    ----------------------------------------------------- */

    /* -----------------------------------------------------
    hide on scroll 
    ----------------------------------------------------- */
    var lastScrollTop = 0;

    $(window).on("scroll", function () {
        var st = $(this).scrollTop();

        if (st > lastScrollTop) {
            // Scrolling down
            $(".hide-on-scroll").addClass("hidden");
        } else {
            // Scrolling up
            $(".hide-on-scroll").removeClass("hidden");
        }

        lastScrollTop = st;
    });

    /* -----------------------------------------------------
    Custom Tabs
    ----------------------------------------------------- */
    document.addEventListener("DOMContentLoaded", function () {
        const tabsButton = document.querySelectorAll(".cdx-tabs-btn");
        tabsButton.forEach((tabItem) => {
            tabItem.addEventListener("click", function (event) {
                // Check if the clicked target is either the button or any child element inside it
                const clickedTab = event.target.closest(".cdx-tab-btn");

                if (clickedTab) {
                    let tabId = clickedTab.getAttribute("data-tab");
                    customTab(tabId);
                }
            });
        });

        // Tab functions
        function customTab(tabId) {
            let allTabBtns = document.querySelectorAll(".cdx-tab-btn");
            let allTabItems = document.querySelectorAll(".cdx-tab-item");

            // All buttons query
            allTabBtns.forEach((singlebtn) => {
                singlebtn.classList.remove("active");
            });

            // All contents query
            allTabItems.forEach((singleContent) => {
                singleContent.classList.remove("active");
            });

            // Add active class tab buttons and contents
            const activeBtn = document.querySelector(`.cdx-tab-btn[data-tab="${tabId}"]`);
            if (activeBtn) activeBtn.classList.add("active");
            const activeTab = document.getElementById(tabId);
            if (activeTab) activeTab.classList.add("active");
        }
    });

    /* -----------------------------------------------------
    Video popup
    ----------------------------------------------------- */
    if ($(".cdx-popup-video").length) {
        $(".cdx-popup-video").magnificPopup({
            type: "iframe",
            mainClass: "video-fade",
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false
        });
    }

    // Function to check scroll position and add/remove 'active' class
    function toggleStickyClass() {
        var header = $(".header-sticky"); // Target the header with the 'sticky' class
        var scrollPosition = $(window).scrollTop(); // Get current scroll position
        var scrollThreshold = 50; // Scroll threshold after which 'active' is added

        // Add 'active' class when the scroll position is past the threshold
        if (scrollPosition > scrollThreshold) {
            header.addClass("active"); // Make it sticky
        } else {
            header.removeClass("active"); // Remove 'active' class when scrolling back up
        }
    }

    // Run the function on page load (in case the page is already scrolled)
    toggleStickyClass();

    // Run on every scroll event
    $(window).on("scroll", function () {
        toggleStickyClass();
    });

    /* -----------------------------------------------------
        blog-slider-1
    ----------------------------------------------------- */
    var blog1 = new Swiper(".blog-slider-1", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },

            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            },
            1200: {
                slidesPerView: 3.5,
                spaceBetween: 30
            }
        }
    });

    /* -----------------------------------------------------
        cdx-service-slier-1
    ----------------------------------------------------- */
    var service1 = new Swiper(".cdx-service-slier-1", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 20,
        speed: 6000,
        autoplay: {
            delay: 3000,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            0: {
                slidesPerView: 1,
                spaceBetween: 20
            },
            640: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20
            }
        }
    });

    /* -----------------------------------------------------
        cdx-service-slier-1
    ----------------------------------------------------- */
    const thumbsSwiper = new Swiper(".cdx-paginate-slider", {
        direction: "vertical",
        slidesPerView: 3,
        spaceBetween: 10,
        freeMode: true,
        watchSlidesProgress: true,
        loop: true,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        }
    });

    const mainSwiper = new Swiper(".cdx-hero-slider", {
        loop: true,
        freeMode: true,
        slidesPerView: 1,
        direction: "vertical",
        spaceBetween: 20,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        thumbs: {
            swiper: thumbsSwiper
        }
    });

    /* -----------------------------------------------------
        cdx-service-slier-1
    ----------------------------------------------------- */
    const testimonial = new Swiper(".testimonial-slider", {
        direction: "horizontal", // still horizontal swipe, vertical stacking look
        slidesPerView: 1,
        spaceBetween: 10,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });

    document.addEventListener("DOMContentLoaded", function () {
        const blogCards = document.querySelectorAll(".cdx-blog-cards");

        if (blogCards.length > 0) {
            blogCards.forEach((card) => {
                const blogItems = card.querySelectorAll(".cdx-blog-item-1");
                const imgItems = card.querySelectorAll(".cdx-blog-img-item");

                blogItems.forEach((item, index) => {
                    item.addEventListener("mouseenter", () => {
                        imgItems.forEach((img) => img.classList.remove("active-img"));
                        if (imgItems[index]) {
                            imgItems[index].classList.add("active-img");
                        }
                    });

                    item.addEventListener("mouseleave", () => {
                        imgItems.forEach((img) => img.classList.remove("active-img"));
                    });
                });
            });
        }
    });

    /* -----------------------------------------------------
        cdx-partner-1
    ----------------------------------------------------- */
    var partner1 = new Swiper(".cdx-partner-slider", {
        slidesPerView: 2,
        loop: true,
        spaceBetween: 10,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        breakpoints: {
            0: {
                slidesPerView: 2
            },
            640: {
                slidesPerView: 3
            },

            1024: {
                slidesPerView: 4
            },
            1200: {
                slidesPerView: 6
            }
        }
    });
    /* -----------------------------------------------------
        cdx-partner-1
    ----------------------------------------------------- */
    var getIn = new Swiper(".cdx-getin-slider", {
        slidesPerView: "auto",
        loop: true,
        speed: 12000,
        spaceBetween: 200,
        autoplay: {
            delay: 0,
            disableOnInteraction: false
        },
        breakpoints: {
            1024: {
                spaceBetween: 200
            },
            1200: {
                spaceBetween: 420
            }
        },
        freeMode: true,
        freeModeMomentum: false
    });

    /* -----------------------------------------------------
        service card
    ----------------------------------------------------- */

    const service3 = document.querySelectorAll(".cdx-service-item-3");

    if (service3.length) {
        service3.forEach((item) => {
            item.addEventListener("mouseenter", function () {
                const currentActive = document.querySelector(".cdx-service-item-3.active");

                if (currentActive && currentActive !== this) {
                    // Step 1: Add "closing" to the current active
                    currentActive.classList.add("closing");
                    currentActive.classList.remove("active");

                    // Step 2: After animation delay, remove "closing"
                    setTimeout(() => {
                        currentActive.classList.remove("closing");
                    }, 500); // match the transition time (0.5s)
                }

                // Step 3: Add active to the hovered item
                this.classList.add("active");
            });
        });
    }

    /* -----------------------------------------------------
      testimonial-slider-2
    ----------------------------------------------------- */
    var testimonial2 = new Swiper(".cdx-testimonial-slider-2", {
        slidesPerView: 1,
        loop: true,
        spaceBetween: 10,
        speed: 5000,

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
})(jQuery);
