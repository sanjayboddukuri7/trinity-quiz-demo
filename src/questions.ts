// Sample questions for Trinity Quiz (Demo). Edit freely: each question needs
// exactly one correct answer (`answer` is the index into `options`).

export type CategoryId = "gk" | "movies" | "science";

export interface Question {
  id: string;
  category: CategoryId;
  text: string;
  options: string[];
  answer: number;
  explain: string;
}

export const CATEGORIES: { id: CategoryId | "mixed"; name: string; blurb: string; icon: string }[] = [
  { id: "gk", name: "General Knowledge", blurb: "Countries, nature and India", icon: "🌍" },
  { id: "movies", name: "Movies", blurb: "Tollywood, Bollywood and Hollywood", icon: "🎬" },
  { id: "science", name: "Science & Tech", blurb: "Space, the human body and computers", icon: "🔬" },
  { id: "mixed", name: "Mixed Bag", blurb: "A bit of everything", icon: "🎲" },
];

export const QUESTIONS: Question[] = [
  // General Knowledge
  { id: "gk1", category: "gk", text: "What is the capital city of Australia?", options: ["Sydney", "Melbourne", "Canberra", "Perth"], answer: 2, explain: "Canberra was chosen as a compromise between Sydney and Melbourne." },
  { id: "gk2", category: "gk", text: "What is India's national animal?", options: ["Lion", "Bengal Tiger", "Elephant", "Peacock"], answer: 1, explain: "The Bengal tiger has been India's national animal since 1973." },
  { id: "gk3", category: "gk", text: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2, explain: "Asia, Africa, North America, South America, Antarctica, Europe and Australia." },
  { id: "gk4", category: "gk", text: "Which is the largest ocean in the world?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: 3, explain: "The Pacific covers about a third of Earth's surface." },
  { id: "gk5", category: "gk", text: "Who wrote India's national anthem, \"Jana Gana Mana\"?", options: ["Bankim Chandra Chatterjee", "Rabindranath Tagore", "Sarojini Naidu", "Subramania Bharati"], answer: 1, explain: "Rabindranath Tagore wrote it; it was adopted in 1950." },
  { id: "gk6", category: "gk", text: "Which gas do plants take in from the air to make food?", options: ["Oxygen", "Nitrogen", "Carbon dioxide", "Hydrogen"], answer: 2, explain: "Plants use carbon dioxide, water and sunlight in photosynthesis." },
  { id: "gk7", category: "gk", text: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2, explain: "2 is the only even prime number." },
  { id: "gk8", category: "gk", text: "Which is the largest planet in our solar system?", options: ["Saturn", "Jupiter", "Neptune", "Earth"], answer: 1, explain: "Jupiter is more than twice as massive as all other planets combined." },

  // Movies
  { id: "mv1", category: "movies", text: "\"Naatu Naatu\" won the Oscar for Best Original Song. Which film is it from?", options: ["Baahubali 2", "Pushpa", "RRR", "KGF Chapter 2"], answer: 2, explain: "RRR's \"Naatu Naatu\" won at the 95th Academy Awards in 2023." },
  { id: "mv2", category: "movies", text: "Who directed the Baahubali films?", options: ["S. S. Rajamouli", "Sukumar", "Prashanth Neel", "Trivikram Srinivas"], answer: 0, explain: "S. S. Rajamouli also directed RRR and Eega." },
  { id: "mv3", category: "movies", text: "Who plays the lead role in \"Pushpa: The Rise\"?", options: ["Ram Charan", "Allu Arjun", "Prabhas", "Mahesh Babu"], answer: 1, explain: "Allu Arjun won the National Award for Best Actor for the role." },
  { id: "mv4", category: "movies", text: "Who composed the music for RRR?", options: ["A. R. Rahman", "Devi Sri Prasad", "M. M. Keeravani", "Thaman S"], answer: 2, explain: "M. M. Keeravani has scored most of Rajamouli's films." },
  { id: "mv5", category: "movies", text: "Which film won Best Picture at the 2024 Oscars?", options: ["Barbie", "Oppenheimer", "Killers of the Flower Moon", "Poor Things"], answer: 1, explain: "Oppenheimer won seven Oscars, including Best Picture." },
  { id: "mv6", category: "movies", text: "Jack Dawson is a character in which film?", options: ["Titanic", "Inception", "The Revenant", "Catch Me If You Can"], answer: 0, explain: "Leonardo DiCaprio played Jack in Titanic (1997)." },
  { id: "mv7", category: "movies", text: "Woody and Buzz Lightyear are the heroes of which film series?", options: ["Shrek", "Cars", "Toy Story", "Despicable Me"], answer: 2, explain: "Toy Story (1995) was the first fully computer-animated feature film." },
  { id: "mv8", category: "movies", text: "The ship \"Black Pearl\" belongs to which film series?", options: ["Pirates of the Caribbean", "The Lord of the Rings", "Harry Potter", "Star Wars"], answer: 0, explain: "It is Captain Jack Sparrow's ship." },

  // Science & Tech
  { id: "sc1", category: "science", text: "What does HTML stand for?", options: ["HyperText Markup Language", "High Tech Modern Language", "Hyperlink Text Making Language", "Home Tool Markup Language"], answer: 0, explain: "HTML is the language every web page is built with." },
  { id: "sc2", category: "science", text: "What is the chemical symbol for gold?", options: ["Go", "Gd", "Au", "Ag"], answer: 2, explain: "Au comes from the Latin word \"aurum\". Ag is silver." },
  { id: "sc3", category: "science", text: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Mercury", "Jupiter"], answer: 1, explain: "Iron oxide (rust) on its surface makes Mars look red." },
  { id: "sc4", category: "science", text: "Who is known as the \"Missile Man of India\"?", options: ["Vikram Sarabhai", "Homi Bhabha", "A. P. J. Abdul Kalam", "C. V. Raman"], answer: 2, explain: "Dr. Kalam led India's missile programme and became the 11th President." },
  { id: "sc5", category: "science", text: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Power Unit", "Core Program Utility", "Central Print Unit"], answer: 0, explain: "The CPU is the \"brain\" that runs a computer's instructions." },
  { id: "sc6", category: "science", text: "At sea level, water boils at what temperature?", options: ["90 °C", "100 °C", "110 °C", "120 °C"], answer: 1, explain: "At higher altitudes it boils at a lower temperature." },
  { id: "sc7", category: "science", text: "Which part of a cell is called its powerhouse?", options: ["Nucleus", "Ribosome", "Mitochondria", "Cell wall"], answer: 2, explain: "Mitochondria turn food into energy the cell can use." },
  { id: "sc8", category: "science", text: "Light travels at roughly what speed?", options: ["3,000 km/s", "30,000 km/s", "300,000 km/s", "3,000,000 km/s"], answer: 2, explain: "About 300,000 km per second, so sunlight reaches us in about 8 minutes." },
];
