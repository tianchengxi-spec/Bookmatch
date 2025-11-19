import { Book } from './types';

export const USER_TAGS = [
  "Sci-Fi Fan",
  "Philosopher",
  "Romantic",
  "Tragedy Lover",
  "Feminist",
  "Political",
  "Dreamer",
  "Realist",
  "History Buff",
  "Rebel"
];

export const BOOKS: Book[] = [
  {
    id: "1",
    title: "1984",
    author: "George Orwell",
    coverUrl: "./images/1984.jpg",
    tags: ["Political", "Sci-Fi", "Realist"],
    description: "A dystopian social science fiction novel and cautionary tale.",
    shelfLocation: "Shelf A-12, Row 3",
    matchThreshold: 2,
    quiz: {
      id: "q1",
      text: "Big Brother is watching. How does that make you feel?",
      options: [
        { text: "Safe. Order is necessary.", isCorrect: false },
        { text: "Terrified. Freedom is essential.", isCorrect: true },
        { text: "Indifferent. I have nothing to hide.", isCorrect: false }
      ]
    }
  },
  {
    id: "2",
    title: "A Room of One's Own",
    author: "Virginia Woolf",
    coverUrl: "./images/A Room of One's Own.jpg",
    tags: ["Feminist", "Philosopher", "History Buff"],
    description: "An extended essay on women and fiction.",
    shelfLocation: "Shelf B-04, Row 1",
    matchThreshold: 2,
    quiz: {
      id: "q2",
      text: "What does a woman need to write fiction?",
      options: [
        { text: "A tragic backstory.", isCorrect: false },
        { text: "Money and a room of her own.", isCorrect: true },
        { text: "A muse.", isCorrect: false }
      ]
    }
  },
  {
    id: "3",
    title: "Dune",
    author: "Frank Herbert",
    coverUrl: "./images/Dune.jpg",
    tags: ["Sci-Fi", "Political", "Philosophy"],
    description: "A mythic and emotionally charged hero's journey.",
    shelfLocation: "Shelf S-01, Row 4",
    matchThreshold: 2,
    quiz: {
      id: "q3",
      text: "Fear is the...",
      options: [
        { text: "Mind-killer.", isCorrect: true },
        { text: "Natural reaction.", isCorrect: false },
        { text: "Path to the dark side.", isCorrect: false }
      ]
    }
  },
  {
    id: "4",
    title: "Educated",
    author: "Tara Westover",
    coverUrl: "./images/Educated.jpg",
    tags: ["Realist", "Tragedy Lover", "History Buff"],
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family.",
    shelfLocation: "Shelf M-09, Row 2",
    matchThreshold: 1,
    quiz: {
      id: "q4",
      text: "Is it ever too late to change who you are?",
      options: [
        { text: "Yes, our roots define us.", isCorrect: false },
        { text: "No, transformation is always possible.", isCorrect: true }
      ]
    }
  },
  {
    id: "5",
    title: "Flowers for Algernon",
    author: "Daniel Keyes",
    coverUrl: "./images/Flowers for Algernon.jpg",
    tags: ["Tragedy Lover", "Sci-Fi", "Philosopher"],
    description: "A deep dive into intelligence and emotion.",
    shelfLocation: "Shelf F-02, Row 5",
    matchThreshold: 2,
    quiz: {
      id: "q5",
      text: "Would you trade your happiness for intelligence?",
      options: [
        { text: "Ignorance is bliss.", isCorrect: false },
        { text: "I want to know everything, whatever the cost.", isCorrect: true }
      ]
    }
  },
  {
    id: "6",
    title: "Harry Potter and the Deathly Hallows",
    author: "J.K. Rowling",
    coverUrl: "./images/Harry Potter and the Deathly Hallows.jpg",
    tags: ["Dreamer", "Rebel", "Romantic"],
    description: "The finale of the wizarding world saga.",
    shelfLocation: "Shelf Y-07, Row 3",
    matchThreshold: 1,
    quiz: {
      id: "q6",
      text: "Which Hallow would you choose?",
      options: [
        { text: "The Elder Wand (Power)", isCorrect: false },
        { text: "The Resurrection Stone (Love)", isCorrect: false },
        { text: "The Invisibility Cloak (Wisdom)", isCorrect: true }
      ]
    }
  },
  {
    id: "7",
    title: "Neuromancer",
    author: "William Gibson",
    coverUrl: "./images/Neuromancer.jpg",
    tags: ["Sci-Fi", "Rebel", "Political"],
    description: "The novel that founded the cyberpunk genre.",
    shelfLocation: "Shelf S-08, Row 1",
    matchThreshold: 2,
    quiz: {
      id: "q7",
      text: "High tech, low life. Does this appeal to you?",
      options: [
        { text: "Sounds gritty and exciting.", isCorrect: true },
        { text: "I prefer clean utopias.", isCorrect: false }
      ]
    }
  },
  {
    id: "8",
    title: "Solaris",
    author: "Stanislaw Lem",
    coverUrl: "./images/Solaris.jpg",
    tags: ["Sci-Fi", "Philosopher", "Tragedy Lover"],
    description: "A philosophical novel about human inability to communicate with alien intelligence.",
    shelfLocation: "Shelf S-11, Row 2",
    matchThreshold: 2,
    quiz: {
      id: "q8",
      text: "If an ocean could think, what would it dream of?",
      options: [
        { text: "Conquest.", isCorrect: false },
        { text: "Our deepest, darkest memories.", isCorrect: true },
        { text: "Mathematical equations.", isCorrect: false }
      ]
    }
  },
  {
    id: "9",
    title: "The Unbearable Lightness of Being",
    author: "Milan Kundera",
    coverUrl: "./images/The Unbearable Lightness of Being.jpg",
    tags: ["Philosopher", "Romantic", "Political"],
    description: "A story of love and politics in Czechoslovakia.",
    shelfLocation: "Shelf C-03, Row 4",
    matchThreshold: 2,
    quiz: {
      id: "q9",
      text: "Which is heavier: burden or emptiness?",
      options: [
        { text: "The burden of responsibility.", isCorrect: false },
        { text: "The unbearable lightness of having no burden.", isCorrect: true }
      ]
    }
  },
  {
    id: "10",
    title: "Letter From An Unknown Woman",
    author: "James Naremore",
    coverUrl: "./images/Letter From An Unknown Woman.jpg",
    tags: ["Tragedy Lover", "Romantic", "History Buff"],
    description: "A critical analysis of the film adaptation of Zweig's novella.",
    shelfLocation: "Shelf L-01, Row 2",
    matchThreshold: 2,
    quiz: {
      id: "q10",
      text: "Can a love exist entirely in the imagination of one person?",
      options: [
        { text: "Yes, and it is the purest form.", isCorrect: true },
        { text: "No, love requires interaction.", isCorrect: false }
      ]
    }
  },
  {
    id: "11",
    title: "Salome",
    author: "Oscar Wilde",
    coverUrl: "./images/Salome.jpg",
    tags: ["Tragedy Lover", "Rebel", "Dreamer"],
    description: "A tragedy telling the Biblical story of Salome, stepdaughter of the tetrarch Herod Antipas.",
    shelfLocation: "Shelf P-15, Row 1",
    matchThreshold: 2,
    quiz: {
      id: "q11",
      text: "What is the ultimate expression of desire?",
      options: [
        { text: "Possession.", isCorrect: false },
        { text: "Destruction.", isCorrect: true },
        { text: "Submission.", isCorrect: false }
      ]
    }
  },
  {
    id: "12",
    title: "Strait Is The Gate",
    author: "André Gide",
    coverUrl: "./images/Strait Is The Gate.jpg",
    tags: ["Philosopher", "Romantic", "Tragedy Lover"],
    description: "A novel about the failure of love in the face of religious asceticism.",
    shelfLocation: "Shelf G-04, Row 3",
    matchThreshold: 2,
    quiz: {
      id: "q12",
      text: "Is happiness the goal of life?",
      options: [
        { text: "Yes, we are meant to be happy.", isCorrect: false },
        { text: "No, holiness is the goal.", isCorrect: true }
      ]
    }
  },
  {
    id: "13",
    title: "The Baron in the Trees",
    author: "Italo Calvino",
    coverUrl: "./images/The Baron in the Trees.jpg",
    tags: ["Rebel", "Dreamer", "Philosopher"],
    description: "A young baron climbs a tree and vows never to touch the ground again.",
    shelfLocation: "Shelf C-09, Row 5",
    matchThreshold: 2,
    quiz: {
      id: "q13",
      text: "Can you understand the world better from a distance?",
      options: [
        { text: "No, you must be in the thick of it.", isCorrect: false },
        { text: "Yes, perspective changes everything.", isCorrect: true }
      ]
    }
  }
];