import React, { useState, useRef, useEffect } from "react";

export default function AutoCompletion() {
  const [inputText, setInputText] = useState<string>("");
  const [placeholderColor, setPlaceholderColor] = useState("white");
  const [appendedText, setAppendedText] = useState<string>("");
  const [newWordColor, setNewWordColor] = useState("gray");

  console.log(inputText);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // Set cursor position at the end of the typed text
    if (textareaRef.current) {
      const preTypedTextLength = " New ".length ;
      const cursorPosition = inputText.length - preTypedTextLength;

      textareaRef.current.selectionStart = cursorPosition;
      textareaRef.current.selectionEnd = cursorPosition;
    }
  }, [inputText]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      setPlaceholderColor("white");

      const preTypedTextLength = " New ".length + 1;
      const cursorPosition = inputText.length + preTypedTextLength;

      if (textareaRef.current) {
        textareaRef.current.selectionStart = cursorPosition;
        textareaRef.current.selectionEnd = cursorPosition;
      }
    }
  };

  const appendText = () => {
    setAppendedText("New ");
    setInputText((prevText) => prevText + ` New `);
  };

  const getLastWord = (text: string) => {
    const words = text.trim().split(" ");
    return words[words.length - 1];
  };

  return (
    <div className="model-page">
      <div className="model-description">
        <h1>Medical Auto Completion</h1>
        <p>
          We used a model named Dialo GPT-large, created by Microsoft in 2019 as
          a general-purpose model. We fine-tuned it on medical domain data (from
          medical books and papers) so that the model can assist doctors in
          enhancing their work.
        </p>
        <br />
        <p>
          Start typing and the AI completion will show up. Hit Tab to apply it.
        </p>
      </div>
      <div className="model">
        <textarea
          ref={textareaRef}
          cols={60}
          rows={40}
          value={inputText}
          onKeyDown={handleKeyDown}
          contentEditable
          onChange={(e) => {
            const newText = e.target.value;
            setInputText(newText);

            if (newText.endsWith(" ")) {
              appendText();
              // console.log(newText);
              // const lastWord = getLastWord(inputText);
              // setAppendedText(lastWord);
              // console.log(lastWord);
            }
          }}
          placeholder="Start typing here..."
          style={{
            color: appendedText != "" ? "gray" : "white",
            fontSize: "15px",
          }}
        ></textarea>
      </div>
    </div>
  );
}
