function activateFade(e){e.forEach(e=>{e.isIntersecting&&e.target.classList.add("fade-on-scroll-activate")})}const fadeObserver=new IntersectionObserver(activateFade,{threshold:.3});document.querySelectorAll(".fade-on-scroll").forEach(e=>{fadeObserver.observe(e)});