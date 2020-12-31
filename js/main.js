const sections = Array.from(document.querySelectorAll("section"));

const initEvents = () => {
    const wrapper = document.querySelector(".wrapper");
    const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("button-nav") !== null);
    navButtons.forEach(button =>  button.addEventListener("click", handleClick));
    wrapper.addEventListener("scroll", handleScroll);
    activateSection(getSection(wrapper));
}

const handleClick = (e) => {
    e.preventDefault();
    const targetId = document.querySelector(e.target.getAttribute("href"));
    targetId.scrollIntoView({behavior: "smooth"})
}

const handleScroll = (e) => {
    setTimeout(() => activateSection(getSection(e.target)), 300);;
}

const getSection = (wrapper) => {
    let activeIndex = 0;
    sections.forEach((section, index) => {
        if (wrapper.scrollLeft >= section.offsetWidth * index - window.innerWidth/3 && 
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
    if (activeSection.querySelector("ul")) activeSection.querySelector("ul").scrollTop = 0;
}

initEvents();