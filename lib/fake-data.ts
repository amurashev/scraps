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
