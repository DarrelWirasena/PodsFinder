import podcastImage1 from '../assets/images/nightRide.png';
import podcastImage2 from '../assets/images/Berizik.png';
import podcastImage3 from '../assets/images/deddy.png';

export const dataReviewed = [
  {
    id: 'berizik-ep29', // Contoh ID yang disesuaikan
    image: podcastImage2,
    title: 'BERIZIK',
    episode: 'EP29: Last Playlist Berizik',
    rating: '4.5',
    channelId: 'berizik-channel', // Contoh channelId yang disesuaikan
    channelName: 'Berizik Podcast',
  },
  {
    id: 'sport-1', // Contoh ID yang disesuaikan
    image: podcastImage1,
    title: 'Analisis Pertandingan',
    episode: 'Pertandingan Liga 1',
    rating: '4.5',
    channelId: 'dunia-olahraga-channel', // Contoh channelId yang disesuaikan
    channelName: 'DUNIA OLAHRAGA',
  },
  {
    id: 'culture-1', // Contoh ID yang disesuaikan
    image: podcastImage3,
    title: 'Tradisi Nusantara',
    episode: 'Mempelajari Tradisi Nusantara',
    rating: '4.5',
    channelId: 'budaya-kita-channel', // Contoh channelId yang disesuaikan
    channelName: 'BUDAYA KITA',
  },
  {
    id: 'social-drama-1', // Mengarah ke podcast yang sama dengan di atas
    image: podcastImage3,
    title: 'Episode 1: Drama Kehidupan',
    episode: 'Episode 1: Drama Kehidupan',
    rating: '4.5',
    channelId: 'podcast-sosial-channel',
    channelName: 'PODCAST SOSIAL',
  },
];

export { podcastImage1, podcastImage2, podcastImage3 };