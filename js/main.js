const wrapper = document.querySelector(".wrapper");
// const social = document.querySelector(".social");
const sections = Array.from(document.querySelectorAll(".section"));
const themeButton = document.querySelector("li.themes-button button");
const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("nav-button") !== null);
const menuItems = document.querySelectorAll(".side-menu ul li");
const sideMenu = document.querySelector(".side-menu");
const menuButton = document.querySelector(".side-menu-button");
const overlay = document.querySelector(".side-menu .overlay");
let activeIndex;

const init = (e) => {
    navButtons.forEach(button =>  button.addEventListener("click", handleNavClick));
    menuItems.forEach(button =>  button.addEventListener("click", handleMenuItemClick));
    themeButton.addEventListener("click", handleThemeClick);
    menuButton.addEventListener("click", handleMenuClick);
    overlay.addEventListener("click", handleMenuClick);
    wrapper.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);
    activateSection(getSection(wrapper));
}

const handleMenuClick = (e) => {
    sideMenu.classList.contains("active") ? sideMenu.classList.remove("active") :  sideMenu.classList.add("active");
    // social.classList.contains("filter") ? social.classList.remove("filter") :  social.classList.add("filter")
    // sections.forEach(section => section.classList.contains("filter") ? section.classList.remove("filter") :  section.classList.add("filter"));
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
    gotoSection(document.querySelector("#"+history.state.section));
}

const gotoSection = (section) => {
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
     setTimeout(() => activateSection(getSection(e.target)), 10);
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

const activateSection = (index) => {
    if (activeIndex==index) return;
    activeIndex = index;
    sections.forEach((section, i) => {
        menuItems[i].classList.remove('active');
        section.classList.remove('active');
        section.classList.remove('reverted');
        if (i < index)
            section.classList.add('reverted');
    });
    sections[index].classList.add('active');
    menuItems[index].classList.add('active');
    
    if (window.history && window.history.pushState) history.pushState({section: sections[index].id }, document.title, "#" + sections[index].id);
    if (sections[index].querySelector(".content")) sections[index].querySelector(".content").scrollTop = 0;
}

window.addEventListener("load", init);

