"use strict";

// Active Dropdown,...
const activeClassAction = function (toggle, target) {
    const to = document.querySelector(toggle), ta = document.querySelector(target);

    if (to && ta) {
        to.addEventListener("click", function () {
            if (this.classList.contains("active")) {
                this.classList.remove("active");
                ta.classList.remove("active");
            } else {
                this.classList.add("active");
                ta.classList.add("active");
            }
        });
        document.addEventListener("click", function (event) {
            if (!event.target.closest(toggle) && !event.target.classList.contains(toggle.replace(/\./, ""))) {
                if (!event.target.closest(target) && !event.target.classList.contains(target.replace(/\./, ""))) {
                    to.classList.remove("active");
                    ta.classList.remove("active");
                }
            }
        });
    }
};

// OffCanvas Sidebar Activation
const offcanvsSidebar = function (openTrigger, closeTrigger, wrapper) {
    let OpenTriggerprimary__btn = document.querySelectorAll(openTrigger);
    let closeTriggerprimary__btn = document.querySelector(wrapper + " " + closeTrigger);
    let WrapperSidebar = document.querySelector(wrapper);
    let wrapperOverlay = document.querySelector(".overplay");

    function handleBodyClass(evt) {
        let eventTarget = evt.target;
        if (!eventTarget.closest(wrapper) && !eventTarget.closest(openTrigger)) {
            WrapperSidebar.classList.remove("active");
            wrapperOverlay.classList.remove("active");
        }
    }

    if (OpenTriggerprimary__btn && WrapperSidebar) {
        OpenTriggerprimary__btn.forEach(singleItem => {
            singleItem.addEventListener("click", function () {
                if (singleItem.dataset.offcanvas !== undefined) {
                    WrapperSidebar.classList.add("active");
                    wrapperOverlay.classList.add("active");
                    wrapperOverlay.addEventListener("click", handleBodyClass.bind(this));
                }
            });
        })
    }

    if (closeTriggerprimary__btn && WrapperSidebar) {
        closeTriggerprimary__btn.addEventListener("click", function () {
            if (closeTriggerprimary__btn.dataset.offcanvas !== undefined) {
                WrapperSidebar.classList.remove("active");
                wrapperOverlay.classList.remove("active");
                wrapperOverlay.removeEventListener("click", handleBodyClass.bind(this));
            }
        });
    }

    resizeRemoveClass(992, WrapperSidebar, wrapperOverlay)
}

// Resize
const resizeRemoveClass = function (outerWidth, WrapperSidebar, wrapperOverlay) {
    window.addEventListener("resize", function () {
        if (window.outerWidth >= outerWidth) {
            WrapperSidebar.classList.remove("active");
            wrapperOverlay.classList.remove("active");
        }
    });
}

// Tooltip
new Drooltip({
    "element": ".product-tooltip", "position": "bottom", "background": "#000", "color": "#fff"
});

// Gallery Thumb
const thumbClick = function (imageNumber) {
    const sliderElement = document.getElementById('pgallery');
    swiffyslider.slideTo(sliderElement, imageNumber)
}

activeClassAction(".topbar__dropdown--item", ".topbar__dropdown--menu");

offcanvsSidebar(".mobile__menu--btn", ".offcanvas__header--close", ".offcanvas__menu");
offcanvsSidebar(".mobile__action--cart", ".offcanvas__header--close", ".offcanvas__cart");
offcanvsSidebar(".mobile__action--search", ".search__area--close", "#search");
offcanvsSidebar(".product__items--action__quickview", ".offcanvas__header--close", ".modal");
