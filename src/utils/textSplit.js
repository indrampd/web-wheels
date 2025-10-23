import gsap from "gsap";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(SplitText);

export function initTextSplit(splitTextLines, splitTextWords, splitTextChars) {
	const lineTargets = document.querySelectorAll('[data-split="lines"]');
	const wordTargets = document.querySelectorAll('[data-split="words"]');
	const charTargets = document.querySelectorAll('[data-split="chars"]');

	if (splitTextLines) splitTextLines.revert();
	if (splitTextWords) splitTextWords.revert();
	if (splitTextChars) splitTextChars.revert();

	if (lineTargets.length) {
		splitTextLines = SplitText.create(lineTargets, {
			type: "lines",
			linesClass: "line",
			mask: "lines",
		});

		splitTextLines.masks.forEach((mask) => {
			mask.style.width = "fit-content";
		});

		splitTextLines.lines.forEach((line) => {
			const rectange = document.createElement("div");
			rectange.classList.add("line-rectangle");
			rectange.style.position = "absolute";
			rectange.style.inset = "0";
			rectange.style.zIndex = "0";
			rectange.style.transform = "scaleX(0)";
			rectange.style.mixBlendMode = "screen";
			line.parentNode.appendChild(rectange);
		});
	}

	if (wordTargets.length) {
		splitTextWords = SplitText.create(wordTargets, {
			type: "lines, words",
			wordsClass: "word",
			linesClass: "line",
			mask: "lines",
		});
	}

	if (charTargets.length) {
		splitTextChars = SplitText.create(charTargets, {
			type: "words, chars",
			charsClass: "char",
			wordsClass: "word",
			mask: "words",
		});
	}

	return { splitTextLines, splitTextWords, splitTextChars };
}
