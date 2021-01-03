const wrapper = document.querySelector(".wrapper");
const sections = Array.from(document.querySelectorAll(".section"));
const themeButton = document.querySelector("ul.themes li button");
const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("button-nav") !== null);


const initEvents = () => {
    navButtons.forEach(button =>  button.addEventListener("click", handleNavClick));
    themeButton.addEventListener("click", handleThemeClick);
    wrapper.addEventListener("scroll", handleScroll);
    activateSection(getSection(wrapper));
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
    themeButton.classList.contains("dark") ? themeButton.classList.remove("dark") :  themeButton.classList.add("dark");
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
    return sections[activeIndex];
}

const activateSection = (activeSection) => {
    sections.forEach((section, index) => {
        section.classList.remove('active');
        section.classList.remove('reverted');
        if (index < sections.indexOf(activeSection))
            section.classList.add('reverted');
    });
    activeSection.classList.add('active');
    if (activeSection.querySelector(".content")) activeSection.querySelector(".content").scrollTop = 0;
}

initEvents();