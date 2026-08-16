// ============================================================
//  FLAVOURS
//  A flavour wraps the game vocabulary for a region/dialect.
//
//  The "english" flavour is the default. The UI stays in English,
//  but every game term + category/word set lives in `terms` and
//  `categories` so you can drop in a "telugu" (or any) flavour
//  later by copying this shape and translating the values:
//
//  {
//    id: "telugu",
//    label: "తెలుగు",
//    emoji: "🇮🇳",
//    terms: { imposter: "Donga", ... },
//    categories: [ { id, name, emoji, words: [...] } ]  // Telugu words
//  }
//
//  Then just add it to the FLAVOURS array below.
// ============================================================

const englishTerms = {
  title: 'Guess the Imposter',
  imposter: 'Imposter',
  imposters: 'Imposters',
  secretWord: 'Secret Word',
  hint: 'Hint',
  caught: 'Caught',
  notCaught: 'Got away',
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
        ],
      },
      {
        id: 'street',
        name: 'Street Life',
        emoji: '🛺',
        words: [
          'Auto Rickshaw', 'Chaiwala', 'Dabbawala', 'Street Barber', 'Paaniwala',
          'Cobbler', 'Lassi Shop', 'Hawker', 'Rikshaw', 'Mehndi Artist',
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
          'Christmas', 'Lohri',
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
          'Jaipur', 'Kerala', 'Goa', 'Punjab', 'Kashmir', 'Varanasi',
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
    ],
  },
]
