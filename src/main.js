import Lenis from "lenis";
import gsap from "gsap";
import { preloadImages } from "./utils/preloadImages";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import CustomEase from "gsap/CustomEase";
import { initTextSplit } from "./utils/textSplit";
import { initLinesReveal } from "./animations/linesReveal";
import "./style.css";
import { initHorizontalScroll } from "./animations/horizontalScroll";

gsap.registerPlugin(ScrollTrigger, CustomEase);

CustomEase.create("cEase", "0.65, 0.05, 0, 1");
CustomEase.create("cEaseReverse", "1, 0, 0.35, 0.95");
CustomEase.create("cEase2", "0.45,0.2,0.1,1");

gsap.defaults({
	ease: "cEase",
	duration: 1,
});

let lenis = new Lenis({
	lerp: 0.125,
	wheelMultiplier: 0.8,
	gestureOrientation: "vertical",
	normalizeWheel: false,
	smoothTouch: false,
	autoResize: true,
});

lenis.on("scroll", ScrollTrigger.update);

gsap.ticker.add((time) => {
	lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

let splitTextLines, splitTextWords, splitTextChars;

document.fonts.ready.then(() => {
	({ splitTextLines, splitTextWords, splitTextChars } = initTextSplit(
		splitTextLines,
		splitTextWords,
		splitTextChars
	));

	initLinesReveal(splitTextLines);

	window.addEventListener("resize", () => {
		gsap.delayedCall(0.5, () => {
			({ splitTextLines, splitTextWords, splitTextChars } = initTextSplit(
				splitTextLines,
				splitTextWords,
				splitTextChars
			));
			initLinesReveal(splitTextLines);
		});
	});
});

document.addEventListener("DOMContentLoaded", () => {
	if (typeof window.gsap === "undefined") {
		document.documentElement.classList.add("gsap-not-found");
	}
	gsap.set('[data-prevent-flicker="true"], [data-split]', { autoAlpha: 1 });

	initHorizontalScroll();

	preloadImages().then(() => {
		console.log("All images preloaded. Starting animations...");
	});
});
