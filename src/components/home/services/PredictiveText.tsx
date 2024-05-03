import React, { useState, useRef, useEffect } from "react";
import fetchSuggestions from "../../../huggingFace/nextWord";
import { useNextWord } from "../../../store/nextWord";

const PredictiveText: React.FC = () => {
  const { userText, setUserText } = useNextWord();

  const [aiText, setAIText] = useState<string>("");

  // const [userText, setUserText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const debounceTimeoutRef = useRef<number | null>(null);
  const contentEditableRef = useRef<HTMLSpanElement>(null);

  let enterPressed = false;

  const isCursorAtEnd = () => {
    const selection = window.getSelection();
    if (!selection || !selection.anchorNode) return false;

    const anchorNode = selection.anchorNode;
    if (anchorNode.nodeType === Node.TEXT_NODE) {
      return selection.anchorOffset === (anchorNode as Text).length;
    }

    return true;
  };

  const handleInput = (e: React.FormEvent<HTMLSpanElement>) => {
    let newText = (e.target as HTMLSpanElement).innerText;
    if (enterPressed && newText.endsWith("\n\n")) {
      // Remove the last newline character
      newText = newText.slice(0, -1);

      // Reset the flag
      enterPressed = false;
    }

    setUserText(newText);
    setAIText("");

    // Check if cursor is at the end
    if (isCursorAtEnd()) {
      // Debounce the API call
      clearTimeout(debounceTimeoutRef.current!);
      debounceTimeoutRef.current = window.setTimeout(() => {
        fetchSuggestions(
          newText,
          setAIText as React.Dispatch<React.SetStateAction<string>>,
          setLoading
        );
      }, 1500);
    }
  };

  const focusContentEditable = () => {
    if (contentEditableRef.current) {
      contentEditableRef.current.focus();
    }
  };

  const setCursorToEnd = (element: HTMLSpanElement) => {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false); // false means collapse to end rather than the start
    selection?.removeAllRanges();
    selection?.addRange(range);
  };

  const acceptSuggestion = () => {
    const contentEditableElement = contentEditableRef.current;
    if (aiText) {
      setUserText((prevUserText: string) => prevUserText + aiText);

      contentEditableElement!.innerText = userText + aiText;
      setAIText("");
      // Set cursor to end after accepting Suggestion
      setCursorToEnd(contentEditableElement!);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Tab") {
      event.preventDefault();
      acceptSuggestion();
    }

    if (event.key === "Enter") {
      // Set the flag to true when Enter is pressed
      enterPressed = true;

      // Allow the default Enter key behavior to occur
      setTimeout(() => {
        const contentEditableElement = contentEditableRef.current;
        const childNodes = Array.from(contentEditableElement!.childNodes);

        // Find the last <br> element
        for (let i = childNodes.length - 1; i >= 0; i--) {
          if ((childNodes[i] as HTMLElement).nodeName === "BR") {
            // Remove the last <br> element
            contentEditableElement!.removeChild(childNodes[i]);
            break; // Exit the loop after removing the <br>
          }
        }

        // Insert an empty text node with a zero-width space
        const emptyTextNode = document.createTextNode("\u200B");
        contentEditableElement!.appendChild(emptyTextNode);

        // Set cursor after the empty text node
        setCursorToEnd(contentEditableElement!);
      }, 0); // SetTimeout with delay of 0 to allow the stack to clear and the <br> to be inserted
    }
  };

  return (
    <div className="model">
      <div onClick={focusContentEditable}>
        <span
          ref={contentEditableRef}
          contentEditable={true}
          suppressContentEditableWarning={true}
          onInput={handleInput}
          className="model-input"
          onKeyDown={handleKeyDown}
        >
          {/* {userText} */}
        </span>

        <span
          style={{
            color: aiText ? "rgba(110, 110, 110, 0.398)" : "white",
          }}
          contentEditable={false}
        >
          {aiText.length > 0 && (
            <>
              {aiText}
              <span
                onClick={() => {
                  acceptSuggestion();
                }}
                className="tab-btn"
              >
                Tab
              </span>
            </>
          )}
        </span>
      </div>
      <div className="text-xs h-10 text-gray-700 italic">
        {aiText?.length > 0 || (loading && <div>loading ai suggestions...</div>)}
      </div>
    </div>
  );
};

export default PredictiveText;
