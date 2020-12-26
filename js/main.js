const initEvents = () => {
    const navButtons = Array.from(document.querySelectorAll("button a")).filter(button => button.getAttribute("button-nav") !== null);
    navButtons.forEach(button =>  button.addEventListener("click", handleClick));
}

const handleClick = (e) => {
    e.preventDefault();
    const targetId = document.querySelector(e.target.getAttribute("href"));
    if (window.history && window.history.pushState) history.pushState("", document.title, e.target.getAttribute("href"));
    gsap.to(window, {duration: 1.5, ease: "power2.inOut", scrollTo:targetId});
}

initEvents();