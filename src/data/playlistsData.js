import { BerizikCover, Bapak2BangetCover, PlaceholderImage, NightRide, TanahJawa } from './podcastsData';

export const playlistsData = [
  {
    id: 'playlist-1',
    title: 'Playlist 1',
    episodes: [
      {
        id : 'ep1a',
        podcastId: 'berizik-ep29', 
        channelId: 'berizik-channel', 
        image: BerizikCover,
        channel: 'BERIZIK',
        title: 'EP29: Last Playlist Berizik',
        rating: '4.5'
      },
      {
        id : 'ep1b',
        podcastId: 'bapak2banget-ep2', 
        channelId: 'bapak2banget-channel', 
        image: Bapak2BangetCover,
        channel: 'bapak2banget',
        title: 'E22: Hamish Daud Ngajarin Sahil & Dennis Biar Anti...',
        rating: '4.5'
      },
    ],
    link: '/playlistviewall/playlist-1',
  },

  {
    id: 'playlist-2',
    title: 'Playlist 2',
    episodes: [
      {
        id: 'ep2a',
        podcastId: 'malam-jumat-ep1', 
        channelId: 'malam-jumat-channel', 
        image: NightRide, 
        channel: 'MALAM JUMAT',
        title: 'Ketemu Teman di MRT yang Ternyata Hantu (Cu..',
        rating: '4.5'
      },
      {
        id: 'ep2b',
        podcastId: 'malam-jumat-ep1', 
        channelId: 'malam-jumat-channel', 
        image: NightRide, 
        channel: 'MALAM JUMAT',
        title: 'Hantu Tertangkap Kamera & Sihir Pelindung Di Gorontalo',
        rating: '4.5'
      },
    ],
    link: '/playlistviewall/playlist-2',
  },


  {
    id: 'playlist-3',
    title: 'Playlist 3',
    episodes: [
      {
        id: 'ep3a',
        podcastId: 'kisah-tanah-jawa-ep1', 
        channelId: 'KISAH TANAH JAWA', 
        image: TanahJawa, 
        channel: 'KISAH TANAH JAWA',
        title: 'Misteri Gunung Merapi',
        rating: '4.5'
      },
      {
        id: 'ep3b',
        podcastId: 'kisah-tanah-jawa-ep1', 
        channelId: 'KISAH TANAH JAWA', 
        image: TanahJawa, 
        channel: 'KISAH TANAH JAWA',
        title: 'Misteri Gunung Merapi',
        rating: '4.5',
      },
    ],
    link: '/playlistviewall/playlist-3',
  },
];