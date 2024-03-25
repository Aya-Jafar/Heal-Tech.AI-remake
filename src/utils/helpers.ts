import * as pdfjs from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.min";

/**
 *
 * @param file data
 * @returns extracted text from PDF
 */
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

/**
 *
 * @param currentUser | object
 * @returns 1st 2 letter from username
 */
export const get1st2Letters = (currentUser: object) => {
  // If username has 2 names
  if ((currentUser as any)?.displayName.split(" ").length > 1) {
    return `${(currentUser as any)?.displayName[0]}${
      (currentUser as any)?.displayName.split(" ")[1][0]
    }`;
  }
  // If username is only one name
  return `${(currentUser as any)?.displayName[0]}`;
};

/**
 *
 * @param input text for summerization model
 * @returns total  number of words (tokens)  in that text
 */
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
