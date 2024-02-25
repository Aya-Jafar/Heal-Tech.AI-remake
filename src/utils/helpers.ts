import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min";

export const extractPdfText = async (data: string) => {
  const loadingTask = pdfjs.getDocument({ data });
  const pdf = await loadingTask.promise;

  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();

    for (const item of content.items) {
      if ("str" in item) {
        text += item.str;
      } else if ("text" in item) {
        text += item.text;
      }
    }
  }
  return text;
};

export const countTokens = (text: string) => {
  let tokensCount = new Map<string, number>();

  let words = text.split(" ");

  for (let word of words) {
    if (word.length > 0) {
      const count = tokensCount.get(word) || 0;
      tokensCount.set(word, count + 1);
    }
  }
  const totalCount = Array.from(tokensCount.values()).reduce(
    (sum, count) => sum + count,
    0
  );

  return totalCount;
};
