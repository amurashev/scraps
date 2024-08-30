const users = {
  male: [
    {
      firstName: 'John',
      lastName: 'Doe',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/1.jpg',
    },
    {
      firstName: 'Pablo',
      lastName:
        'Diego José Francisco de Paula Juan Nepomuceno María de los Remedios Cipriano de la Santísima Trinidad Ruiz y Picasso',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/2.jpg',
    },
    {
      firstName: 'Sam',
      lastName: 'Cooper',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/male/4.jpg',
    },
  ],
  female: [
    {
      firstName: 'Michel',
      lastName: 'Vain',
      avatarUrl: 'https://xsgames.co/randomusers/assets/avatars/female/3.jpg',
    },
  ],
}

export const getRandomUser = (index = 0, sex: 'male' | 'female' = 'male') => {
  return users[sex][index]
}

const companies = [
  {
    name: 'Quality Standards',
    logo: '/images/logos/quality.png',
    location: 'Paris, France',
  },
  {
    name: 'Check Icon & Success',
    logo: '/images/logos/correct.png',
    location: 'London, UK',
  },
  {
    name: 'ThreeBook',
    logo: '/images/logos/books.png',
    location: 'San Francisco, USA',
  },
  {
    name: 'Hats',
    logo: '/images/logos/mortarboard.png',
    location: 'New York, USA',
  },
  {
    name: 'Flat Computer Ind.',
    logo: '/images/logos/imac.png',
    location: 'Berlin, GErmany',
  },
  {
    name: 'Leaves and nature',
    logo: '/images/logos/leaves.png',
    location: 'Lisbon, Portugal',
  },
]

export const getRandomCompany = (index = 0) => {
  return companies[index]
}

const articles = [
  {
    title: 'Thailand: The Land of Smiles, Spicy Food, and Unexpected Surprises',
    text: "Welcome to Thailand, a country where the smiles are as warm as the weather, the food is as spicy as your wildest dreams, and the surprises come at you faster than you can say 'Pad Thai.' Buckle up for a humorous ride through some of the quirkiest aspects of this incredible country!",
    topic: 'Travel',
    pictureUrl: '/images/articles/thai.jpg',
  },
  {
    title: 'The Secret Lives of Cats: A Pawsitive Comedy',
    text: 'Ever wondered what your feline friend is really up to when you’re not around? Here’s a sneak peek into the top-secret world of cats, where things are a lot funnier than you might expect. Cats and laser pointers have a complex relationship. They treat those little red dots like elusive prey, performing Olympic-level acrobatics to catch them. But let’s be honest—cats know that red dot is a lie. They’re just humoring us, making us think we’ve invented a game that’s as riveting as the hunt for an actual mouse. In reality, they’re just plotting their next nap spot. When you order food in Thailand, you might be asked how spicy you want it. You’ll probably respond with “a little” or “medium,” but what you might not realize is that Thai “medium” can range from “mildly tingly” to “instantaneously sweat-inducing volcanic eruption.” If you’re not sure what to choose, just remember: “little” can still pack a punch that will have you gulping down coconut water like it’s your new best friend.',
    topic: 'Animals',
    pictureUrl: '/images/articles/cat.jpg',
  },
  {
    title: 'How Durian does smell like?',
    text: 'Durian’s sales pitch starts with its reputation. It’s famous for its strong smell, which can be described as everything from “overripe onions” to “smelly gym socks” depending on who you ask. This scent is so potent that many public places, like hotels and public transport, have signs banning it. So, if you’re thinking of buying durian, be prepared for some puzzled looks and the occasional “Are you sure you want that?” from friends.',
    topic: 'Food',
    pictureUrl: '/images/articles/durian.jpg',
  },
  {
    title: 'The Unseen Drama of Football Substitutes',
    text: 'Ever wondered what goes on in the minds of those players warming the bench during a football match? You might think it’s a dull experience, but behind the scenes, the substitute bench is a hotbed of drama, intrigue, and unexpected hilarity. Let’s take a look at the secret lives of football substitutes.',
    topic: 'Sport',
    pictureUrl: '/images/articles/football.jpg',
  },
]

export const getRandomArticle = (index = 0) => {
  return articles[index]
}
