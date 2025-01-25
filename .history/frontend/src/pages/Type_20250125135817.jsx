import { useState, useEffect } from "react";

export default function TypingEffect() {
  const words = ["BRIDGE", "TECHNOLOGY", "CREATIVITY"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");
  const [isFlipping, setIsFlipping] = useState(false); // To track the flip animation state

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setIsFlipping(true); // Trigger flip animation
      setDisplayedWord(""); // Start clearing the word

      // Wait for a brief moment to ensure the word disappears before switching
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
        setIsFlipping(false); // Reset flip state after word change
      }, 500); // Delay before switching the word
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(wordChangeInterval);
  }, []);

  // Step 1: Inline style object for the flip effect
  const flipEffectStyle = {
    display: "inline-block",
    animation: isFlipping ? "flip 1s ease-in-out" : "none", // Apply flip only when isFlipping is true
  };

  // Step 2: Define the keyframes for the flip effect
  const flipKeyframes = `
    @keyframes flip {
      0% {
        transform: rotateX(0deg);
        opacity: 1;
      }
      50% {
        transform: rotateX(90deg);
        opacity: 0;
      }
      100% {
        transform: rotateX(0deg);
        opacity: 1;
      }
    }
  `;

  return (
    <div className="text-center text-4xl font-bold">
      {/* Inject the keyframes style into the component */}
      <style>{flipKeyframes}</style>

      {/* Render the flipped typing effect */}
      <p>
        THE{" "}
        <span style={flipEffectStyle} className="text-primary">
          {words[currentWordIndex]}
        </span>{" "}
        BETWEEN INNOVATION AND OPPORTUNITY
      </p>
    </div>
  );
}
