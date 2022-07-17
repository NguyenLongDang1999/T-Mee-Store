"use strict";

// Active Dropdown,...
const activeClassAction = (toggle, target) => {
    const to = document.querySelector(toggle),
        ta = document.querySelector(target);

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
            if (
                !event.target.closest(toggle) &&
                !event.target.classList.contains(toggle.replace(/\./, ""))
            ) {
                if (
                    !event.target.closest(target) &&
                    !event.target.classList.contains(target.replace(/\./, ""))
                ) {
                    to.classList.remove("active");
                    ta.classList.remove("active");
                }
            }
        });
    }
};

// OffCanvas Sidebar Activation
const offcanvsSidebar = (openTrigger, closeTrigger, wrapper) => {
    let OpenTriggerprimary__btn = document.querySelectorAll(openTrigger);
    let closeTriggerprimary__btn = document.querySelector(
        wrapper + " " + closeTrigger
    );
    let WrapperSidebar = document.querySelector(wrapper);
    let wrapperOverlay = document.querySelector(".overplay");

    function handleBodyClass(evt) {
        let eventTarget = evt.target;
        if (
            !eventTarget.closest(wrapper) &&
            !eventTarget.closest(openTrigger)
        ) {
            WrapperSidebar.classList.remove("active");
            wrapperOverlay.classList.remove("active");
        }
    }

    if (OpenTriggerprimary__btn && WrapperSidebar) {
        OpenTriggerprimary__btn.forEach((singleItem) => {
            singleItem.addEventListener("click", function () {
                if (singleItem.dataset.offcanvas !== undefined) {
                    WrapperSidebar.classList.add("active");
                    wrapperOverlay.classList.add("active");
                    wrapperOverlay.addEventListener(
                        "click",
                        handleBodyClass.bind(this)
                    );
                }
            });
        });
    }

    if (closeTriggerprimary__btn && WrapperSidebar) {
        closeTriggerprimary__btn.addEventListener("click", function () {
            if (closeTriggerprimary__btn.dataset.offcanvas !== undefined) {
                WrapperSidebar.classList.remove("active");
                wrapperOverlay.classList.remove("active");
                wrapperOverlay.removeEventListener(
                    "click",
                    handleBodyClass.bind(this)
                );
            }
        });
    }

    resizeRemoveClass(992, WrapperSidebar, wrapperOverlay);
};

// Resize
const resizeRemoveClass = (
    outerWidth,
    WrapperSidebar,
    wrapperOverlay
) => {
    window.addEventListener("resize", function () {
        if (window.outerWidth >= outerWidth) {
            WrapperSidebar && WrapperSidebar.classList.remove("active");
            wrapperOverlay && wrapperOverlay.classList.remove("active");
        }
    });
};

const lazyLoad = () => {
    return new LazyLoad({
        class_applied: "lz-applied",
        class_loading: "lz-loading",
        class_loaded: "lz-loaded",
        class_error: "lz-error",
        class_entered: "lz-entered",
        class_exited: "lz-exited",
    });
};

const scroll_top = function () {
    document
        .getElementById("site-scroll")
        .addEventListener("click", function () {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
};

document.addEventListener("scroll", () => {
    const scroll = document.getElementById("site-scroll")
    const header = document.querySelector('.header')

    if (window.scrollY > 400) {
        scroll.style.opacity = "1";
        scroll.style.visibility = "visible";
        header.classList.add('sticky-header', 'position-fixed', 'top-0', 'left-0', 'w-100', 'bg-white', 'w-100', 'transition')
    } else {
        scroll.style.opacity = "0";
        scroll.style.visibility = "hidden";
        header.classList.remove('sticky-header', 'position-fixed', 'top-0', 'left-0', 'w-100', 'bg-white', 'w-100', 'transition')
    }
});

const thumbGallery = function (imageNumber) {
    const sliderElement = document.getElementById('pgallery');
    swiffyslider.slideTo(sliderElement, imageNumber)
}

var getSiblings = function (elem) {
    const siblings = [];
    let sibling = elem.parentNode.firstChild;
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
};

const tabActive = function (wrapper) {
    let tabContainer = document.querySelector(wrapper);

    if (tabContainer) {
        tabContainer.addEventListener("click", function (evt) {
            let listItem = evt.target;

            if (listItem.hasAttribute("data-toggle")) {
                let targetId = listItem.dataset.target,
                    targetItem = document.querySelector(targetId);

                listItem.parentElement
                    .querySelectorAll('[data-toggle="tab"]')
                    .forEach(function (list) {
                        list.classList.remove("active");
                    });

                listItem.classList.add("active");
                targetItem.classList.add("active");

                setTimeout(function () {
                    targetItem.classList.add("show");
                }, 150);

                getSiblings(targetItem).forEach(function (pane) {
                    pane.classList.remove("show");
                    setTimeout(function () {
                        pane.classList.remove("active");
                    }, 150);
                });
            }
        });
    }
};

lazyLoad();
scroll_top();
tabActive('.product__details--tab');
activeClassAction(".dropdown__toggle", ".dropdown__account");
offcanvsSidebar(".open-cart", ".minicart__header--close", ".section-minicart");
offcanvsSidebar(".open-menu", ".menu__header--close", ".section-menu");
offcanvsSidebar(".open-search", ".search__close", ".section-search");
offcanvsSidebar(".open-quickview", ".modal__header--close", ".section-modal");
