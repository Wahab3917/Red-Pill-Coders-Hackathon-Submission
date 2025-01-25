import { useState, useEffect } from "react";

export default function TypingEffect() {
  const words = ["BRIDGE", "TECHNOLOGY", "CREATIVITY"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedWord, setDisplayedWord] = useState("");

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setDisplayedWord((prev) => {
        const targetWord = words[currentWordIndex];
        const nextChar = targetWord[prev.length];
        if (nextChar) {
          return prev + nextChar;
        } else {
          clearInterval(typingInterval);
          setTimeout(() => {
            setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
            setDisplayedWord(""); // Reset the word for the next one
          }, 1000);
          return prev;
        }
      });
    }, 150);

    return () => clearInterval(typingInterval);
  }, [currentWordIndex]);

  // Step 1: Inline style object for the typing effect
  const typingEffectStyle = {
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderRight: "3px solid #000", // Cursor effect
    animation: "typing 2s steps(30) 1s forwards", // Adjust duration and steps as needed
  };

  // Step 2: Define the keyframes for the typing effect
  const typingKeyframes = `
    @keyframes typing {
      from {
        width: 0;
      }
      to {
        width: 100%;
      }
    }
  `;

  return (
    <div className="text-center text-4xl font-bold">
      {/* Inject the keyframes style into the component */}
      <style>{typingKeyframes}</style>

      {/* Render the typing effect */}
      <p>
        THE{" "}
        <span style={typingEffectStyle} className="text-primary">
          {displayedWord}
        </span>{" "}
        BETWEEN INNOVATION AND OPPORTUNITY
      </p>
    </div>
  );
}
