const wrapper = document.querySelector(".wrapper");
const sections = Array.from(document.querySelectorAll(".section"));
const themeButton = document.querySelector("li.themes-button button");
const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("nav-button") !== null);
const menuButtons = document.querySelectorAll(".side-menu ul li");
const sideMenu = document.querySelector(".side-menu");
const sideMenuButton = document.querySelector(".side-menu-button");
const overlay = document.querySelector(".side-menu .overlay");

const initEvents = () => {
    navButtons.forEach(button =>  button.addEventListener("click", handleNavClick));
    menuButtons.forEach(button =>  button.addEventListener("click", handleMenuClick));
    themeButton.addEventListener("click", handleThemeClick);
    sideMenuButton.addEventListener("click", handleMenuClick);
    overlay.addEventListener("click", handleMenuClick);
    wrapper.addEventListener("scroll", handleScroll);
    activateSection(getSection(wrapper));
}

const handleMenuClick = (e) => {
    sideMenu.classList.contains("active") ? sideMenu.classList.remove("active") :  sideMenu.classList.add("active");
}

const handleNavClick = (e) => {
    e.preventDefault();
    const targetId = document.querySelector(e.target.getAttribute("href"));
    if (window.innerWidth > 768) {
        targetId.scrollIntoView({behavior: "smooth"});
    } else {
        targetId.scrollIntoView();
    }
}

const handleThemeClick = (e) => {
    wrapper.classList.contains("dark") ? wrapper.classList.remove("dark") :  wrapper.classList.add("dark");
}

const handleScroll = (e) => {
    setTimeout(() => activateSection(getSection(e.target)), 300);;
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
        menuButtons[index].classList.remove('active');
        section.classList.remove('active');
        section.classList.remove('reverted');
        if (index < sections.indexOf(activeIndex))
            section.classList.add('reverted');
    });
    sections[activeIndex].classList.add('active');
    menuButtons[activeIndex].classList.add('active');
    if (sections[activeIndex].querySelector(".content")) sections[activeIndex].querySelector(".content").scrollTop = 0;
}

initEvents();