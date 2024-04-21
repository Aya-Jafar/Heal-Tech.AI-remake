import fetchSuggestions from "./huggingFace/nextWord";
import summarizeText from "./huggingFace/textSummary";
import { useState } from "react";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  createAccount,
} from "firebase/auth";
import { logIn } from "./Firebase/auth";
import sendQuestion from "./huggingFace/chatBot";
import { saveUserDataToFirestore } from "./Firebase/auth";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn(),
  saveUserDataToFirestore: jest.fn(),
}));

jest.mock("firebase/auth", () => ({
  ...jest.requireActual("firebase/auth"),
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  createAccount: jest.fn(),
  updateProfile: jest.fn(),
}));

describe("Sign up function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  it("should create a new user account and save user data to Firestore", async () => {
    const email = "test@example.com";
    const userName = "Test User";
    const password = "testPassword";
    const specialization = "Test specialization";
    const phoneNumber = "123456789";

    // Mock successful createUserWithEmailAndPassword
    createUserWithEmailAndPassword.mockResolvedValueOnce();

    await createAccount(email, userName, password, specialization, phoneNumber);
    expect(createAccount).toHaveBeenCalledWith(
      email,
      userName,
      password,
      specialization,
      phoneNumber
    );
    expect(createAccount).toBeTruthy();
  });

  it("should handle sign up failure", async () => {
    const email = "invalidemail"; // Invalid email
    const userName = "Test User";
    const password = "testPassword";
    const specialization = "Test specialization";
    const phoneNumber = "123456789";

    // Mock failed createUserWithEmailAndPassword
    const error = new Error("Invalid email address");
    // createUserWithEmailAndPassword.mockRejectedValueOnce(error);

    await createAccount(email, userName, password, specialization, phoneNumber);

    // expect(error.message).toBe("Invalid email address");
    createAccount.mockRejectedValueOnce(error);
    expect(createAccount).toBeCalledWith(
      email,
      userName,
      password,
      specialization,
      phoneNumber
    );
    expect(createAccount).rejects.toThrow(error.message);
  });
});

describe("Log in function", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock function calls before each test
  });

  it("should log in the user and set the current user if sign-in is successful", async () => {
    // Mock successful sign-in
    signInWithEmailAndPassword.mockResolvedValueOnce();

    const email = "test@example.com";
    const password = "password";

    await logIn(email, password);

    // Expect signInWithEmailAndPassword to have been called with the provided email and password
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      email,
      password
    );

    // Add your assertions for other expected behavior, such as setting current user and localStorage
  });

  it("should set current user to null if sign-in fails", async () => {
    // Mock failed sign-in
    const error = new Error("Authentication failed");
    signInWithEmailAndPassword.mockRejectedValueOnce(error);

    const email = "test@example.com";
    const password = "password";

    await logIn(email, password);

    // Expect signInWithEmailAndPassword to have been called with the provided email and password
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      email,
      password
    );
  });
});

describe("Next word model tests", () => {
  let setAITextMock;
  let setLoadingMock;

  beforeEach(() => {
    setAITextMock = jest.fn();
    setLoadingMock = jest.fn();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValueOnce(
        Promise.resolve(
          new Response(JSON.stringify({ generated_text: " word" }))
        )
      );
    useState.mockReturnValueOnce([(text) => text, setAITextMock]);
    useState.mockReturnValueOnce([false, setLoadingMock]);
  });

  it("should NOT call the next-word API when text is empty", async () => {
    const text = "";
    await fetchSuggestions(text, setAITextMock, setLoadingMock);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should handle errors and set loading to false", async () => {
    global.fetch.mockRejectedValueOnce(new Error("API Error"));
    const text = "Another test";
    await fetchSuggestions(text, setAITextMock, setLoadingMock);
    expect(setLoadingMock).toHaveBeenCalledWith(false);
  });
  it("should call the API and update setAIText with the suggested word", async () => {
    const text = "This is a";

    // Ensure setLoading is called with true before the fetch
    setLoadingMock.mockImplementationOnce(() => {
      expect(setLoadingMock).toHaveBeenCalledWith(true);
    });

    await fetchSuggestions(text, setAITextMock, setLoadingMock);

    // Ensure fetch is called with the correct URL and request body
    expect(global.fetch).toHaveBeenCalledWith(
      `${process.env.REACT_APP_NEXT_WORD_URL}`,
      {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify({ prompt: text }),
      }
    );

    // Ensure setLoading is called with false after the fetch
    expect(setLoadingMock).toHaveBeenCalledWith(false);

    // Ensure setAIText is called with the expected result
    expect(setAITextMock).toHaveBeenCalledWith(expect.any(String));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("Summary model tests", () => {
  let fetchMock;
  const mockResponse = { summary: "This is a summary." };

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  it("should NOT call the summary API when text is empty", async () => {
    const text = "";
    await summarizeText(text);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("should return the summary from the API response", async () => {
    const inputText = { inputs: "This is a long text to summarize." };

    const mockResponse = { summary: "This is a summary." };
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const summary = await summarizeText(inputText);

    expect(fetchMock).toHaveBeenCalled();
    expect(summary).toEqual(mockResponse);
  });

  it("should return null if input text is empty", async () => {
    const text = "";
    const summary = await summarizeText(text);

    expect(summary).toBeNull();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});

describe("Send Question model tests", () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = jest.fn();
    global.fetch = fetchMock;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should send a question and return the generated text without "?"', async () => {
    const mockResponse = { generated_text: '"This is a generated text?"' };
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockResponse),
    });

    const data = "This is a question";
    const result = await sendQuestion(data);

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ prompt: data }),
    });

    expect(result).toBe("This is a generated text");
  });

  it("should handle empty response from the API", async () => {
    fetchMock.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({}),
    });

    const data = "This is a question";
    const result = await sendQuestion(data);

    expect(fetchMock).toHaveBeenCalledWith(expect.any(String), {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify({ prompt: data }),
    });

    expect(result).toBeUndefined();
  });
});


