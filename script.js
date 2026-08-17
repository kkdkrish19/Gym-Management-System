/* =========================================================
   GYMVERSE
   Smart Gym Management System
   Main JavaScript File
   ========================================================= */


/* =========================================================
   TOAST NOTIFICATION
   ========================================================= */

const toast = document.getElementById("toast");


function showToast(message) {

    if (!toast) {
        return;
    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(window.toastTimer);

    window.toastTimer = setTimeout(() => {

        toast.classList.remove("show");

    }, 2800);
}


/* =========================================================
   4-DIGIT MEMBER CHECK-IN
   ========================================================= */

const checkinForm =
    document.getElementById("checkinForm");


if (checkinForm) {

    checkinForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const input =
                document.getElementById(
                    "memberNumber"
                );


            const result =
                document.getElementById(
                    "checkinResult"
                );


            const memberNumber =
                input.value.trim();


            /* Validate four digits */

            if (!/^\d{4}$/.test(memberNumber)) {

                result.className =
                    "result error";

                result.textContent =
                    "Please enter exactly 4 digits.";

                showToast(
                    "Invalid member number."
                );

                return;
            }


            /* Demo member */

            if (memberNumber === "4062") {

                const currentTime =
                    new Date().toLocaleTimeString(
                        [],
                        {
                            hour: "2-digit",
                            minute: "2-digit"
                        }
                    );


                /* Attendance information */

                const checkInData = {

                    memberNumber: "4062",

                    memberName:
                        "Jeet Rangrej",

                    date:
                        new Date()
                            .toLocaleDateString(),

                    time:
                        currentTime

                };


                /* Save attendance */

                localStorage.setItem(
                    "gymverseLastCheckin",
                    JSON.stringify(
                        checkInData
                    )
                );


                /* Success message */

                result.className =
                    "result success";

                result.textContent =
                    `✓ Access granted. Jeet Rangrej checked in at ${currentTime}.`;


                showToast(
                    "✓ Attendance recorded successfully."
                );


                input.value = "";

            }

            else {

                /* Invalid member */

                result.className =
                    "result error";

                result.textContent =
                    "✕ Member number not found. Demo number: 4062.";

                showToast(
                    "Member number does not exist."
                );

            }

        }
    );

}


/* =========================================================
   APPOINTMENT / SESSION BOOKING
   ========================================================= */

const bookingButtons =
    document.querySelectorAll(
        ".book-btn"
    );


bookingButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const sessionName =
                button.dataset.session;


            if (!sessionName) {
                return;
            }


            /* Create appointment */

            const appointment = {

                session:
                    sessionName,

                bookedAt:
                    new Date().toISOString()

            };


            /* Save appointment */

            localStorage.setItem(
                "gymverseAppointment",
                JSON.stringify(
                    appointment
                )
            );


            /* Update button */

            button.textContent =
                "✓ BOOKED";

            button.disabled = true;


            showToast(
                `${sessionName} has been booked successfully.`
            );

        }
    );

});


/* =========================================================
   MEMBERSHIP PLAN SELECTION
   ========================================================= */

const planButtons =
    document.querySelectorAll(
        ".plan-btn"
    );


planButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            const selectedPlan =
                button.dataset.plan;


            if (!selectedPlan) {
                return;
            }


            /* Save selected plan */

            localStorage.setItem(
                "gymverseSelectedPlan",
                selectedPlan
            );


            /* Update UI */

            planButtons.forEach(
                item => {

                    item.textContent =
                        "Select Plan";

                }
            );


            button.textContent =
                "✓ SELECTED";


            showToast(
                `${selectedPlan} membership selected.`
            );

        }
    );

});


/* =========================================================
   LOAD LAST CHECK-IN
   ========================================================= */

function loadLastCheckIn() {

    const savedData =
        localStorage.getItem(
            "gymverseLastCheckin"
        );


    if (!savedData) {
        return;
    }


    try {

        const data =
            JSON.parse(savedData);


        console.log(
            "Last GYMVERSE Check-In:",
            data
        );

    }

    catch (error) {

        console.log(
            "Unable to read saved check-in."
        );

    }

}


/* =========================================================
   LOAD SAVED APPOINTMENT
   ========================================================= */

function loadSavedAppointment() {

    const savedAppointment =
        localStorage.getItem(
            "gymverseAppointment"
        );


    if (!savedAppointment) {
        return;
    }


    try {

        const appointment =
            JSON.parse(
                savedAppointment
            );


        bookingButtons.forEach(
            button => {

                if (
                    button.dataset.session ===
                    appointment.session
                ) {

                    button.textContent =
                        "✓ BOOKED";

                    button.disabled =
                        true;

                }

            }
        );

    }

    catch (error) {

        console.log(
            "Unable to load appointment."
        );

    }

}


/* =========================================================
   LOAD SELECTED MEMBERSHIP
   ========================================================= */

function loadSelectedPlan() {

    const selectedPlan =
        localStorage.getItem(
            "gymverseSelectedPlan"
        );


    if (!selectedPlan) {
        return;
    }


    planButtons.forEach(
        button => {

            if (
                button.dataset.plan ===
                selectedPlan
            ) {

                button.textContent =
                    "✓ SELECTED";

            }

        }
    );

}


/* =========================================================
   NAVIGATION ACTIVE STATE
   ========================================================= */

const navigationLinks =
    document.querySelectorAll(
        ".main-nav a"
    );


navigationLinks.forEach(link => {

    link.addEventListener(
        "click",
        function () {

            navigationLinks.forEach(
                item => {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );

        }
    );

});


/* =========================================================
   SCROLL REVEAL ANIMATION
   ========================================================= */

const cards =
    document.querySelectorAll(
        ".feature-card, .session, .plan, .panel"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(
                    entry => {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.style.opacity =
                                "1";

                            entry.target.style.transform =
                                "translateY(0)";


                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    cards.forEach(card => {

        card.style.opacity = "0";

        card.style.transform =
            "translateY(18px)";

        card.style.transition =
            "opacity .6s ease, transform .6s ease";

        observer.observe(card);

    });

}


/* =========================================================
   INITIALIZATION
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadLastCheckIn();

        loadSavedAppointment();

        loadSelectedPlan();

    }
);