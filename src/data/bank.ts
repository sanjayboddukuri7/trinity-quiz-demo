// Question bank for Trinity Quiz (Demo): general knowledge from around the world.
// Each question: [question, options, index of the correct option, explanation].
// To add a set, add an entry to SETS; topics and set numbers are worked out automatically.

import type { Question, Quiz, Topic } from '../lib/bank';

type Q = [string, string[], number, string];

const TOPIC_LIST: Omit<Topic, 'quizCount'>[] = [
  { id: 'geography', title: 'World Geography', description: 'Capitals, countries, rivers, mountains and oceans from every continent.', icon: 'globe' },
  { id: 'history', title: 'World History', description: 'Ancient wonders, great empires and the events that shaped the modern world.', icon: 'landmark' },
  { id: 'science', title: 'Science & Nature', description: 'Physics, chemistry, the human body and the living world.', icon: 'atom' },
  { id: 'space-tech', title: 'Space & Technology', description: 'Planets, missions, inventors and the technology we use every day.', icon: 'rocket' },
  { id: 'sports', title: 'Sports', description: 'Football, cricket, the Olympics and the legends of world sport.', icon: 'trophy' },
  { id: 'culture', title: 'Art, Music & Culture', description: 'Famous paintings, books, music and food traditions from around the globe.', icon: 'palette' },
];

