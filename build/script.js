let sections = document.getElementsByClassName("about-sect");

for (let i = 1; i < sections.length; i++) {
    sections[i].classList.add("hidden")
}

function toggleActiveAbout(option) {
    let options = document.getElementsByClassName("about-opt");

    for (const opt of options) {
        opt.classList.remove("active");
    }

    for (const section of sections) {
        section.classList.add("hidden")
    }

    document.getElementById(option.id.substring(1)).classList.remove("hidden");
    option.classList.add("active");
}