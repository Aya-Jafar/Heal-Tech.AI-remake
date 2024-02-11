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
