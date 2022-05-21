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

const lazyLoad = function () {
    new LazyLoad({
        class_applied: "lz-applied",
        class_loading: "lz-loading",
        class_loaded: "lz-loaded",
        class_error: "lz-error",
        class_entered: "lz-entered",
        class_exited: "lz-exited"
    });
}

const productGallery = function (imageNumber) {
    const sliderElement = document.getElementById('pgallery');
    swiffyslider.slideTo(sliderElement, imageNumber)
}

lazyLoad();
activeClassAction(".account__dropdown", ".dropdown__account");
offcanvsSidebar(".header__icon--cart", ".minicart__header--close", ".section-minicart");
offcanvsSidebar(".header__menu", ".menu__header--close", ".section-menu");
offcanvsSidebar(".header__icon--search", ".search__close", ".section-search");
offcanvsSidebar(".quickview--modal", ".modal__header--close", ".section-modal");