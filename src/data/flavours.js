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
//  words: ['Biryani', { w: 'Varanasi', h: 'river' }, 'Dosa']
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
          'Sambar', 'Curd Rice', 'Kulcha', 'Tandoori Chicken', 'Lassi', 'Bhel Puri',
          'Chutney', 'Pickle', 'Kheer', 'Halwa',
          // Indian + general additions
          'Mango', 'Coconut Water', 'Filter Coffee', 'Egg Roll', 'Fish Curry',
          'Mutton Curry', 'Chapati', 'Hyderabadi Biryani', 'Mysore Pak', 'Appam',
        ],
      },
      {
        id: 'street',
        name: 'Street Life',
        emoji: '🛺',
        words: [
          'Auto Rickshaw', 'Tea Seller', 'Lunch Carrier', 'Street Barber', 'Water Seller',
          'Cobbler', 'Lassi Shop', 'Rickshaw', 'Mehndi Artist',
          'General Store', 'Corner', 'Cart', 'Tea Stall', 'Betel Shop',
          'Fruit Stall', 'Flower Vendor', 'Bus Stop', 'Newspaper Stall', 'Shoe Shine',
          'Cycle Repair', 'Milk Booth', 'Traffic Signal',
          // Indian + general additions (relevant to street)
          'Pani Puri Cart', 'Sweet Shop', 'Cloth Shop', 'Mobile Repair', 'Sugarcane Juice',
          'Peanut Seller', 'Bangle Shop', 'Temple Street', 'Market Crowd', 'Street Light',
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
          'Munna Bhai', 'PK', 'Bajrangi Bhaijaan', 'KGF', 'Drishyam',
          'Pathaan', 'Brahmastra', 'Kantara', 'Jawan',
          // Indian + general additions (relevant: movies)
          'Chennai Express', 'Barfi', 'Taare Zameen Par', 'Singham', 'Don',
          'Kahani', 'Aashiqui', 'Stree', 'Kesari', 'Uri',
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
          'Ranveer Singh', 'Shahid Kapoor', 'Varun Dhawan', 'Kareena Kapoor',
          'Kartik Aaryan', 'Rashmika Mandanna',
          // General + Indian stars (relevant)
          'Akshay Kumar', 'Aishwarya Rai', 'Rajkumar Rao', 'Vicky Kaushal', 'Shraddha Kapoor',
          'Ayushmann Khurrana', 'Kriti Sanon', 'Tiger Shroff',
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
          'Virender Sehwag', 'Yuvraj Singh', 'Kapil Dev', 'Sunil Gavaskar',
          'Harbhajan Singh', 'Anil Kumble', 'Suresh Raina', 'Shikhar Dhawan',
          // Indian + general additions
          'Gautam Gambhir', 'Zaheer Khan', 'Sourav Ganguly', 'Rahul Dravid', 'Shreyas Iyer',
          'Stadium', 'Cricket Bat', 'Cricket Ball',
        ],
      },
      {
        id: 'cricket-terms',
        name: 'Cricket Terms',
        emoji: '🎯',
        words: [
          'Helicopter Shot', 'Yorker', 'Googly', 'Sixer', 'Golden Duck',
          'Powerplay', 'Super Over', 'Century', 'LBW', 'DL Method',
          'Bouncer', 'Doosra', 'Stumped', 'Run Out', 'No Ball',
          'Wide', 'Free Hit', 'Appeal',
          // General cricket terms (relevant)
          'Boundary', 'Wicket', 'Maiden Over', 'Hat Trick', 'Follow On', 'Toss', 'Umpire', 'Crease',
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
          'Vinayaka Chavithi', 'Gudi Padwa', 'Baisakhi', 'Thrissur Pooram',
          'Hornbill Festival', 'Pushkar Fair',
          // Indian + general additions
          'Makar Sankranti', 'Karva Chauth', 'Janmashtami', 'Maha Shivaratri', 'Bihu',
          'Chhath Puja', 'Guru Nanak Jayanti', 'Easter',
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
          'Victoria Memorial', 'Lotus Temple', 'Ajanta Caves', 'Jantar Mantar',
          'Marine Drive', 'Statue of Unity', 'Chennai Central',
          // Indian + general additions (relevant landmarks)
          'Sanchi Stupa', 'Konark Temple', 'Ellora Caves', 'Amber Fort', 'Ganga Ghat',
          'Varanasi Ghat', 'Mysore Dasara', 'Fort Kochi',
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
          'Nagpur', 'Indore', 'Patna', 'Kanpur', 'Surat', 'Bhopal', 'Coimbatore',
          // Indian + general additions (relevant)
          'Chandigarh', 'Shimla', 'Darjeeling', 'Ooty', 'Andaman Islands',
          'Rajasthan', 'Gujarat', 'Tamil Nadu', 'Assam', 'Meghalaya',
        ],
      },
      {
        id: 'mythology',
        name: 'Mythology',
        emoji: '🕉️',
        words: [
          'Hanuman', 'Ganesha', 'Krishna', 'Shiva', 'Lakshmi', 'Ramayana',
          'Mahabharata', 'Ganga', 'Arjuna', 'Ravana', 'Karna', 'Durga',
          'Brahma', 'Vishnu', 'Indra', 'Sita', 'Draupadi', 'Saraswati',
          'Parvati', 'Garuda',
          // Indian + general additions
          'Ayodhya', 'Kurukshetra', 'Vedas', 'Mantra', 'Temple Bell', 'Trishul', 'Peacock Feather', 'Conch',
        ],
      },
      {
        id: 'everyday',
        name: 'Pure Desi Things',
        emoji: '💛',
        words: [
          'Recharge', 'Street Cricket', 'Aunty Network', 'Horn Please',
          'Middle Seat', 'RRR', 'Nail Paint', 'Tea Break', 'Tiffin', 'Rash Driving',
          'Filter Coffee', 'Local Train', 'Bargain', 'Late Night Drive', 'Office Rush',
          'First Day', 'Notice Board', 'Water Bottle', 'Slippers', 'Queue',
          // Indian + general additions (relevant everyday)
          'Power Cut', 'Family Function', 'Festival Sale', 'Traffic Police', 'Cooler', 'Mosquito Coil',
          'Corner Shop', 'Paper Plane',
        ],
      },
      {
        id: 'matchmaking',
        name: 'Wedding Season',
        emoji: '💍',
        words: [
          'Wedding', 'Henna Night', 'Groom Parade', 'Music Night', 'Wedding Feast',
          'Groom', 'Bride', 'Band', 'Engagement', 'Ceremony',
          'Reception', 'Invitation', 'Gift', 'Decor', 'Honeymoon',
          // Indian + general additions
          'Wedding Card', 'Wedding Saree', 'Fire Ritual', 'Seven Rounds', 'Family Photo',
          'Dance Floor', 'Sweet Box', 'Return Gift',
        ],
      },
      {
        id: 'monsoon',
        name: 'Monsoon Feels',
        emoji: '☔',
        words: [
          'Tea', 'Fritters', 'Kabaddi', 'Paper Boat', 'Traffic Jam',
          'Umbrella', 'Rain Dance', 'School Holiday', 'Snack', 'Muddy Ground',
          'Rainbow', 'Flood', 'Potholes', 'Hot Tea', 'Drizzle', 'Thunder',
          // Indian + general additions
          'Raincoat', 'Puddle', 'Hot Soup', 'Lightning', 'Cool Breeze', 'Mud House',
          'Tea Stall', 'Wet Clothes',
        ],
      },
      {
        id: 'education',
        name: 'School & College',
        emoji: '🎒',
        words: [
          'Back Bench', 'Hall Ticket', 'Street Boy', 'Mid-Day Meal', 'Uniform',
          'Attendance', 'Project Copy', 'OTR', 'Exam Hall', 'Brother', 'Sister',
          'Library', 'Canteen', 'Playground', 'Bench', 'Homework', 'Lab', 'Bell',
          // Indian + general additions
          'Class Monitor', 'School Bus', 'Prayer Hall', 'Black Board', 'Chalk', 'Exam Paper', 'Report Card', 'Sports Day',
        ],
      },
      {
        id: 'tamil',
        name: 'Kollywood',
        emoji: '🎞️',
        words: [
          'Rajinikanth', 'Kolaveri Di', 'Superstar', 'Kuppamma', 'Master',
          'Kamal Haasan', 'Vijay', 'Amaran', 'Mersal', 'Kabali',
          'Petta', 'Jailer', 'Vikram', 'Kaithi', '96', 'Asuran', 'Leo', 'Ponniyin Selvan',
          // Indian + general additions
          'Vikram Vedha', 'Sivaji', 'Enthiran', 'Nayagan', 'Anniyan', 'Ghilli', 'Varisu', 'Bigil',
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
          'Uppena', 'Fidaa', 'DJ', 'Sarileru Neekevvaru', 'Sankranthi',
          // Indian + general additions
          'Aravinda Sametha', 'Bharat Ane Nenu', 'Srimanthudu', 'Mirchi', 'Business Man',
          'Temper', 'Janatha Garage', 'Spyder',
        ],
      },
      {
        id: 'south-nouns',
        name: 'South Indian Nouns',
        emoji: '🏠',
        words: [
          // Everyday South Indian household & street nouns
          'Steel Dabba', 'Steel Tumbler', 'Filter Coffee Maker', 'Banana Leaf', 'Coconut Scraper',
          'Wet Grinder', 'Mixie', 'Pressure Cooker', 'Brass Pot', 'Kolam Powder',
          'Incense Stick', 'Kumkum Box', 'Turmeric', 'Curry Leaf', 'Tamarind',
          'Coconut Oil', 'Wooden Cot', 'Coir Mat', 'Steel Kettle', 'Brass Lamp',
          'Jute Bag', 'Slippers', 'Lungi', 'Cotton Saree', 'Bangle Set',
          'Jasmine Garland', 'Betel Leaf', 'Areca Nut', 'Rice Drum', 'Water Pot',
          'Threshold Art', 'Pooja Room', 'Veranda Swing', 'Tulsi Plant',
        ],
      },
      {
        id: 'ajay-list',
        name: 'Ajay List',
        emoji: '🎯',
        words: [
          { w: 'Varanasi', h: 'river' },
          { w: 'Epic', h: 'movie' },
          { w: 'Star', h: 'famous' },
          { w: 'Brother', h: 'family' },
          { w: 'Buddy', h: 'friend' },
          { w: 'Rocket', h: 'space' },
          { w: 'Noodles', h: 'quick' },
          { w: 'Dessert', h: 'sweet' },
          { w: 'Chef', h: 'kitchen' },
          { w: 'King', h: 'hill' },
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
          'Punugulu', 'Appam', 'Bonda', 'Mysore Bonda', 'Rava Dosa',
          'Pootharekulu', 'Ariselu', 'Pappu', 'Curd Rice',
        ],
      },
      {
        id: 'tl-dialogues',
        name: 'Telugu Dialogues',
        emoji: '🗣️',
        words: [
          'Arey Babu', 'Nuvvu Naaku Nachavu', 'Raa Raa', 'Em Ayyindhi',
          'Ekkada Ekkada', 'Cheppanu', 'Vayyo', 'Asalu', 'Sarele', 'Babu Garu',
          'Bagundha', 'Super', 'Chala Baga', 'Avuna', 'Nijamga', 'Aithe',
        ],
      },
      {
        id: 'tl-festivals',
        name: 'Telugu Festivals',
        emoji: '🎉',
        words: [
          'Sankranti', 'Ugadi', 'Dasara', 'Shivaratri', 'Vinayaka Chavithi',
          'Deepavali', 'Holi', 'Rakhi',
          'Bathukamma', 'Bonalu', 'Atla Taddi', 'Muggulu',
        ],
      },
      {
        id: 'tl-cities',
        name: 'Telugu Cities',
        emoji: '🗺️',
        words: [
          'Hyderabad', 'Visakhapatnam', 'Vijayawada', 'Tirupati', 'Warangal',
          'Guntur', 'Kakinada', 'Nellore', 'Anantapur', 'Kurnool',
          'Rajahmundry', 'Karimnagar', 'Khammam', 'Nizamabad', 'Adilabad',
        ],
      },
      {
        id: 'tl-street',
        name: 'Telugu Street',
        emoji: '🛺',
        words: [
          'Auto', 'Chai Hotel', 'Idli Hotel', 'Mirchi Bajji', 'Pani Puri',
          'Gazulu Bazaar', 'Poo Market', 'Pan Shop',
          'Tea Stall', 'Tiffin Center', 'Juice Shop', 'Bus Stand', 'Market',
        ],
      },
      {
        id: 'tl-cricket',
        name: 'Telugu Cricket',
        emoji: '🏏',
        words: [
          'Dhoni', 'Virat Kohli', 'Sachin', 'Rohit Sharma', 'Jadeja',
          'Bumrah', 'IPL', 'Helicopter Shot', 'Yorker', 'Sixer',
          'Century', 'Half Century', 'Wicket', 'Boundary', 'Trophy',
        ],
      },
      {
        id: 'ajay-list',
        name: 'Ajay List',
        emoji: '🎯',
        words: [
          { w: 'Varanasi', h: 'river' },
          { w: 'Epic', h: 'movie' },
          { w: 'Star', h: 'famous' },
          { w: 'Brother', h: 'family' },
          { w: 'Buddy', h: 'friend' },
          { w: 'Rocket', h: 'space' },
          { w: 'Noodles', h: 'quick' },
          { w: 'Dessert', h: 'sweet' },
          { w: 'Chef', h: 'kitchen' },
          { w: 'King', h: 'hill' },
        ],
      },
    ],
  },
]

