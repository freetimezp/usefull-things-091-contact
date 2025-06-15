const cursor = document.getElementById("cursor");
const tl = gsap.timeline({ paused: true });
const tl2 = gsap.timeline({ paused: true });

const flags = [
    `<span class="fi fi-us"></span>`,
    `<span class="fi fi-it"></span>`,
    `<span class="fi fi-ca"></span>`,
    `<span class="fi fi-au"></span>`,
    `<span class="fi fi-ua"></span>`,
    `<span class="fi fi-br"></span>`,
    `<span class="fi fi-tr"></span>`,
    `<span class="fi fi-ch"></span>`,
];

tl.to(cursor, {
    duration: 0.2,
    scale: 1.5,
    opacity: 1,
});

const buttons = document.querySelectorAll(".btn");
const overlayTitle = document.getElementById("title");
const overlayFlag = document.getElementById("flag");

buttons.forEach((button, i) => {
    button.addEventListener("mouseenter", () => {
        gsap.to(cursor, {
            duration: 0.2,
            width: 50,
            height: 50,
            background: "rgba(255, 0, 0, 0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        });

        cursor.innerHTML = flags[i];
        tl.play();
    });

    button.addEventListener("mouseleave", () => {
        gsap.to(cursor, {
            duration: 0.2,
            width: 8,
            height: 8,
            background: "rgba(255, 0, 0, 1)",
        });

        cursor.textContent = "";
        tl.reverse();
    });

    button.addEventListener("click", () => {
        overlayTitle.innerText = button.innerText;
        overlayFlag.innerHTML = flags[i];

        tl2.reversed(!tl2.reversed());
    });
});

document.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
        duration: 0.2,
        x: e.clientX,
        y: e.clientY,
    });
});

document.addEventListener("mouseout", () => {
    cursor.textContent = "";
    tl.reverse();
});

function resetInput() {
    setTimeout(() => {
        document.querySelectorAll(".form input, .form textarea").forEach((input) => {
            input.value = "";
        });

        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
            checkbox.checked = false;
        });
    }, 2000);
}

function openForm() {
    animateOpenForm();

    const closeBtn = document.getElementById("close-btn");
    const submit = document.getElementById("submit");

    closeBtn.onclick = function (e) {
        tl2.reversed(!tl2.reversed());
        resetInput();
    };

    submit.onclick = function (e) {
        tl2.reversed(!tl2.reversed());
    };
}

openForm();

function animateOpenForm() {
    tl2.to(".overlay", 1, {
        right: 0,
        ease: "power4.inOut",
    });

    tl2.to(
        ".overlay-item",
        1,
        {
            top: 0,
            ease: "power3.inOut",
        },
        "-=0.8"
    ).reverse();
}
