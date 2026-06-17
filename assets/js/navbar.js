const navLinks =
document.querySelectorAll(
    "nav a"
);

window.addEventListener(
    "scroll",
    () => {

        const sections =
        document.querySelectorAll(
            "section"
        );

        let current = "";

        sections.forEach(
            section => {

                const top =
                section.offsetTop - 150;

                const height =
                section.offsetHeight;

                if(
                    pageYOffset >= top &&
                    pageYOffset < top + height
                ){
                    current =
                    section.getAttribute("id");
                }

            }
        );

        navLinks.forEach(
            link => {

                link.classList.remove(
                    "active"
                );

                if(
                    link.getAttribute("href") ===
                    "#" + current
                ){
                    link.classList.add(
                        "active"
                    );
                }

            }
        );

    }
);