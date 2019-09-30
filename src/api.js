export const loadNotes = () => {
  const savedItems = JSON.parse(localStorage.getItem("notes"));
  const notesPromise = savedItems
    ? Promise.resolve(savedItems)
    : Promise.resolve([
        {
          id: 1,
          title: "Quick tip: How to turn off Google’s facial recognition",
          content:
            "If you use Android’s “Trusted Face” feature to unlock your device, this has probably been obvious to you. However, the Face Grouping feature of Google Photos and the new Face Match included in Google’s brand new Nest Hub Max also make use of similar face matching technology.",
          status: "New"
        },
        {
          id: 2,
          title: "Cyber threat landscape for the finance sector",
          content:
            "Criminals have been robbing banks for over 200 years. It’s a rotten tradition that continues to this day. In fact, F-Secure’s Cyber threat landscape for the finance sector indicates that it might be getting worse worse, with the cyber attack capabilities of nation-states spreading to more common cyber criminals.",
          status: "Completed"
        },
        {
          id: 3,
          title: "Artificial intelligence is both wonderful and terrifying",
          content:
            "On the one hand, artificial intelligence (AI) is the key to advancing technology far beyond our current capabilities. Its ability to analyze large amounts of data, autonomously evolve to meet dynamic challenges, and surpass the limitations of the human mind, present tremendous possibilities for the future.",
          status: "Not completed"
        }
      ]);

  return notesPromise;
};

export const saveNotes = notes =>
  localStorage.setItem("notes", JSON.stringify(notes)) && loadNotes();
