export const findValidMessage = (messages) => {
  const greetings = [
    "hi",
    "hello",
    "hey",
    "how are you",
    "what is your name",
    "yo",
    "sup",
    "ok",
    "k",
  ];

  for (let msg of messages) {
    if (msg.role !== "user") continue;

    const text = msg.text.trim().toLowerCase();

    // empty
    if (!text) continue;

    // greeting / useless
    if (greetings.includes(text)) continue;

    // too short
    if (text.split(" ").length < 2) continue;

    // meaningful → return FIRST valid msg
    return msg.text;
  }

  return null;
};
