let sections = document.getElementsByClassName("about-sect");

for (let i = 1; i < sections.length; i++) {
    sections[i].classList.add("hidden")
}

function changeInfoAbout(option) {
    let options = document.getElementsByClassName("about-opt");
    let section = document.getElementById(option.id.substring(1));
    console.log(section)

    for (const opt of options) {
        opt.classList.remove("active");
    }

    for (const section of sections) {
        section.classList.add("hidden")
    }

    section.classList.add("slide");
    option.classList.add("active");
    
    setTimeout(() => {section.classList.remove("hidden")}, 200);
    setTimeout(() => {section.classList.remove("slide")}, 400);
}