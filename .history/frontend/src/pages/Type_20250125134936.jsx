import React from "react";

const TypingEffect = () => {
  // Step 1: Define the keyframes for the typing effect
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

  // Step 2: Define the inline styles for the typing effect
  const typingEffectStyle = {
    display: "inline-block",
    overflow: "hidden",
    whiteSpace: "nowrap",
    borderRight: "3px solid #000", // Cursor effect
    animation: "typing 2s steps(30) 1s forwards", // Adjust duration and steps as needed
  };

  return (
    <div className="text-center text-4xl font-bold">
      {/* Step 3: Inject keyframes in the component */}
      <style>{typingKeyframes}</style>

      {/* Step 4: Apply the typing effect on specific text */}
      <p>
        THE <span style={typingEffectStyle}>BRIDGE</span> BETWEEN INNOVATION AND
        OPPORTUNITY
      </p>
    </div>
  );
};

export default TypingEffect;
