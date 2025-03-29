function scrollTrigger() {
    gsap.registerPlugin(ScrollTrigger);

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
}
function loadingAnimation() {
    let timer = document.querySelector(".counter h5")
    let counter = 0

    var tl = gsap.timeline()
    tl.from(".line h1", {
        y: 150,
        delay: 0.5,
        stagger: 0.2,
        duration: 0.3,
    })

    tl.from(".counter h5, h6", {
        y: 150,
        duration: 0.3,
        onStart: function () {
            setInterval(function (params) {
                if (counter < 100) {
                    counter++
                    timer.innerHTML = counter
                } else {
                    counter = 100
                }
            }, 30)

        }
    })

    tl.to(".loader", {
        opacity: 0,
        delay: 3,
        duration: 0.2,
    })

    tl.from(".page1", {
        y: 1600,
        duration: 0.4,
        delay: 0.2,
    })

    tl.from(".page2", {
        opacity: 0
    })

    tl.from(".nav", {
        opacity: 0,
        durarion: 0.4,
    })

    tl.from(".hero h1", {
        y: 60,
        stagger: 0.2,
        durarion: 0.3,
        opacity: 0,
    })

    tl.from(".container", {
        opacity: 0,
        y: 100,
    })
    tl.to(".loader", {
        display: "none"
    })
}
function cursor() {
    document.addEventListener("mousemove", function (dets) {
        const cursor = document.querySelector(".cursor");
        const cursorRect = cursor.getBoundingClientRect();
        const offsetX = cursorRect.width / 2;
        const offsetY = cursorRect.height / 2;

        const minY = offsetY;
        const maxY = window.innerHeight - offsetY;
        const clampedY = Math.max(minY, Math.min(dets.y - offsetY, maxY));

        gsap.to(".cursor", {
            x: dets.x - offsetX,
            y: clampedY,
            duration: 0.1,
            ease: "power2.out"
        });
    });
}
function videoCursor() {
    document.addEventListener('DOMContentLoaded', () => {
        const container = document.querySelector('.container');
        const cursor = document.querySelector('.video-cursor');

        const rect = container.getBoundingClientRect();
        const initialX = rect.width * 0.75 - cursor.offsetWidth / 2; // 70% of container width
        const initialY = rect.height * -0.01 - cursor.offsetHeight / 2; // -10% of container height

        gsap.set(cursor, {
            x: initialX,
            y: initialY,
            opacity: 1
        });

        gsap.to(cursor, {
            duration: 0.1,
            ease: 'power2.out',
            overwrite: 'auto'
        });

        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left - cursor.offsetWidth / 2;
            const y = e.clientY - rect.top - cursor.offsetHeight / 2;

            gsap.set(cursor, {
                x: x,
                y: y,
                opacity: 1
            });
        });

        container.addEventListener('mouseleave', () => {
            gsap.to(cursor, {
                x: initialX,
                y: initialY,
                duration: 0.5, // Smooth transition back
                ease: 'power2.out'
            });
        });
    });
}
function page1animation() {
    Shery.makeMagnet(".links h2", {
        ease: "cubic-bezier(0.23, 1, 0.320, 1)",
        duration: 1,
    });
}

cursor()
scrollTrigger()
loadingAnimation()
page1animation()
videoCursor()



