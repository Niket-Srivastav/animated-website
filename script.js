function loco(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});
// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}
loco()

var clutter = "";

document.querySelector("#page2>h1").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`
    document.querySelector("#page2>h1").innerHTML = clutter;
})

gsap.to("#page2>h1>span",{
    scrollTrigger:{
        trigger:`#page2>h1>span`,
        start:`top bottom`,
        end:`bottom top`,  
        scroller:`#main`,
        scrub:.5,
    },
    stagger:.2,
    color:`#fff`  
})


function canvas(){
    const canvas = document.querySelector("#page3>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});


function files(index) {
  var data = `
  pictures\\frames00007.png
  pictures\\frames00010.png
  pictures\\frames00013.png
  pictures\\frames00016.png
  pictures\\frames00019.png
  pictures\\frames00022.png
  pictures\\frames00025.png
  pictures\\frames00028.png
  pictures\\frames00031.png
  pictures\\frames00034.png
  pictures\\frames00037.png
  pictures\\frames00040.png
  pictures\\frames00043.png
  pictures\\frames00046.png
  pictures\\frames00049.png
  pictures\\frames00052.png
  pictures\\frames00055.png
  pictures\\frames00058.png
  pictures\\frames00061.png
  pictures\\frames00064.png
  pictures\\frames00067.png
  pictures\\frames00070.png
  pictures\\frames00073.png
  pictures\\frames00076.png
  pictures\\frames00079.png
  pictures\\frames00082.png
  pictures\\frames00085.png
  pictures\\frames00088.png
  pictures\\frames00091.png
  pictures\\frames00094.png
  pictures\\frames00097.png
  pictures\\frames00100.png
  pictures\\frames00103.png
  pictures\\frames00106.png
  pictures\\frames00109.png
  pictures\\frames00112.png
  pictures\\frames00115.png
  pictures\\frames00118.png
  pictures\\frames00121.png
  pictures\\frames00124.png
  pictures\\frames00127.png
  pictures\\frames00130.png
  pictures\\frames00133.png
  pictures\\frames00136.png
  pictures\\frames00139.png
  pictures\\frames00142.png
  pictures\\frames00145.png
  pictures\\frames00148.png
  pictures\\frames00151.png
  pictures\\frames00154.png
  pictures\\frames00157.png
  pictures\\frames00160.png
  pictures\\frames00163.png
  pictures\\frames00166.png
  pictures\\frames00169.png
  pictures\\frames00172.png
  pictures\\frames00175.png
  pictures\\frames00178.png
  pictures\\frames00181.png
  pictures\\frames00184.png
  pictures\\frames00187.png
  pictures\\frames00190.png
  pictures\\frames00193.png
  pictures\\frames00196.png
  pictures\\frames00199.png
  pictures\\frames00202.png
 `;
  return data.split("\n")[index];
}

const frameCount = 67;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}


// gsap.to(imageSeq, { ... }):

// This initiates a Tween animation using GSAP (GreenSock Animation Platform). It animates properties of the imageSeq object.
// frame: frameCount - 1,:

// It animates the frame property of the imageSeq object from its current value to frameCount - 1. This means it will go through frames from 1 to frameCount - 1.
// snap: "frame",:

// The snap property ensures that the animation only lands on whole numbers. In this case, it snaps to the closest frame number.
// ease: "none",:

// The ease property is set to "none," meaning there is no easing effect. The transition is linear, providing a constant speed throughout.
// scrollTrigger: { ... },:

// This defines the ScrollTrigger settings for the animation. ScrollTrigger is part of GSAP and allows for triggering animations based on scrolling.

// scrub: 0.5,:

// This enables scrubbing, creating a smooth and responsive animation as you scroll. The value 0.5 indicates the sensitivity or the amount of scrubbing.
// trigger: "#page3",:

// Specifies the trigger element, in this case, the element with the ID "page3". The animation starts when this element enters the viewport.
// start: "top top",:

// Sets the starting position for the animation. In this case, it starts when the top of the trigger element reaches the top of the viewport.
// end: "250% top",:

// Defines the end position for the animation. The animation completes when the trigger element is scrolled 250% of its height beyond the top of the viewport.
// scroller: "#main",:

// Specifies the scroller element. The animation is linked to the scrolling behavior of the element with the ID "main".
// onUpdate: render,:

// This sets the render function as a callback to be executed on every frame of the animation. The render function likely updates the canvas based on the current frame.




gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page3`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page3",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}
canvas()


clutter = "";

document.querySelector("#page4>p").textContent.split("").forEach(function(dets){
    clutter += `<span>${dets}</span>`
    document.querySelector("#page4>p").innerHTML = clutter;
})

gsap.to("#page4>p>span",{
    scrollTrigger:{
        trigger:`#page4>p>span`,
        start:`top bottom`,
        end:`-400% top`,  
        scroller:`#main`,
        scrub:1,
    },
    stagger:.2,
    color:`#fff`  
})


