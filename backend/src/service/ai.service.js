const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function chatTextResponse(promt) {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: promt,
  });
  return response.text;
}

async function chatTitleGenerator(firstMsg) {
  try {
    const result = await ai.models.generateContent({
      model: "gemini-1.5-flash",
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `
You are a strict title generator.
Rules:
- If the user message is just a casual greeting (hi, hello, hey, how are you,what is your name etc.), respond with exactly: ignore
- If the user message is meaningful, return only a very short descriptive title if possible give in 3 word and max 6 words.
- Do not include punctuation, emojis, or explanations.
- Return only the title, nothing else.
Now generate a title for:
"${firstMsg}"
            `,
            },
          ],
        },
      ],
    });

    let rawTitle = result.candidates?.[0]?.content?.parts?.[0]?.text || "";
    rawTitle = rawTitle.trim();

    // Fallback enforcement
    if (
      !rawTitle ||
      rawTitle.toLowerCase() === "ignore" ||
      rawTitle.toLowerCase().startsWith("hey")
    ) {
      return "New Chat";
    }

    return rawTitle;
  } catch (err) {
    console.error("Gemini API error:", err);
    return "New Chat";
  }
}

module.exports = { chatTextResponse, chatTitleGenerator };
