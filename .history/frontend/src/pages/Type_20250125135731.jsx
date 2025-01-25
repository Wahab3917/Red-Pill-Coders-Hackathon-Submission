import { useState, useEffect } from "react";

export default function TypingEffect() {
  const words = ["BRIDGE", "TECHNOLOGY", "CREATIVITY"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  useEffect(() => {
    const wordChangeInterval = setInterval(() => {
      setDisplayedWord(""); // Start by clearing the displayed word
      setTimeout(() => {
        setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
      }, 500); // Wait for 500ms before switching word
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(wordChangeInterval);
  }, []);

  // Step 1: Inline style object for the flip effect
  const flipEffectStyle = {
    display: "inline-block",
    animation: "flip 1s ease-in-out", // Flip effect duration
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
