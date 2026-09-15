// ============================================================
//  FLAVOURS
//  A flavour wraps the game vocabulary for a region/dialect.
//  The app UI is ALWAYS English — a flavour only changes the
//  words and a handful of game terms.
//
//  To add a flavour (e.g. a Hinglish/Hyderabadi pack), copy the
//  shape below and translate the categories/terms, then append
//  it to the FLAVOURS array — the flavour picker appears
//  automatically on the setup screen:
//
//  {
//    id: "my-flavour",
//    label: "My Flavour",
//    emoji: "🎉",
//    terms: { ...englishTerms, imposter: "Donga" },
//    categories: [ { id, name, emoji, words: [...] } ]
//  }
//
//  Keep words in English letters (transliterated) — e.g.
//  "Sankranti", not "సంక్రాంతి".
//
//  WORD HINTS (advanced hint for the imposter):
//  Any word can carry a private hint that the imposter may see.
//  Use the { w, h } form — plain strings have no hint:
//
//  words: ['Biryani', { w: 'Varanasi', h: 'babu' }, 'Dosa']
// ============================================================

export const wordText = (w) => (typeof w === 'string' ? w : w.w)
export const wordHint = (w) => (typeof w === 'string' ? null : w.h)

const englishTerms = {
  title: 'Guess the Imposter',
  imposter: 'Imposter',
  imposters: 'Imposters',
  secretWord: 'Secret Word',
  yourWord: 'Your word',
  hint: 'Hint',
  caught: 'Caught',
  notCaught: 'Got away',
  caughtTitle: 'Caught!',
  gotAwayTitle: 'Imposter got away!',
  startGame: 'Start Game',
  passPhone: 'Pass the phone',
  tapToReveal: 'Tap to reveal',
  nextPlayer: 'Next player',
  youAreTheImposter: "You are the imposter!",
  fakeIt: 'Don’t get caught. Blend in!',
  youDontKnow: 'You don’t know the word.',
}

