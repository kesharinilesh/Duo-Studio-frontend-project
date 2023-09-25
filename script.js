function init(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector(".main"),
    smooth: true,
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy(".main", {
    scrollTop(value) {
        return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
        };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector(".main").style.transform
        ? "transform"
        : "fixed",
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();
}
init();

const crsr=document.querySelector(".cursor");
// var main=document.querySelector(".main");
document.addEventListener("mousemove",function(dets){
    // console.log("hey");
    crsr.style.left=dets.x-3+"px";
    crsr.style.top=dets.y-3+"px";
})




var tl=gsap.timeline({
    scrollTrigger:{trigger:".page1 h1",
    scroller:".main",
    markers:true,
    start:"top 37%",
    end:"top 0",
    scrub:3
    }    
})


tl.to(".page1 h1",{
    x:-1040
},"anim")
tl.to(".page1 h2",{
    x:1280,
    scrub:2
},"anim")
tl.to(".page1 video ",{
    // height:800,
    // scrub:4,
    width:"118%",
}, "anim")

var tl2=gsap.timeline({
    scrollTrigger:{trigger:".page1 h1",
    scroller:".main",
    markers:true,
    start:"top -285%",
    end:"top -286%",
    scrub:2.25
    }    
})
tl2.to(".page2",{
    // color: "#0F0D0D",
    backgroundColor: "#FFFFFF",
},"anim")
tl2.to(".page3",{
    // color: "#0F0D0D",
    backgroundColor: "#FFFFFF",
},"anim")