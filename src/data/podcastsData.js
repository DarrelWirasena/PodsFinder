// src/data/podcastsData.js

// Import semua gambar yang diperlukan di sini.
import BerizikCover from '../assets/images/Berizik.png';
import Bapak2BangetCover from '../assets/images/bapak@banget.png';
import OlahragaCover from '../assets/images/podcast olahraga.png';
import NightRide from '../assets/images/nightRide.png'; // Pastikan ini diimpor jika digunakan di data genre
import PlaceholderImage from '../assets/images/Berizik.png';
import AvatarFrans from '../assets/images/michelle.jpg';
import AvatarMichelle from '../assets/images/michelle.jpg';
import AvatarBram from '../assets/images/michelle.jpg';
import AvatarUser from '../assets/images/michelle.jpg';

// Export all images that are needed directly by components
export {
    BerizikCover,
    Bapak2BangetCover,
    OlahragaCover,
    NightRide, // Export NightRide
    PlaceholderImage,
    AvatarFrans,
    AvatarMichelle,
    AvatarBram,
    AvatarUser
};


// --- Data Podcast Lengkap ---
export const allPodcastsData = [
    {
        id: 'berizik-ep29',
        coverImage: BerizikCover,
        channel: 'BERIZIK',
        channelId: 'berizik-channel',
        title: 'EP29: Last Playlist Berizik',
        rating: '4.5',
        description: 'Ini adalah episode terakhir dari playlist Berizik, membahas momen-momen paling berkesan dan rencana ke depan. Jangan lewatkan obrolan santai yang penuh tawa dan refleksi.',
        episodes: [
            { title: 'EP29: Last Playlist Berizik', date: '18 DECEMBER 2024', description: 'Episode perpisahan playlist Berizik, penuh nostalgia dan janji untuk kembali.' },
            { title: 'EP28: Obrolan Tengah Malam', date: '11 DECEMBER 2024', description: 'Diskusi seru tentang tren terkini dan fenomena sosial yang sedang viral.' },
            { title: 'EP27: Ngopi Bareng Seleb', date: '04 DECEMBER 2024', description: 'Wawancara eksklusif dengan selebriti papan atas, membahas karir dan kehidupan pribadi.' },
        ],
        reviews: [
            { avatarSrc: AvatarFrans, name: 'Frans', handle: '@00franss', reviewText: "Podcast ini selalu berhasil bikin ngakak! Episode terakhirnya bikin baper tapi tetap menghibur. Recommended banget!" },
            { avatarSrc: AvatarMichelle, name: 'Michelle', handle: '@celow', reviewText: "Kocak banget! Setiap episode selalu ada kejutan dan insight baru. Suka banget sama hostnya." },
            { avatarSrc: AvatarBram, name: 'Bram', handle: '@braawm', reviewText: "Wajib dengerin! Kontennya segar, pengisi suaranya asik, dan bikin mood jadi naik terus." },
        ],
        relatedPodcasts: [
            { id: 'bapak2banget-ep1', title: 'Bapak2banget Podcast', channel: 'BAPAK2BANGET', coverSrc: Bapak2BangetCover, rating: '4.6' },
            { id: 'motivation-1', title: 'Inovasi Muda', channel: 'INOVATOR', coverSrc: Bapak2BangetCover, rating: '4.7' },
        ],
        info: {
            channelName: 'BERIZIK Official',
            creator: 'Awwe, Noice Studios, Randhika Djamil',
            showWeb: 'www.berizik.com',
            yearsActive: '2023-2025',
            totalEpisodes: '150',
            genre: 'Komedi', // Pastikan genre ini ada
            copyright: '© 2025 Berizik Studios',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'bapak2banget-ep1',
        coverImage: Bapak2BangetCover,
        channel: 'BAPAK2BANGET',
        channelId: 'bapak2banget-channel',
        title: 'E01: Kisah Horor Kampung Sebelah',
        rating: '4.5',
        description: 'Dengarkan cerita-cerita horor dari bapak-bapak yang akan membuat Anda merinding sekaligus tertawa. Episode pertama ini menceritakan tentang kampung sebelah yang penuh misteri.',
        episodes: [
            { title: 'E01: Kisah Horor Kampung Sebelah', date: '01 JANUARI 2025', description: 'Pertama kali membahas cerita horor yang terjadi di sekitar kita.' },
        ],
        reviews: [
            { avatarSrc: AvatarMichelle, name: 'Michelle', handle: '@celow', reviewText: "Serem tapi kocak! Bapak-bapak emang paling bisa bikin suasana tegang tapi lucu." },
        ],
        relatedPodcasts: [
            { id: 'berizik-ep29', title: 'Last Playlist Berizik', channel: 'BERIZIK', coverSrc: BerizikCover, rating: '4.5' },
        ],
        info: {
            channelName: 'BAPAK2BANGET Official',
            creator: 'Tim Bapak2banget',
            showWeb: 'www.bapak2banget.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '20',
            genre: 'horor', // Pastikan genre ini ada
            copyright: '© 2025 Bapak2banget',
            license: 'Semua Hak Dilindungi'
        }
    },
    {
        id: 'bapak2banget-ep2', // Podcast kedua dari Bapak2banget
        coverImage: Bapak2BangetCover,
        channel: 'BAPAK2BANGET',
        channelId: 'bapak2banget-channel',
        title: 'E02: Misteri Rumah Tua',
        rating: '4.2',
        description: 'Melanjutkan petualangan horor, kali ini membahas rumah tua angker di pinggir kota. Bersiaplah untuk cerita yang lebih menyeramkan!',
        episodes: [
            { title: 'E02: Misteri Rumah Tua', date: '08 JANUARI 2025', description: 'Kisah-kisah menyeramkan dari rumah tua yang ditinggalkan.' },
        ],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'BAPAK2BANGET Official',
            creator: 'Tim Bapak2banget',
            showWeb: 'www.bapak2banget.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '20',
            genre: 'Horor', // Pastikan genre ini ada
            copyright: '© 2025 Bapak2banget',
            license: 'Semua Hak Dilindungi'
        }
    },
    {
        id: 'malam-jumat-ep1', // Contoh podcast Horor baru
        coverImage: NightRide,
        channel: 'MALAM JUMAT',
        channelId: 'malam-jumat-channel',
        title: 'Kisah Hantu Kosan',
        rating: '4.7',
        description: 'Cerita seram dari pengalaman nyata penghuni kosan.',
        episodes: [],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'MALAM JUMAT',
            creator: 'Tim Malam Jumat',
            showWeb: 'www.malamjumat.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '10',
            genre: 'Horor', // Pastikan genre ini ada
            copyright: '© 2025 Malam Jumat',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'kisah-tanah-jawa-ep1', // Contoh podcast Horor baru
        coverImage: NightRide,
        channel: 'KISAH TANAH JAWA',
        channelId: 'kisah-tanah-jawa-channel',
        title: 'Misteri Gunung Merapi',
        rating: '4.9',
        description: 'Mengungkap misteri di balik gunung paling angker di Jawa.',
        episodes: [],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'KISAH TANAH JAWA',
            creator: 'Tim Kisah Tanah Jawa',
            showWeb: 'www.kisahtanahjawa.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '15',
            genre: 'Horor', // Pastikan genre ini ada
            copyright: '© 2025 Kisah Tanah Jawa',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'social-drama-1',
        coverImage: PlaceholderImage,
        channel: 'PODCAST SOSIAL',
        channelId: 'podcast-sosial-channel',
        title: 'Episode 1: Drama Kehidupan',
        rating: '4.3',
        description: 'Menganalisis berbagai drama kehidupan sosial yang sering terjadi di masyarakat.',
        episodes: [{ title: 'Episode 1: Drama Kehidupan', date: '01 MARET 2024', description: 'Pengenalan tentang drama sosial.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'PODCAST SOSIAL',
            creator: 'Tim Sosial',
            showWeb: 'www.podcastsosial.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '10',
            genre: 'Drama',
            copyright: '© 2024 Podcast Sosial',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'social-drama-2',
        coverImage: PlaceholderImage,
        channel: 'PODCAST DRAMA',
        channelId: 'podcast-drama-channel',
        title: 'Episode 2: Realita Kota',
        rating: '4.1',
        description: 'Membahas realita dan tantangan hidup di kota metropolitan.',
        episodes: [{ title: 'Episode 2: Realita Kota', date: '08 MARET 2024', description: 'Dinamika kehidupan perkotaan.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'PODCAST DRAMA',
            creator: 'Tim Drama',
            showWeb: 'www.podcastdrama.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '8',
            genre: 'Drama',
            copyright: '© 2024 Podcast Drama',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'motivation-1',
        coverImage: PlaceholderImage,
        channel: 'INOVASI MUDA',
        channelId: 'inovasi-muda-channel',
        title: 'Kiat Sukses Startup',
        rating: '4.7',
        description: 'Tips dan trik untuk membangun startup sukses dari nol.',
        episodes: [{ title: 'Kiat Sukses Startup', date: '01 APRIL 2024', description: 'Rahasia startup yang berhasil.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'INOVASI MUDA',
            creator: 'Tim Inovasi',
            showWeb: 'www.inovasimuda.com',
            yearsActive: '2023-Sekarang',
            totalEpisodes: '15',
            genre: 'Motivation',
            copyright: '© 2024 Inovasi Muda',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'motivation-2',
        coverImage: PlaceholderImage,
        channel: 'SPIRIT HARIAN',
        channelId: 'spirit-harian-channel',
        title: 'Bangkit dari Kegagalan',
        rating: '4.6',
        description: 'Cerita inspiratif dan motivasi untuk bangkit setelah mengalami kegagalan.',
        episodes: [{ title: 'Bangkit dari Kegagalan', date: '08 APRIL 2024', description: 'Mempelajari dari kesalahan.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'SPIRIT HARIAN',
            creator: 'Tim Spirit',
            showWeb: 'www.spiritharian.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '12',
            genre: 'Motivation',
            copyright: '© 2024 Spirit Harian',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'culture-1',
        coverImage: PlaceholderImage,
        channel: 'BUDAYA KITA',
        channelId: 'budaya-kita-channel',
        title: 'Tradisi Nusantara',
        rating: '4.4',
        description: 'Mengupas tuntas keunikan tradisi dan budaya dari berbagai daerah di Nusantara.',
        episodes: [{ title: 'Tradisi Nusantara', date: '01 MEI 2024', description: 'Kekayaan budaya Indonesia.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'BUDAYA KITA',
            creator: 'Tim Budaya',
            showWeb: 'www.budayakita.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '10',
            genre: 'Culture',
            copyright: '© 2024 Budaya Kita',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'culture-2',
        coverImage: PlaceholderImage,
        channel: 'JELAJAH SOSIAL',
        channelId: 'jelajah-sosial-channel',
        title: 'Fenomena Masyarakat',
        rating: '4.0',
        description: 'Menganalisis fenomena-fenomena sosial yang menarik perhatian masyarakat.',
        episodes: [{ title: 'Fenomena Masyarakat', date: '08 MEI 2024', description: 'Tren sosial terkini.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'JELAJAH SOSIAL',
            creator: 'Tim Jelajah',
            showWeb: 'www.jelajahsosial.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '9',
            genre: 'Culture',
            copyright: '© 2024 Jelajah Sosial',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'sport-1',
        coverImage: OlahragaCover,
        channel: 'DUNIA OLAHRAGA',
        channelId: 'dunia-olahraga-channel',
        title: 'Analisis Pertandingan',
        rating: '4.8',
        description: 'Analisis mendalam setiap pertandingan olahraga, dari sepak bola hingga bulu tangkis.',
        episodes: [{ title: 'Analisis Pertandingan', date: '01 JUNI 2024', description: 'Ulasan pertandingan penting.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'DUNIA OLAHRAGA',
            creator: 'Tim Olahraga',
            showWeb: 'www.duniaolahraga.com',
            yearsActive: '2023-Sekarang',
            totalEpisodes: '25',
            genre: 'Sport',
            copyright: '© 2024 Dunia Olahraga',
            license: 'All Rights Reserved'
        }
    },
    {
        id: 'sport-2',
        coverImage: OlahragaCover,
        channel: 'LAPANGAN HIJAU',
        channelId: 'lapangan-hijau-channel',
        title: 'Perjalanan Juara',
        rating: '4.9',
        description: 'Membahas kisah-kisah inspiratif dari para juara dan atlet berprestasi.',
        episodes: [{ title: 'Perjalanan Juara', date: '08 JUNI 2024', description: 'Kisah sukses atlet.' }],
        reviews: [],
        relatedPodcasts: [],
        info: {
            channelName: 'LAPANGAN HIJAU',
            creator: 'Tim Hijau',
            showWeb: 'www.lapanganhijau.com',
            yearsActive: '2024-Sekarang',
            totalEpisodes: '20',
            genre: 'Sport',
            copyright: '© 2024 Lapangan Hijau',
            license: 'All Rights Reserved'
        }
    },
];

// --- Data Channel ---
export const allChannelsData = [
    {
        id: 'berizik-channel',
        name: 'BERIZIK Official',
        coverImage: BerizikCover, // Menggunakan coverImage dari import
        description: 'Channel resmi BERIZIK, menyajikan konten komedi, obrolan santai, dan wawancara inspiratif.',
        creator: 'Awwe, Noice Studios, Randhika Djamil',
        genre: 'Komedi',
        subscribers: '1.2M',
        socialMedia: {
            instagram: 'https://instagram.com/berizik',
            youtube: 'https://www.youtube.com/channel/UC-your-channel-id',
        },
        podcastIds: ['berizik-ep29'], // Menggunakan ID podcast dari allPodcastsData
    },
    {
        id: 'bapak2banget-channel',
        name: 'BAPAK2BANGET Official',
        coverImage: Bapak2BangetCover, // Menggunakan coverImage dari import
        description: 'Dengarkan kisah horor dan komedi dari sudut pandang bapak-bapak!',
        creator: 'Tim Bapak2banget',
        genre: 'Horor, Komedi',
        subscribers: '500K',
        socialMedia: {
            instagram: 'https://instagram.com/bapak2banget',
            twitter: 'https://twitter.com/bapak2banget',
        },
        podcastIds: ['bapak2banget-ep1', 'bapak2banget-ep2'],
    },
    {
        id: 'malam-jumat-channel',
        name: 'MALAM JUMAT',
        coverImage: NightRide, // Menggunakan NightRide dari import
        description: 'Kumpulan kisah seram dan misteri yang akan membuat bulu kuduk berdiri.',
        creator: 'Tim Malam Jumat',
        genre: 'Horor',
        subscribers: '800K',
        socialMedia: {
            instagram: 'https://instagram.com/malamjumat',
        },
        podcastIds: ['malam-jumat-ep1'],
    },
    {
        id: 'kisah-tanah-jawa-channel',
        name: 'KISAH TANAH JAWA',
        coverImage: NightRide, // Menggunakan NightRide dari import
        description: 'Membongkar mitos dan cerita mistis dari tanah Jawa.',
        creator: 'Tim Kisah Tanah Jawa',
        genre: 'Horor',
        subscribers: '1.5M',
        socialMedia: {
            instagram: 'https://instagram.com/kisahtanahjawa',
        },
        podcastIds: ['kisah-tanah-jawa-ep1'],
    },
    {
        id: 'podcast-sosial-channel',
        name: 'PODCAST SOSIAL',
        coverImage: PlaceholderImage,
        description: 'Channel yang membahas berbagai isu sosial dan drama kehidupan.',
        creator: 'Tim Sosial',
        genre: 'Social & Drama',
        subscribers: '200K',
        socialMedia: {
            instagram: 'https://instagram.com/podcastsosial',
        },
        podcastIds: ['social-drama-1'],
    },
    {
        id: 'podcast-drama-channel',
        name: 'PODCAST DRAMA',
        coverImage: PlaceholderImage,
        description: 'Menyajikan cerita drama dan realita kehidupan kota.',
        creator: 'Tim Drama',
        genre: 'Social & Drama',
        subscribers: '150K',
        socialMedia: {
            instagram: 'https://instagram.com/podcastdrama',
        },
        podcastIds: ['social-drama-2'],
    },
    {
        id: 'inovasi-muda-channel',
        name: 'INOVASI MUDA',
        coverImage: PlaceholderImage,
        description: 'Inspirasi dan kiat sukses untuk para inovator muda dan startup.',
        creator: 'Tim Inovasi',
        genre: 'Motivation',
        subscribers: '300K',
        socialMedia: {
            instagram: 'https://instagram.com/inovasimuda',
        },
        podcastIds: ['motivation-1'],
    },
    {
        id: 'spirit-harian-channel',
        name: 'SPIRIT HARIAN',
        coverImage: PlaceholderImage,
        description: 'Membangun semangat dan motivasi harian untuk menghadapi tantangan.',
        creator: 'Tim Spirit',
        genre: 'Motivation',
        subscribers: '250K',
        socialMedia: {
            instagram: 'https://instagram.com/spiritharian',
        },
        podcastIds: ['motivation-2'],
    },
    {
        id: 'budaya-kita-channel',
        name: 'BUDAYA KITA',
        coverImage: PlaceholderImage,
        description: 'Menjelajahi kekayaan tradisi dan budaya Nusantara.',
        creator: 'Tim Budaya',
        genre: 'Social & Culture',
        subscribers: '180K',
        socialMedia: {
            instagram: 'https://instagram.com/budayakita',
        },
        podcastIds: ['culture-1'],
    },
    {
        id: 'jelajah-sosial-channel',
        name: 'JELAJAH SOSIAL',
        coverImage: PlaceholderImage,
        description: 'Analisis mendalam fenomena-fenomena sosial di masyarakat.',
        creator: 'Tim Jelajah',
        genre: 'Social & Culture',
        subscribers: '160K',
        socialMedia: {
            instagram: 'https://instagram.com/jelajahsosial',
        },
        podcastIds: ['culture-2'],
    },
    {
        id: 'dunia-olahraga-channel',
        name: 'DUNIA OLAHRAGA',
        coverImage: OlahragaCover,
        description: 'Ulasan dan analisis komprehensif tentang dunia olahraga.',
        creator: 'Tim Olahraga',
        genre: 'Sport',
        subscribers: '400K',
        socialMedia: {
            instagram: 'https://instagram.com/duniaolahraga',
        },
        podcastIds: ['sport-1'],
    },
    {
        id: 'lapangan-hijau-channel',
        name: 'LAPANGAN HIJAU',
        coverImage: OlahragaCover,
        description: 'Kisah inspiratif para juara dan perjalanan karir atlet.',
        creator: 'Tim Hijau',
        genre: 'Sport',
        subscribers: '350K',
        socialMedia: {
            instagram: 'https://instagram.com/lapanganhijau',
        },
        podcastIds: ['sport-2'],
    },
    
];

// --- Data Genre (untuk halaman Genre) ---
export const allGenresData = [
    {
        name: 'Komedi',
    },
    {
        name: 'Horor',
    },
    {
        name: 'Culture',
    },
    {
        name: 'Motivation',
    },
    {
        name: 'Drama',
    },
    {
        name: 'Sport',
    },
];