export const FLAVOURS = [
  {
    id: 'english',
    label: 'English',
    emoji: '🇮🇳',
    terms: englishTerms,
    categories: [
      {
        id: 'food',
        name: 'Indian Food',
        emoji: '🍛',
        words: [
          'Biryani', 'Dosa', 'Vada Pav', 'Samosa', 'Pav Bhaji', 'Gulab Jamun',
          'Chole Bhature', 'Pani Puri', 'Litti Chokha', 'Rajma Chawal',
          'Paneer Tikka', 'Masala Dosa', 'Jalebi', 'Kathi Roll', 'Dhokla',
          'Paratha', 'Upma', 'Payasam', 'Rasgulla', 'Laddu', 'Poha', 'Medu Vada',
        ],
      },
      {
        id: 'street',
        name: 'Street Life',
        emoji: '🛺',
        words: [
          'Auto Rickshaw', 'Chaiwala', 'Dabbawala', 'Street Barber', 'Paaniwala',
          'Cobbler', 'Lassi Shop', 'Hawker', 'Rikshaw', 'Mehndi Artist',
          'Kirana', 'Nukkad', 'Thela', 'Chai Tapri', 'Pan Shop',
        ],
      },
      {
        id: 'bollywood',
        name: 'Bollywood Movies',
        emoji: '🎬',
        words: [
          'Sholay', 'DDLJ', '3 Idiots', 'Lagaan', 'Baahubali', 'Dangal',
          'Andhadhun', 'Swades', 'Zindagi Na Milegi Dobara', 'Kuch Kuch Hota Hai',
          'Gully Boy', 'Chhichhore', 'Rang De Basanti', 'Queen', 'Gangs of Wasseypur',
        ],
      },
      {
        id: 'heroes',
        name: 'Bollywood Stars',
        emoji: '⭐',
        words: [
          'Shah Rukh Khan', 'Amitabh Bachchan', 'Aamir Khan', 'Deepika Padukone',
          'Priyanka Chopra', 'Ranbir Kapoor', 'Katrina Kaif', 'Alia Bhatt',
          'Salman Khan', 'Hrithik Roshan', 'Ajay Devgn', 'Anushka Sharma',
        ],
      },
      {
        id: 'cricket',
        name: 'Cricket',
        emoji: '🏏',
        words: [
          'MS Dhoni', 'Sachin Tendulkar', 'Virat Kohli', 'Rohit Sharma',
          'Jasprit Bumrah', 'Ravindra Jadeja', 'KL Rahul', 'Hardik Pandya',
          'Rishabh Pant', 'World Cup Final 2011',
        ],
      },
      {
        id: 'cricket-terms',
        name: 'Cricket Terms',
        emoji: '🎯',
        words: [
          'Helicopter Shot', 'Yorker', 'Googly', 'Sixer', 'Golden Duck',
          'Powerplay', 'Super Over', 'Century', 'LBW', 'DL Method',
        ],
      },
      {
        id: 'festivals',
        name: 'Festivals',
        emoji: '🎉',
        words: [
          'Diwali', 'Holi', 'Eid', 'Pongal', 'Navratri', 'Onam',
          'Raksha Bandhan', 'Ganesh Chaturthi', 'Durga Puja', 'Dussehra',
          'Christmas', 'Lohri', 'Sankranti', 'Ugadi', 'Dasara', 'Shivaratri',
          'Vinayaka Chavithi',
        ],
      },
      {
        id: 'landmarks',
        name: 'Landmarks',
        emoji: '🕌',
        words: [
          'Taj Mahal', 'Charminar', 'Gateway of India', 'Hawa Mahal',
          'Golden Temple', 'India Gate', 'Red Fort', 'Qutub Minar',
          'Mysore Palace', 'Meenakshi Temple', 'Kumbhalgarh Fort',
        ],
      },
      {
        id: 'cities',
        name: 'Cities & States',
        emoji: '🗺️',
        words: [
          'Mumbai', 'Hyderabad', 'Delhi', 'Bengaluru', 'Kolkata', 'Chennai',
          'Jaipur', 'Lucknow', 'Pune', 'Ahmedabad', 'Kerala', 'Goa',
          'Punjab', 'Kashmir', 'Varanasi', 'Amritsar', 'Udaipur', 'Mysore', 'Kochi',
        ],
      },
      {
        id: 'mythology',
        name: 'Mythology',
        emoji: '🕉️',
        words: [
          'Hanuman', 'Ganesha', 'Krishna', 'Shiva', 'Lakshmi', 'Ramayana',
          'Mahabharata', 'Ganga', 'Arjuna', 'Ravana', 'Karna', 'Durga',
        ],
      },
      {
        id: 'everyday',
        name: 'Pure Desi Things',
        emoji: '💛',
        words: [
          'Recharge', 'Gully Cricket', 'Aunty Network', 'Horn Please',
          'Middle Seat', 'RRR', 'Nail Paint', 'Chai Break', 'Tiffin', 'Rash Driving',
        ],
      },
      {
        id: 'matchmaking',
        name: 'Wedding Season',
        emoji: '💍',
        words: [
          'Shaadi', 'Mehndi Night', 'Baraat', 'Sangeet', 'Shaadi Ka Khaana',
          'Dulha', 'Dulhan', 'Band Baaja', 'Roka', 'Kalyanam',
        ],
      },
      {
        id: 'monsoon',
        name: 'Monsoon Feels',
        emoji: '☔',
        words: [
          'Chai', 'Pakora', 'Kabaddi', 'Paper Boat', 'Traffic Jam',
          'Umbrella', 'Rain Dance', 'School Holiday', 'Bajji', 'Muddy Ground',
        ],
      },
      {
        id: 'education',
        name: 'School & College',
        emoji: '🎒',
        words: [
          'Back Bench', 'Hall Ticket', 'Gully Boy', 'Mid-Day Meal', 'Uniform',
          'Attendance', 'Project Copy', 'OTR', 'Exam Hall', 'Brother', 'Didi',
        ],
      },
      {
        id: 'tamil',
        name: 'Kollywood',
        emoji: '🎞️',
        words: [
          'Rajinikanth', 'Kolaveri Di', 'Superstar', 'Kuppamma', 'Master',
          'Kamal Haasan', 'Vijay', 'Amaran', 'Mersal', 'Kabali',
        ],
      },
      {
        id: 'tollywood',
        name: 'Tollywood',
        emoji: '🎭',
        words: [
          'RRR', 'Baahubali', 'Pushpa', 'Arjun Reddy', 'Geetha Govindam',
          'Magadheera', 'Eega', 'Jersey', 'Ala Vaikunthapurramuloo',
          'Gabbar Singh', 'Attarintiki Daaredi', 'Rangasthalam', 'Srimanthudu',
          'Pawan Kalyan', 'Jr NTR', 'Allu Arjun', 'Mahesh Babu', 'SS Rajamouli',
        ],
      },
      {
        id: 'ajay-list',
        name: 'Ajay List',
        emoji: '🎯',
        words: [
          { w: 'Varanasi', h: 'babu' },
          { w: 'Ramayan', h: 'cinema doubt eh' },
          { w: 'Babu', h: 'star' },
          { w: 'bhai', h: 'Cheppanu' },
          { w: 'buddodu', h: 'daddy' },
          { w: 'Maxi', h: 'nasa' },
          { w: 'Maggi', h: '2 min' },
          { w: 'Masqati', h: 'icecream' },
          { w: 'Bawarchi', h: 'sandhya' },
          { w: 'Raja prince', h: 'mountain' },
        ],
      },
    ],
  },
  {
    id: 'telugu',
    label: 'Telugu',
    emoji: '🛕',
    terms: {
      ...englishTerms,
      title: 'Donga ni kanipettu',
      imposter: 'Donga',
      imposters: 'Dongalu',
      youAreTheImposter: 'Abba!!...Nuvve babu ippudu Donga',
      fakeIt: 'Natinchu inka... dorikithe saave neeku!',
      startGame: 'Aadandi Ra Rey!',
      caughtTitle: 'Donga dorikadu!',
      gotAwayTitle: 'Ee Donga, chikkadu... dorakadu!',
    },
    categories: [
      {
        id: 'tl-tiffins',
        name: 'Telugu Tiffins',
        emoji: '🍛',
        words: [
          'Idli', 'Dosa', 'Vada', 'Pesarattu', 'Upma', 'Pulihora',
          'Gongura Pachadi', 'Bobbatlu', 'Payasam', 'Garelu',
        ],
      },
      {
        id: 'tl-dialogues',
        name: 'Telugu Dialogues',
        emoji: '🗣️',
        words: [
          'Arey Babu', 'Nuvvu Naaku Nachavu', 'Raa Raa', 'Em Ayyindhi',
          'Ekkada Ekkada', 'Cheppanu', 'Vayyo', 'Asalu', 'Sarele', 'Babu Garu',
        ],
      },
      {
        id: 'tl-festivals',
        name: 'Telugu Festivals',
        emoji: '🎉',
        words: [
          'Sankranti', 'Ugadi', 'Dasara', 'Shivaratri', 'Vinayaka Chavithi',
          'Deepavali', 'Holi', 'Rakhi',
        ],
      },
      {
        id: 'tl-cities',
        name: 'Telugu Cities',
        emoji: '🗺️',
        words: [
          'Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Warangal',
          'Guntur', 'Kakinada', 'Nellore', 'Anantapur', 'Kurnool',
        ],
      },
      {
        id: 'tl-street',
        name: 'Telugu Street',
        emoji: '🛺',
        words: [
          'Auto', 'Chai Hotel', 'Idli Hotel', 'Mirchi Bajji', 'Pani Puri',
          'Gazulu Bazaar', 'Poo Market', 'Pan Shop',
        ],
      },
      {
        id: 'tl-cricket',
        name: 'Telugu Cricket',
        emoji: '🏏',
        words: [
          'Dhoni', 'Virat Kohli', 'Sachin', 'Rohit Sharma', 'Jadeja',
          'Bumrah', 'IPL', 'Helicopter Shot', 'Yorker', 'Sixer',
        ],
      },
      {
        id: 'ajay-list',
        name: 'Ajay List',
        emoji: '🎯',
        words: [
          { w: 'Varanasi', h: 'babu' },
          { w: 'Ramayan', h: 'cinema doubt eh' },
          { w: 'Babu', h: 'star' },
          { w: 'bhai', h: 'Cheppanu' },
          { w: 'buddodu', h: 'daddy' },
          { w: 'Maxi', h: 'nasa' },
          { w: 'Maggi', h: '2 min' },
          { w: 'Masqati', h: 'icecream' },
          { w: 'Bawarchi', h: 'sandhya' },
          { w: 'Raja prince', h: 'mountain' },
        ],
      },
    ],
  },
]

