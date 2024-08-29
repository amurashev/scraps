export const getUserAvatarUrl = (
  index?: number,
  sex: 'male' | 'female' = 'male'
) => `https://xsgames.co/randomusers/assets/avatars/${sex}/${index}.jpg`

const names = {
  first: {
    male: ['John'],
    female: ['Michel'],
  },
  last: {
    male: ['Doe'],
    female: ['Vain'],
  },
}

export const getUserFirstName = (index = 0, sex: 'male' | 'female' = 'male') =>
  names.first[sex][index]

export const getUserLastName = (index = 0, sex: 'male' | 'female' = 'male') =>
  names.last[sex][index]

const cities = ['Paris']
export const getCity = (index = 0) => cities[index]

const companies = [
  {
    name: 'Quality Standards',
    logo: '/logos/quality.png',
    location: 'Paris, France',
  },
  {
    name: 'Check Icon & Success',
    logo: '/logos/correct.png',
    location: 'London, UK',
  },
  {
    name: 'ThreeBook',
    logo: '/logos/books.png',
    location: 'San Francisco, USA',
  },
  {
    name: 'Hats',
    logo: '/logos/mortarboard.png',
    location: 'New York, USA',
  },
  {
    name: 'Flat Computer Ind.',
    logo: '/logos/imac.png',
    location: 'Berlin, GErmany',
  },
  {
    name: 'Leaves and nature',
    logo: '/logos/leaves.png',
    location: 'Lisbon, Portugal',
  },
]

export const getRandomCompany = (index = 0) => {
  return companies[index]
}
