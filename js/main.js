const wrapper = document.querySelector(".wrapper");
// const social = document.querySelector(".social");
const sections = Array.from(document.querySelectorAll(".section"));
const themeButton = document.querySelector("li.themes-button button");
const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("nav-button") !== null);
const menuItems = document.querySelectorAll(".side-menu ul li");
const sideMenu = document.querySelector(".side-menu");
const menuButton = document.querySelector(".side-menu-button");
const overlay = document.querySelector(".side-menu .overlay");

const init = (e) => {
    navButtons.forEach(button =>  button.addEventListener("click", handleNavClick));
    menuItems.forEach(button =>  button.addEventListener("click", handleMenuItemClick));
    themeButton.addEventListener("click", handleThemeClick);
    menuButton.addEventListener("click", handleMenuClick);
    overlay.addEventListener("click", handleMenuClick);
    wrapper.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);
    activateSection(getSection(wrapper));
    if (window.location.href.indexOf('#')===-1) history.pushState({section: "home"}, document.title, "#home");
}

const handleMenuClick = (e) => {
    sideMenu.classList.contains("active") ? sideMenu.classList.remove("active") :  sideMenu.classList.add("active");
    // social.classList.contains("blur") ? social.classList.remove("blur") :  social.classList.add("blur")
    // sections.forEach(section => section.classList.contains("blur") ? section.classList.remove("blur") :  section.classList.add("blur"));
}

const handleNavClick = (e) => {
    e.preventDefault();
    gotoSection(document.querySelector(e.target.getAttribute("href")));
}

const handleMenuItemClick = (e) => {
    e.preventDefault();
    gotoSection(document.querySelector(e.target.getAttribute("href")));
    handleMenuClick();
}

const handlePopState = (e) => {
    if(e && e.state) {
        location.reload(); 
    }
}

const gotoSection = (section) => {
    if (window.history && window.history.pushState) history.pushState({section: section.id}, document.title, "#" + section.id);
    if (window.innerWidth > 768) {
        section.scrollIntoView({behavior: "smooth"});
    } else {
        section.scrollIntoView();
    }
}

const handleThemeClick = (e) => {
    document.body.classList.contains("dark") ? document.body.classList.remove("dark") :  document.body.classList.add("dark");
}

const handleScroll = (e) => {
    setTimeout(() => activateSection(getSection(e.target)), 300);
}

const getSection = (wrapper) => {
    let activeIndex = 0;
    sections.forEach((section, index) => {
        if (wrapper.scrollLeft >= section.offsetWidth * index - window.innerWidth/2 && 
            wrapper.scrollLeft < section.offsetWidth * (index + 1)) {
            activeIndex = index;
        }
    });
    return activeIndex;
}

const activateSection = (activeIndex) => {
    sections.forEach((section, index) => {
        menuItems[index].classList.remove('active');
        section.classList.remove('active');
        section.classList.remove('reverted');
        if (index < sections.indexOf(activeIndex))
            section.classList.add('reverted');
    });
    sections[activeIndex].classList.add('active');
    menuItems[activeIndex].classList.add('active');
    if (window.history && window.history.pushState) history.pushState({section: sections[activeIndex].id}, document.title, "#" + sections[activeIndex].id);
    if (sections[activeIndex].querySelector(".content")) sections[activeIndex].querySelector(".content").scrollTop = 0;
}

window.addEventListener("load", init);