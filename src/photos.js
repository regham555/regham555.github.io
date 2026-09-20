export const albums = [
  {
    slug: 'langtang-and-gosaikunda',
    title: 'Langtang and Gosaikunda',
    date: 'April 2025',
    topics: ['Nature', 'Nepal'],
    summary:
      'Langtang Valley, Tserko Ri at 5,000 m, Gosaikunda Lake, and a Himalayan goat on the ridge.',
    photos: [
      {
        src: '/photos/trek1.jpg',
        place: 'Langtang Valley',
        date: 'April 2025',
        caption:
          'On the way to Langtang Valley: a sneak peek of the mountains along the trail, and pink rhododendrons.',
      },
      {
        src: '/photos/trek2.jpg',
        place: 'Tserko Ri',
        date: 'April 2, 2025',
        caption: 'On the way to Tserko Ri peak, 5,000 m.',
      },
      {
        src: '/photos/trek3.jpg',
        place: 'Tserko Ri',
        date: 'April 2, 2025',
        caption: 'Descent from Tserko Ri peak.',
      },
      {
        src: '/photos/trek4.jpg',
        place: 'Tserko Ri',
        date: 'April 2, 2025',
        caption: 'Continuing the descent from Tserko Ri.',
      },
      {
        src: '/photos/trek5.jpg',
        place: 'Tserko Ri',
        date: 'April 2, 2025',
        caption: 'Still descending from Tserko Ri.',
      },
      {
        src: '/photos/trek7.jpg',
        place: 'Gosaikunda',
        date: 'April 6, 2025',
        caption: 'Gosaikunda Lake.',
      },
      {
        src: '/photos/trek8.jpg',
        place: 'Himalayan goat',
        date: 'April 7, 2025',
        caption: 'A Himalayan goat looking from the edge.',
      },
    ],
  },
  {
    slug: 'yosemite-and-tahoe',
    title: 'Yosemite and Tahoe',
    date: 'February – March 2024',
    topics: ['Nature', 'California'],
    summary: 'Personal photos from Yosemite and Tahoe.',
    photos: [
      {
        src: '/photos/yosemite1.jpg',
        place: 'Tahoe',
        date: 'February 23, 2024',
        caption: 'Sunset over Tahoe.',
      },
      {
        src: '/photos/yosemite2.jpg',
        place: 'On the road',
        date: 'March 4, 2024',
        caption: 'A lenticular cloud hanging over the highway.',
      },
      {
        src: '/photos/yosemite3.jpg',
        place: 'Donner Lake',
        date: 'March 12, 2024',
        caption: 'Donner Lake from the top of the hill.',
      },
      {
        src: '/photos/yosemite4.jpg',
        place: 'Yosemite',
        date: 'March 16, 2024',
        caption: 'The river running through the valley.',
      },
      {
        src: '/photos/yosemite5.jpg',
        place: 'Yosemite',
        date: 'March 16, 2024',
        caption: 'On the trail among tall pines.',
      },
      {
        src: '/photos/yosemite6.jpg',
        place: 'Yosemite',
        date: 'March 16, 2024',
        caption: 'Looking down the granite valley.',
      },
      {
        src: '/photos/yosemite7.jpg',
        place: 'Yosemite',
        date: 'March 17, 2024',
        caption: 'A boulder field below the cliffs.',
      },
      {
        src: '/photos/yosemite8.jpg',
        place: 'Yosemite Falls',
        date: 'March 17, 2024',
        caption: 'Yosemite Falls.',
      },
      {
        src: '/photos/yosemite9.jpg',
        place: 'On the road',
        date: 'March 17, 2024',
        caption: 'The reservoir and bridge on the drive.',
      },
      {
        src: '/photos/yosemite10.jpg',
        place: 'El Capitan',
        date: 'March 17, 2024',
        caption: 'El Capitan from the valley floor.',
      },
    ],
  },
]

export function getAlbum(slug) {
  return albums.find((album) => album.slug === slug)
}
