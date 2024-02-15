let sections = document.getElementsByClassName("about-sect");
let origTitle = document.title;
window.onblur = () => {
    document.title = "No te vayas..."
};
window.onfocus = () => {
    document.title = origTitle;
};

for (let i = 1; i < sections.length; i++) {
    sections[i].classList.add("hiddenplus")
}

function changeInfoAbout(option) {
    let options = document.getElementsByClassName("about-opt");
    let section = document.getElementById(option.id.substring(1));

    for (const opt of options) {
        opt.classList.remove("active");
    }

    for (const section of sections) {
        section.classList.add("hiddenplus")
    }

    section.classList.add("slide");
    option.classList.add("active");

    setTimeout(() => { section.classList.remove("hiddenplus") }, 200);
    setTimeout(() => { section.classList.remove("slide") }, 400);
}

function changeInfoAboutMobile(event) {
    let options = document.getElementsByClassName("about-opt");
    let section = document.getElementById(event.target.options[event.target.selectedIndex].value);

    for (const opt of options) {
        opt.classList.remove("active");
    }

    for (const section of sections) {
        section.classList.add("hiddenplus")
    }

    section.classList.add("slide");
    document.getElementById("a" + event.target.options[event.target.selectedIndex].value).classList.add("active");

    setTimeout(() => { section.classList.remove("hiddenplus") }, 200);
    setTimeout(() => { section.classList.remove("slide") }, 400);
}

function toggleNavMenu() {
    let header = document.getElementById("header");
    let burguerButton = document.getElementById("burguer-btn")

    for (const icon of burguerButton.children) {
        icon.classList.toggle("hiddenplus");
    }

    header.classList.toggle("active");
}