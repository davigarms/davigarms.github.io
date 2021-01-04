const wrapper = document.querySelector(".wrapper");
const sections = Array.from(document.querySelectorAll(".section"));
const themeButton = document.querySelector("li.themes-button button");
const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("nav-button") !== null);
const menuItems = document.querySelectorAll(".side-menu ul li");
const sideMenu = document.querySelector(".side-menu");
const menuButton = document.querySelector(".side-menu-button");
const overlay = document.querySelector(".side-menu .overlay");
const documentTitle = document.title;
let activeIndex;
let isHistoryState = false;

const init = (e) => {
    navButtons.forEach(button =>  button.addEventListener("click", handleNavClick));
    menuItems.forEach(button =>  button.addEventListener("click", handleMenuItemClick));
    themeButton.addEventListener("click", handleThemeClick);
    menuButton.addEventListener("click", handleMenuClick);
    overlay.addEventListener("click", handleMenuClick);
    wrapper.addEventListener("scroll", handleScroll);
    window.addEventListener("popstate", handlePopState);
    setTimeout(() => activateSection(getSectionIndex()), 50);
}

const handleMenuClick = (e) => {
    sideMenu.classList.contains("active") ? sideMenu.classList.remove("active") :  sideMenu.classList.add("active");
}

const handleMenuItemClick = (e) => {
    e.preventDefault();
    gotoSection(document.querySelector(e.target.getAttribute("href")));
    handleMenuClick();
}

const handleThemeClick = (e) => {
    document.body.classList.contains("dark") ? document.body.classList.remove("dark") :  document.body.classList.add("dark");
}

const handleNavClick = (e) => {
    e.preventDefault();
    gotoSection(document.querySelector(e.target.getAttribute("href")));
}

const handlePopState = (e) => {
    isHistoryState = true;
    gotoSection(document.querySelector("#"+history.state.section));
}

const gotoSection = (section) => {
    if (window.innerWidth > 768) {
        section.scrollIntoView({behavior: "smooth"});
    } else {
        section.scrollIntoView();
    }
}

const handleScroll = (e) => {
    setTimeout(() => activateSection(getSectionIndex()), 50);
}

const getSectionIndex = () => {
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
    if (activeIndex===index) return;
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
    if (!isHistoryState) setState(sections[index]);
    if (sections[index].querySelector(".content")) sections[index].querySelector(".content").scrollTop = 0;
}

const setState = (section) => {
    const title = `${section.id.substr(0,1).toUpperCase()+section.id.substr(1)} | ${documentTitle}`;
    if (window.history && window.history.pushState) history.pushState({section: section.id, title }, title, "#" + section.id);
    if (document.title !== history.state.title) document.title = history.state.title;
    isHistoryState = false;
}

window.addEventListener("load", init);

