const sections = Array.from(document.querySelectorAll("section"));

const initEvents = () => {
    const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("button-nav") !== null);
    navButtons.forEach(button =>  button.addEventListener("click", handleClick));
    window.addEventListener("scroll", handleScroll);
    activateSection(getSection());
}

const handleClick = (e) => {
    if (window.innerWidth > 992) {
        e.preventDefault();
        const targetId = document.querySelector(e.target.getAttribute("href"));
        if (window.history && window.history.pushState) history.pushState("", document.title, e.target.getAttribute("href"));
        gsap.to(window, {duration: .75, ease: "power2.inOut", scrollTo: targetId});
    }
}

const handleScroll = (e) => {
    activateSection(getSection());
}

const getSection = () => {
    let activeIndex = 0;
    sections.forEach((section, index) => {
        const next = sections[index+1] === undefined ? sections[index] : sections[index+1];
        if (window.pageXOffset >= section.offsetLeft && 
            window.pageXOffset <= next.offsetLeft) {
            activeIndex = index;
        }
    });
    return sections[activeIndex];
}

const activateSection = (activeSection) => {
    sections.forEach(section => section.classList.remove('active'));
    activeSection.classList.add('active');
}

initEvents();