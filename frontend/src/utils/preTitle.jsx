function preTitleShow() {
  const preTitle = [
    "What would you like to search today?",
    "Type your query here...",
    "Ask me anything 👋",
    "Search smarter with UniMind AI",
    "Ready when you are — start typing...",
  ];

  const titleNumber = Math.floor(Math.random() * preTitle.length);
  return preTitle[titleNumber];
}

export default preTitleShow