// Subtle, indianised fallback hints — intentionally vague so the
// imposter gets a nudge about the *type* of word, not the word itself.
// These are common Hindi/Telugu-ish words, not category labels.
const SUBTLE_HINT = {
  food: 'swaad',
  street: 'gully',
  bollywood: 'filmy',
  heroes: 'hero',
  cricket: 'maidaan',
  'cricket-terms': 'maidaan',
  festivals: 'tyohaar',
  landmarks: 'jagah',
  cities: 'shehar',
  mythology: 'katha',
  everyday: 'rozmarra',
  matchmaking: 'shaadi',
  monsoon: 'barsaat',
  education: 'padhai',
  tamil: 'padam',
  tollywood: 'cinema',
  'ajay-list': 'yaarana',
  'tl-tiffins': 'tiffin',
  'tl-dialogues': 'maata',
  'tl-festivals': 'pandaga',
  'tl-cities': 'ooru',
  'tl-street': 'veedhi',
  'tl-cricket': 'aata',
  custom: 'apna',
}

// Ensure every word carries an imposter-only hint. Plain-string words are
// enriched to { w, h } where h is a subtle, common indianised hint
// (not the word itself). Explicit {w,h} entries (Ajay List) are preserved.
for (const flavour of FLAVOURS) {
  for (const cat of flavour.categories) {
    const fallback = SUBTLE_HINT[cat.id] ?? 'desi'
    cat.words = cat.words.map((w) => (typeof w === 'string' ? { w, h: fallback } : w))
  }
}