const SETS: { topicId: string; title: string; subtitle: string; questions: Q[] }[] = [
  {
    topicId: 'geography', title: 'Set 1', subtitle: 'Capital cities',
    questions: [
      ['What is the capital of Canada?', ['Toronto', 'Ottawa', 'Vancouver', 'Montreal'], 1, 'Queen Victoria chose Ottawa, in Ontario, as the capital in 1857.'],
      ['What is the capital of Japan?', ['Kyoto', 'Osaka', 'Tokyo', 'Hiroshima'], 2, 'Tokyo became the capital in 1868; Kyoto was the imperial capital before that.'],
      ['What is the capital of Brazil?', ['Rio de Janeiro', 'São Paulo', 'Salvador', 'Brasília'], 3, 'Brasília was built as a planned capital and opened in 1960.'],
      ['What is the capital of Egypt?', ['Alexandria', 'Cairo', 'Giza', 'Luxor'], 1, 'Cairo sits on the Nile and is one of Africa\'s largest cities.'],
      ['What is the capital of Kenya?', ['Mombasa', 'Kampala', 'Nairobi', 'Addis Ababa'], 2, 'Nairobi is Kenya\'s capital. Kampala is Uganda\'s and Addis Ababa is Ethiopia\'s.'],
      ['What is the capital of Turkey?', ['Istanbul', 'Ankara', 'Izmir', 'Antalya'], 1, 'Ankara has been the capital since 1923, although Istanbul is the largest city.'],
      ['What is the capital of New Zealand?', ['Auckland', 'Christchurch', 'Wellington', 'Queenstown'], 2, 'Wellington is the capital; Auckland is the largest city.'],
      ['What is the capital of Argentina?', ['Buenos Aires', 'Córdoba', 'Santiago', 'Montevideo'], 0, 'Buenos Aires is the capital. Santiago is Chile\'s capital and Montevideo is Uruguay\'s.'],
      ['What is the capital of South Korea?', ['Busan', 'Incheon', 'Pyongyang', 'Seoul'], 3, 'Seoul is South Korea\'s capital. Pyongyang is the capital of North Korea.'],
      ['What is the capital of Norway?', ['Bergen', 'Oslo', 'Stockholm', 'Helsinki'], 1, 'Oslo is Norway\'s capital. Stockholm is Sweden\'s and Helsinki is Finland\'s.'],
    ],
  },
  {
    topicId: 'geography', title: 'Set 2', subtitle: 'Rivers, mountains and oceans',
    questions: [
      ['Which is the highest mountain above sea level?', ['K2', 'Kangchenjunga', 'Mount Everest', 'Kilimanjaro'], 2, 'Mount Everest, on the Nepal–China border, rises about 8,849 m above sea level.'],
      ['Which is the longest river in Africa?', ['Congo', 'Niger', 'Zambezi', 'Nile'], 3, 'The Nile flows north for about 6,650 km to the Mediterranean Sea.'],
      ['Which is the largest hot desert in the world?', ['Gobi', 'Sahara', 'Kalahari', 'Arabian'], 1, 'The Sahara covers most of North Africa. (Antarctica is the largest cold desert.)'],
      ['Which is the largest country by area?', ['Canada', 'China', 'Russia', 'United States'], 2, 'Russia covers about 17 million km², spanning Europe and Asia.'],
      ['Which is the largest ocean?', ['Atlantic', 'Indian', 'Southern', 'Pacific'], 3, 'The Pacific Ocean covers about a third of Earth\'s surface.'],
      ['Which is the smallest country in the world?', ['Monaco', 'Vatican City', 'San Marino', 'Malta'], 1, 'Vatican City, inside Rome, covers less than half a square kilometre.'],
      ['Which river flows through London?', ['Thames', 'Seine', 'Danube', 'Rhine'], 0, 'The Thames runs through central London. The Seine flows through Paris.'],
      ['The Great Barrier Reef lies off the coast of which country?', ['Indonesia', 'Philippines', 'Australia', 'Fiji'], 2, 'It stretches over 2,300 km along the coast of Queensland, Australia.'],
      ['Mount Kilimanjaro is in which country?', ['Kenya', 'Tanzania', 'Uganda', 'Ethiopia'], 1, 'Kilimanjaro, Africa\'s highest mountain, is in northern Tanzania.'],
      ['Which continent has the most countries?', ['Asia', 'Europe', 'Africa', 'South America'], 2, 'Africa has 54 countries recognised by the United Nations.'],
    ],
  },
  {
    topicId: 'history', title: 'Set 1', subtitle: 'Ancient and medieval world',
    questions: [
      ['Who built the Great Pyramids of Giza?', ['The Romans', 'The ancient Egyptians', 'The Greeks', 'The Persians'], 1, 'They were built as royal tombs for Egyptian pharaohs over 4,500 years ago.'],
      ['Which civilisation built Machu Picchu?', ['Aztec', 'Maya', 'Inca', 'Olmec'], 2, 'The Inca built Machu Picchu high in the Andes of Peru in the 15th century.'],
      ['In which city is the Colosseum?', ['Athens', 'Rome', 'Istanbul', 'Naples'], 1, 'The Colosseum in Rome opened in AD 80 and held up to about 50,000 people.'],
      ['Who was the first Roman emperor?', ['Julius Caesar', 'Nero', 'Augustus', 'Constantine'], 2, 'Augustus became the first emperor in 27 BC. Julius Caesar was a dictator, never emperor.'],
      ['Which Mughal emperor built the Taj Mahal?', ['Akbar', 'Shah Jahan', 'Babur', 'Aurangzeb'], 1, 'Shah Jahan built it in Agra in memory of his wife Mumtaz Mahal.'],
      ['Angkor Wat, in Cambodia, was built by which empire?', ['Khmer', 'Mongol', 'Ottoman', 'Gupta'], 0, 'The Khmer Empire built Angkor Wat in the 12th century.'],
      ['Which Roman city was buried when Mount Vesuvius erupted in AD 79?', ['Florence', 'Pompeii', 'Venice', 'Carthage'], 1, 'Pompeii was preserved under volcanic ash and rediscovered in the 1700s.'],
      ['Which ancient poet is traditionally credited with the Iliad and the Odyssey?', ['Homer', 'Plato', 'Virgil', 'Socrates'], 0, 'Homer is the Greek poet traditionally named as their author.'],
      ['Which civilisation built Chichén Itzá in Mexico?', ['Inca', 'Aztec', 'Maya', 'Toltec'], 2, 'Chichén Itzá was a major Maya city on the Yucatán Peninsula.'],
      ['The Great Wall was built mainly to protect which country?', ['Japan', 'Mongolia', 'Korea', 'China'], 3, 'Chinese dynasties built and rebuilt the wall to defend their northern borders.'],
    ],
  },
  {
    topicId: 'history', title: 'Set 2', subtitle: 'The modern world',
    questions: [
      ['In which year did World War II end?', ['1918', '1939', '1945', '1950'], 2, 'The war ended in 1945, with Germany surrendering in May and Japan in September.'],
      ['Who was the first person to walk on the Moon?', ['Buzz Aldrin', 'Yuri Gagarin', 'Neil Armstrong', 'Michael Collins'], 2, 'Neil Armstrong stepped onto the Moon on 20 July 1969 during Apollo 11.'],
      ['In which year did the Berlin Wall fall?', ['1985', '1989', '1991', '1995'], 1, 'The wall opened on 9 November 1989; Germany reunified in 1990.'],
      ['Who was the first President of the United States?', ['Abraham Lincoln', 'Thomas Jefferson', 'John Adams', 'George Washington'], 3, 'George Washington served as president from 1789 to 1797.'],
      ['Nelson Mandela became president of which country in 1994?', ['Kenya', 'South Africa', 'Zimbabwe', 'Nigeria'], 1, 'He was South Africa\'s first president elected in fully democratic elections.'],
      ['Which famous ship sank in 1912 after hitting an iceberg?', ['Lusitania', 'Titanic', 'Britannic', 'Queen Mary'], 1, 'RMS Titanic sank on its first voyage, from Southampton to New York.'],
      ['In which year did the French Revolution begin?', ['1689', '1776', '1789', '1848'], 2, 'It began in 1789 with the storming of the Bastille on 14 July.'],
      ['Mahatma Gandhi led the independence movement of which country?', ['India', 'Pakistan', 'Sri Lanka', 'South Africa'], 0, 'Gandhi led India\'s non-violent struggle; India became independent in 1947.'],
      ['Who was granted the first US patent for the telephone in 1876?', ['Thomas Edison', 'Nikola Tesla', 'Alexander Graham Bell', 'Guglielmo Marconi'], 2, 'Alexander Graham Bell received the patent in March 1876.'],
      ['In which year was the United Nations founded?', ['1919', '1945', '1955', '1961'], 1, 'The UN was founded in 1945, after World War II, to keep international peace.'],
    ],
  },
  {
    topicId: 'science', title: 'Set 1', subtitle: 'Physics and chemistry',
    questions: [
      ['What is the chemical formula for water?', ['CO2', 'H2O', 'O2', 'NaCl'], 1, 'Each water molecule has two hydrogen atoms and one oxygen atom.'],
      ['Which gas makes up most of Earth\'s atmosphere?', ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], 2, 'Nitrogen is about 78% of the air; oxygen is about 21%.'],
      ['What is the chemical symbol for sodium?', ['So', 'Sd', 'Na', 'S'], 2, 'Na comes from "natrium", the Latin name for sodium.'],
      ['What is the unit of electrical resistance?', ['Volt', 'Ampere', 'Watt', 'Ohm'], 3, 'Resistance is measured in ohms, named after Georg Ohm.'],
      ['Who developed the theory of relativity?', ['Isaac Newton', 'Albert Einstein', 'Niels Bohr', 'Galileo Galilei'], 1, 'Einstein published special relativity in 1905 and general relativity in 1915.'],
      ['What is the pH of pure water at 25 °C?', ['0', '5', '7', '14'], 2, 'A pH of 7 is neutral: neither acidic nor basic.'],
      ['What is the hardest natural substance?', ['Gold', 'Iron', 'Quartz', 'Diamond'], 3, 'Diamond, a form of carbon, is the hardest naturally occurring material.'],
      ['Who described the laws of motion and universal gravitation?', ['Isaac Newton', 'Marie Curie', 'Charles Darwin', 'Michael Faraday'], 0, 'Newton set them out in his book Principia in 1687.'],
      ['Which metal is liquid at room temperature?', ['Lead', 'Mercury', 'Aluminium', 'Tin'], 1, 'Mercury melts at about −39 °C, so it is liquid at room temperature.'],
      ['Sound cannot travel through which of these?', ['Water', 'Steel', 'Air', 'A vacuum'], 3, 'Sound needs a medium such as air or water; a vacuum has none.'],
    ],
  },
  {
    topicId: 'science', title: 'Set 2', subtitle: 'The human body and living world',
    questions: [
      ['What is the largest organ of the human body?', ['Liver', 'Brain', 'Skin', 'Lungs'], 2, 'The skin covers the whole body and protects everything inside it.'],
      ['How many bones does an adult human have?', ['106', '206', '306', '406'], 1, 'Babies have more bones; many fuse together as we grow, leaving 206.'],
      ['What is the largest animal on Earth?', ['African elephant', 'Blue whale', 'Giraffe', 'Whale shark'], 1, 'Blue whales can be about 30 m long and are the largest animals known.'],
      ['What is the fastest land animal?', ['Lion', 'Horse', 'Cheetah', 'Greyhound'], 2, 'A cheetah can sprint at around 100 km/h over short distances.'],
      ['What is the process plants use to make food from sunlight?', ['Respiration', 'Photosynthesis', 'Digestion', 'Evaporation'], 1, 'Plants turn carbon dioxide and water into sugar using light energy.'],
      ['Which blood cells carry oxygen around the body?', ['White blood cells', 'Platelets', 'Red blood cells', 'Plasma cells'], 2, 'Red blood cells contain haemoglobin, which carries oxygen.'],
      ['Which blood type is known as the universal donor?', ['A positive', 'AB positive', 'B negative', 'O negative'], 3, 'O negative red cells can be given to patients of any blood type in an emergency.'],
      ['What do bees collect from flowers to make honey?', ['Pollen', 'Nectar', 'Sap', 'Dew'], 1, 'Bees collect sugary nectar and turn it into honey in the hive.'],
      ['How many chambers does the human heart have?', ['2', '3', '4', '6'], 2, 'Two atria and two ventricles.'],
      ['Which layer of the atmosphere protects us from most of the Sun\'s UV rays?', ['Ozone layer', 'Troposphere', 'Ionosphere', 'Exosphere'], 0, 'The ozone layer, in the stratosphere, absorbs most harmful ultraviolet light.'],
    ],
  },
  {
    topicId: 'space-tech', title: 'Set 1', subtitle: 'Planets and space missions',
    questions: [
      ['Which planet is closest to the Sun?', ['Venus', 'Mercury', 'Mars', 'Earth'], 1, 'Mercury orbits the Sun once every 88 days.'],
      ['Which planet is best known for its bright rings?', ['Jupiter', 'Uranus', 'Saturn', 'Neptune'], 2, 'All four giant planets have rings, but Saturn\'s are by far the brightest.'],
      ['What kind of object is the Sun?', ['A planet', 'A star', 'A comet', 'A moon'], 1, 'The Sun is a star, a huge ball of hot gas powered by nuclear fusion.'],
      ['How many planets are in our solar system?', ['7', '8', '9', '10'], 1, 'Eight: Pluto was reclassified as a dwarf planet in 2006.'],
      ['Who was the first human to travel into space?', ['Neil Armstrong', 'Yuri Gagarin', 'Alan Shepard', 'Valentina Tereshkova'], 1, 'Yuri Gagarin orbited Earth on 12 April 1961.'],
      ['What is the name of our galaxy?', ['Andromeda', 'Milky Way', 'Sombrero', 'Whirlpool'], 1, 'Our solar system is one of billions in the Milky Way galaxy.'],
      ['Which is the hottest planet in our solar system?', ['Mercury', 'Venus', 'Mars', 'Jupiter'], 1, 'Venus\'s thick carbon dioxide atmosphere traps heat, making it hotter than Mercury.'],
      ['Which country\'s Chandrayaan-3 landed near the Moon\'s south pole in 2023?', ['China', 'Japan', 'India', 'Russia'], 2, 'India\'s Chandrayaan-3 lander touched down on 23 August 2023.'],
      ['What is the Hubble?', ['A rocket', 'A space telescope', 'A Mars rover', 'A space station'], 1, 'The Hubble Space Telescope has orbited Earth since 1990.'],
      ['Roughly how long does Earth take to orbit the Sun?', ['24 hours', '30 days', '365 days', '10 years'], 2, 'About 365.25 days, which is why we add a leap day every four years.'],
    ],
  },
  {
    topicId: 'space-tech', title: 'Set 2', subtitle: 'Computers and the internet',
    questions: [
      ['Who founded Microsoft together with Paul Allen?', ['Steve Jobs', 'Bill Gates', 'Mark Zuckerberg', 'Larry Page'], 1, 'Bill Gates and Paul Allen founded Microsoft in 1975.'],
      ['What does "WWW" stand for?', ['World Wide Web', 'Wide World Window', 'Web World Wide', 'World Web Wire'], 0, 'The World Wide Web is the system of linked pages we browse on the internet.'],
      ['Who invented the World Wide Web?', ['Tim Berners-Lee', 'Alan Turing', 'Vint Cerf', 'Charles Babbage'], 0, 'Tim Berners-Lee proposed it in 1989 while working at CERN.'],
      ['Which company makes the iPhone?', ['Samsung', 'Google', 'Apple', 'Nokia'], 2, 'Apple launched the first iPhone in 2007.'],
      ['How many bits are in one byte?', ['4', '8', '16', '32'], 1, 'A byte is 8 bits, enough to store one basic character.'],
      ['What does "AI" stand for?', ['Automatic Internet', 'Artificial Intelligence', 'Advanced Interface', 'Applied Information'], 1, 'Artificial intelligence is software that can learn, reason and solve problems.'],
      ['Which company leads the development of Android?', ['Apple', 'Microsoft', 'Google', 'Meta'], 2, 'Google leads Android, the most widely used mobile operating system.'],
      ['What does "URL" stand for?', ['Uniform Resource Locator', 'Universal Reference Link', 'User Resource Line', 'Unified Routing Label'], 0, 'A URL is the address of a page or file on the web.'],
      ['Which language is used to style the look of web pages?', ['HTML', 'CSS', 'SQL', 'Python'], 1, 'CSS (Cascading Style Sheets) controls colours, fonts and layout.'],
      ['What does "GPS" stand for?', ['General Position Service', 'Global Positioning System', 'Geo Path Satellite', 'Global Phone Signal'], 1, 'GPS uses satellites to work out your location anywhere on Earth.'],
    ],
  },
  {
    topicId: 'sports', title: 'Set 1', subtitle: 'World sports',
    questions: [
      ['How many players does each football (soccer) team have on the pitch?', ['9', '10', '11', '12'], 2, 'Each side fields 11 players, including the goalkeeper.'],
      ['How often is the men\'s FIFA World Cup held?', ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'], 2, 'It has been held every four years since 1930, except during World War II.'],
      ['How many rings are on the Olympic flag?', ['4', '5', '6', '7'], 1, 'The five interlocking rings stand for the union of the five inhabited continents.'],
      ['Which city hosted the 2024 Summer Olympics?', ['Tokyo', 'Los Angeles', 'Paris', 'London'], 2, 'Paris hosted in 2024, a century after it last hosted in 1924.'],
      ['On which surface is Wimbledon played?', ['Clay', 'Grass', 'Hard court', 'Carpet'], 1, 'Wimbledon, in London, is the only Grand Slam played on grass.'],
      ['How many players per team are on a basketball court at one time?', ['5', '6', '7', '11'], 0, 'Each team plays with five players on court.'],
      ['Which sport uses a shuttlecock?', ['Tennis', 'Squash', 'Badminton', 'Table tennis'], 2, 'Badminton is played by hitting a shuttlecock over a net.'],
      ['How long is a marathon?', ['21.1 km', '30 km', '42.195 km', '50 km'], 2, 'The 42.195 km distance comes from the course used at the 1908 London Olympics.'],
      ['In which sport does "love" mean a score of zero?', ['Golf', 'Tennis', 'Cricket', 'Bowling'], 1, 'In tennis, "love" means no points.'],
      ['Sprinter Usain Bolt is from which country?', ['Jamaica', 'United States', 'Kenya', 'Trinidad and Tobago'], 0, 'Bolt holds the 100 m and 200 m world records for Jamaica.'],
    ],
  },
  {
    topicId: 'sports', title: 'Set 2', subtitle: 'Cricket and football legends',
    questions: [
      ['How many players are in a cricket team on the field?', ['9', '10', '11', '12'], 2, 'Each side has 11 players on the field.'],
      ['How many legal balls are bowled in one cricket over?', ['4', '5', '6', '8'], 2, 'A standard over is six legal deliveries.'],
      ['Which team won the first men\'s Cricket World Cup in 1975?', ['Australia', 'England', 'India', 'West Indies'], 3, 'West Indies beat Australia in the final at Lord\'s.'],
      ['Lionel Messi plays for which national team?', ['Spain', 'Argentina', 'Brazil', 'Portugal'], 1, 'Messi captained Argentina to the 2022 World Cup title.'],
      ['Which country won the 2022 FIFA World Cup in Qatar?', ['France', 'Brazil', 'Argentina', 'Croatia'], 2, 'Argentina beat France on penalties after a 3–3 draw.'],
      ['Cristiano Ronaldo is from which country?', ['Spain', 'Brazil', 'Portugal', 'Italy'], 2, 'Ronaldo was born on the Portuguese island of Madeira.'],
      ['Which country has won the most men\'s FIFA World Cups?', ['Germany', 'Italy', 'Argentina', 'Brazil'], 3, 'Brazil has won it five times: 1958, 1962, 1970, 1994 and 2002.'],
      ['The Tour de France is a famous race in which sport?', ['Running', 'Cycling', 'Motor racing', 'Sailing'], 1, 'It is a three-week cycling race held mostly in France each summer.'],
      ['Michael Phelps won a record number of Olympic gold medals in which sport?', ['Athletics', 'Gymnastics', 'Swimming', 'Rowing'], 2, 'Phelps won 23 Olympic gold medals in swimming.'],
      ['Which city will host the 2028 Summer Olympics?', ['Brisbane', 'Los Angeles', 'Paris', 'Madrid'], 1, 'Los Angeles hosts in 2028; Brisbane hosts in 2032.'],
    ],
  },
  {
    topicId: 'culture', title: 'Set 1', subtitle: 'Art and literature',
    questions: [
      ['Who painted the Mona Lisa?', ['Michelangelo', 'Raphael', 'Leonardo da Vinci', 'Rembrandt'], 2, 'Leonardo da Vinci painted it in the early 1500s.'],
      ['In which museum is the Mona Lisa displayed?', ['The British Museum', 'The Louvre', 'The Prado', 'The Uffizi'], 1, 'It hangs in the Louvre in Paris.'],
      ['Who painted "The Starry Night"?', ['Claude Monet', 'Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí'], 2, 'Van Gogh painted it in 1889 in southern France.'],
      ['Who wrote "Romeo and Juliet"?', ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'], 1, 'Shakespeare wrote the tragedy in the 1590s.'],
      ['Who wrote the Harry Potter books?', ['J. R. R. Tolkien', 'Roald Dahl', 'J. K. Rowling', 'C. S. Lewis'], 2, 'J. K. Rowling published the first book in 1997.'],
      ['The Statue of Liberty was a gift from which country to the United States?', ['United Kingdom', 'France', 'Spain', 'Italy'], 1, 'France gave the statue; it was dedicated in New York in 1886.'],
      ['Who wrote "Don Quixote"?', ['Miguel de Cervantes', 'Dante Alighieri', 'Victor Hugo', 'Leo Tolstoy'], 0, 'Cervantes, from Spain, published it in two parts in 1605 and 1615.'],
      ['Who painted the ceiling of the Sistine Chapel?', ['Leonardo da Vinci', 'Michelangelo', 'Botticelli', 'Caravaggio'], 1, 'Michelangelo painted it between 1508 and 1512.'],
      ['Who wrote "War and Peace"?', ['Fyodor Dostoevsky', 'Anton Chekhov', 'Leo Tolstoy', 'Alexander Pushkin'], 2, 'Leo Tolstoy\'s novel about Russia during the Napoleonic wars was published in 1869.'],
      ['Who wrote "The Little Prince"?', ['Antoine de Saint-Exupéry', 'Hans Christian Andersen', 'Lewis Carroll', 'Jules Verne'], 0, 'The French writer and pilot published it in 1943.'],
    ],
  },
  {
    topicId: 'culture', title: 'Set 2', subtitle: 'Music, food and festivals',
    questions: [
      ['Ludwig van Beethoven was born in which country?', ['Austria', 'Germany', 'Italy', 'France'], 1, 'Beethoven was born in Bonn, Germany, in 1770.'],
      ['In which city was Wolfgang Amadeus Mozart born?', ['Vienna', 'Salzburg', 'Prague', 'Munich'], 1, 'Mozart was born in Salzburg, in today\'s Austria, in 1756.'],
      ['How many keys does a standard modern piano have?', ['66', '76', '88', '96'], 2, '88 keys: 52 white and 36 black.'],
      ['Freddie Mercury was the lead singer of which band?', ['The Beatles', 'Queen', 'The Rolling Stones', 'ABBA'], 1, 'Queen\'s hits include "Bohemian Rhapsody".'],
      ['K-pop music comes from which country?', ['Japan', 'China', 'South Korea', 'Thailand'], 2, 'K-pop is Korean popular music, made famous worldwide by groups such as BTS.'],
      ['Sushi is a traditional dish from which country?', ['China', 'Japan', 'Vietnam', 'Korea'], 1, 'Sushi is vinegared rice served with fish, seafood or vegetables.'],
      ['Pizza, in its modern form, comes from which country?', ['Greece', 'France', 'Italy', 'Spain'], 2, 'Modern pizza comes from Naples, in southern Italy.'],
      ['Diwali is widely known as the festival of what?', ['Colours', 'Lights', 'Harvest', 'Kites'], 1, 'Diwali celebrates the victory of light over darkness with lamps and fireworks.'],
      ['The tango dance comes from which country?', ['Brazil', 'Cuba', 'Argentina', 'Mexico'], 2, 'Tango began in Buenos Aires and Montevideo in the late 1800s.'],
      ['Flamenco music and dance come from which country?', ['Portugal', 'Spain', 'Italy', 'Greece'], 1, 'Flamenco comes from Andalusia, in southern Spain.'],
    ],
  },
];

const numberInTopic = new Map<string, number>();
const quizzes: Quiz[] = SETS.map(set => {
  const number = (numberInTopic.get(set.topicId) ?? 0) + 1;
  numberInTopic.set(set.topicId, number);
  const id = `${set.topicId}-${number}`;
  return {
    id,
    topicId: set.topicId,
    number,
    title: set.title,
    subtitle: set.subtitle,
    questions: set.questions.map(([q, options, answer, explanation], i): Question => ({
      id: `${id}-q${i + 1}`,
      q,
      options,
      answer,
      explanation,
    })),
  };
});

const topics: Topic[] = TOPIC_LIST.map(t => ({ ...t, quizCount: numberInTopic.get(t.id) ?? 0 }));

export default { topics, quizzes };
