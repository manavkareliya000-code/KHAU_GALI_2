const form = document.querySelector(".contact-form");

const successMsg = document.getElementById("successMessage");
const errorMsg = document.getElementById("errorMessage");

const nameInput = document.querySelector("input[placeholder='Your name']");
const phoneInput = document.querySelector("input[placeholder='10-digit number']");

if (form) {

    form.addEventListener("submit", function (e) {

        e.preventDefault();

        // hide both first
        successMsg.style.display = "none";
        errorMsg.style.display = "none";

        const name = nameInput.value.trim();
        const phone = phoneInput.value.trim();

        // validation
        if (name === "" || phone === "") {

            errorMsg.style.display = "block";
            return;
        }

        // phone must be 10 digits
        if (!/^\d{10}$/.test(phone)) {

            errorMsg.textContent = "Enter valid 10-digit phone number";
            errorMsg.style.display = "block";
            return;
        }

        // success
        successMsg.style.display = "block";

        form.reset();

        if (name === "") {
            nameInput.classList.add("error");
        }

    });

}