// Subtle fallback hints — intentionally vague so the imposter gets
// a nudge about the *type* of word, not the word itself. English only.
const SUBTLE_HINT = {
  food: 'taste',
  street: 'street',
  bollywood: 'movie',
  heroes: 'star',
  cricket: 'sport',
  'cricket-terms': 'sport',
  festivals: 'festival',
  landmarks: 'place',
  cities: 'city',
  mythology: 'myth',
  everyday: 'daily',
  matchmaking: 'wedding',
  monsoon: 'rain',
  education: 'school',
  tamil: 'cinema',
  tollywood: 'cinema',
  'south-nouns': 'home',
  'ajay-list': 'friend',
  'tl-tiffins': 'tiffin',
  'tl-dialogues': 'talk',
  'tl-festivals': 'festival',
  'tl-cities': 'city',
  'tl-street': 'street',
  'tl-cricket': 'sport',
  custom: 'custom',
}

// Ensure every word carries an imposter-only hint. Plain-string words are
// enriched to { w, h } where h is a subtle English hint (not the word
// itself). Explicit {w,h} entries (Ajay List) are preserved — they are
// also normalized to English below.
for (const flavour of FLAVOURS) {
  for (const cat of flavour.categories) {
    const fallback = SUBTLE_HINT[cat.id] ?? 'hint'
    cat.words = cat.words.map((w) => (typeof w === 'string' ? { w, h: fallback } : w))
  }
}