function canvas1(){
    const canvas = document.querySelector("#page5>canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  render();
});


function files(index) {
  var data = `
pictures\\bridges00010.png
pictures\\bridges00013.png
pictures\\bridges00016.png
pictures\\bridges00019.png
pictures\\bridges00022.png
pictures\\bridges00025.png
pictures\\bridges00028.png
pictures\\bridges00031.png
pictures\\bridges00034.png
pictures\\bridges00037.png
pictures\\bridges00040.png
pictures\\bridges00043.png
pictures\\bridges00046.png
pictures\\bridges00049.png
pictures\\bridges00052.png
pictures\\bridges00055.png
pictures\\bridges00058.png
pictures\\bridges00061.png
pictures\\bridges00064.png
pictures\\bridges00067.png
pictures\\bridges00070.png
pictures\\bridges00073.png
pictures\\bridges00076.png
pictures\\bridges00079.png
pictures\\bridges00082.png
pictures\\bridges00085.png
pictures\\bridges00088.png
pictures\\bridges00091.png
pictures\\bridges00094.png
pictures\\bridges00097.png
pictures\\bridges00100.png
pictures\\bridges00103.png
pictures\\bridges00106.png
pictures\\bridges00109.png
pictures\\bridges00112.png
pictures\\bridges00115.png
pictures\\bridges00118.png
pictures\\bridges00121.png
pictures\\bridges00124.png
pictures\\bridges00127.png
pictures\\bridges00130.png
pictures\\bridges00133.png
pictures\\bridges00136.png
pictures\\bridges00139.png
pictures\\bridges00142.png
pictures\\bridges00145.png
pictures\\bridges00148.png
pictures\\bridges00151.png
pictures\\bridges00154.png
pictures\\bridges00157.png
pictures\\bridges00160.png
pictures\\bridges00163.png
 `;
  return data.split("\n")[index];
}

const frameCount = 65;

const images = [];
const imageSeq = {
  frame: 1,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = files(i);
  images.push(img);
}


// gsap.to(imageSeq, { ... }):

// This initiates a Tween animation using GSAP (GreenSock Animation Platform). It animates properties of the imageSeq object.
// frame: frameCount - 1,:

// It animates the frame property of the imageSeq object from its current value to frameCount - 1. This means it will go through frames from 1 to frameCount - 1.
// snap: "frame",:

// The snap property ensures that the animation only lands on whole numbers. In this case, it snaps to the closest frame number.
// ease: "none",:

// The ease property is set to "none," meaning there is no easing effect. The transition is linear, providing a constant speed throughout.
// scrollTrigger: { ... },:

// This defines the ScrollTrigger settings for the animation. ScrollTrigger is part of GSAP and allows for triggering animations based on scrolling.

// scrub: 0.5,:

// This enables scrubbing, creating a smooth and responsive animation as you scroll. The value 0.5 indicates the sensitivity or the amount of scrubbing.
// trigger: "#page3",:

// Specifies the trigger element, in this case, the element with the ID "page3". The animation starts when this element enters the viewport.
// start: "top top",:

// Sets the starting position for the animation. In this case, it starts when the top of the trigger element reaches the top of the viewport.
// end: "250% top",:

// Defines the end position for the animation. The animation completes when the trigger element is scrolled 250% of its height beyond the top of the viewport.
// scroller: "#main",:

// Specifies the scroller element. The animation is linked to the scrolling behavior of the element with the ID "main".
// onUpdate: render,:

// This sets the render function as a callback to be executed on every frame of the animation. The render function likely updates the canvas based on the current frame.




gsap.to(imageSeq, {
  frame: frameCount - 1,
  snap: "frame",
  ease: `none`,
  scrollTrigger: {
    scrub: .5,
    trigger: `#page5`,
    start: `top top`,
    end: `250% top`,
    scroller: `#main`,
  },
  onUpdate: render,
});

images[1].onload = render;

function render() {
  scaleImage(images[imageSeq.frame], context);
}

function scaleImage(img, ctx) {
  var canvas = ctx.canvas;
  var hRatio = canvas.width / img.width;
  var vRatio = canvas.height / img.height;
  var ratio = Math.max(hRatio, vRatio);
  var centerShift_x = (canvas.width - img.width * ratio) / 2;
  var centerShift_y = (canvas.height - img.height * ratio) / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(
    img,
    0,
    0,
    img.width,
    img.height,
    centerShift_x,
    centerShift_y,
    img.width * ratio,
    img.height * ratio
  );
}
ScrollTrigger.create({

  trigger: "#page5",
  pin: true,
  scroller: `#main`,
  start: `top top`,
  end: `250% top`,
});
}
canvas1()
