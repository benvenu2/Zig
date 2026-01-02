// Mock Data for Zig App

import {User, Zig, VaultItem, LinkMetadata} from '../types';

// Helper to get current week number
const getWeekNumber = (date: Date): number => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const days = Math.floor(
    (date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000)
  );
  return Math.ceil((days + 1) / 7);
};

// Current user
export const currentUser: User = {
  id: 'current-user',
  handle: 'you',
  displayName: 'Your Name',
  avatar: null,
  bio: 'Curious about everything. Sharing the best of the internet.',
  followerCount: 42,
  followingCount: 128,
  savedZigsCount: 15,
};

// Mock users
export const mockUsers: User[] = [
  {
    id: '1',
    handle: 'sarah_reads',
    displayName: 'Sarah Chen',
    avatar: 'https://i.pravatar.cc/150?img=1',
    bio: 'Bookworm. Tech enthusiast. Coffee addict.',
    followerCount: 2340,
    followingCount: 412,
    savedZigsCount: 89,
  },
  {
    id: '2',
    handle: 'alex_design',
    displayName: 'Alex Rivera',
    avatar: 'https://i.pravatar.cc/150?img=2',
    bio: 'Design @ Figma. Previously Airbnb.',
    followerCount: 8921,
    followingCount: 234,
    savedZigsCount: 156,
  },
  {
    id: '3',
    handle: 'marcus_tech',
    displayName: 'Marcus Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    bio: 'Building the future, one line at a time.',
    followerCount: 1542,
    followingCount: 567,
    savedZigsCount: 43,
  },
  {
    id: '4',
    handle: 'emma_writes',
    displayName: 'Emma Watson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    bio: 'Writer, reader, thinker.',
    followerCount: 12453,
    followingCount: 321,
    savedZigsCount: 234,
  },
  {
    id: '5',
    handle: 'david_music',
    displayName: 'David Kim',
    avatar: 'https://i.pravatar.cc/150?img=5',
    bio: 'Music producer. Vinyl collector.',
    followerCount: 5678,
    followingCount: 890,
    savedZigsCount: 167,
  },
];

// Mock links
const mockLinks: LinkMetadata[] = [
  {
    title: 'The End of the Space Age?',
    description:
      'How economics might keep us Earth-bound for another century.',
    image: 'https://picsum.photos/800/400?random=1',
    source: 'theatlantic.com',
    url: 'https://theatlantic.com/article/space-age',
    type: 'article',
  },
  {
    title: 'Live Forever',
    artist: 'Oasis',
    albumArt: 'https://picsum.photos/400/400?random=2',
    source: 'spotify.com',
    url: 'https://spotify.com/track/liveforever',
    type: 'song',
  },
  {
    title: 'The Power Broker: Robert Moses and the Fall of New York',
    description:
      'The definitive biography of one of the most influential figures in urban planning.',
    image: 'https://picsum.photos/800/400?random=3',
    source: 'amazon.com',
    url: 'https://amazon.com/power-broker',
    type: 'book',
  },
  {
    title: 'Why We Sleep: The New Science of Sleep and Dreams',
    description:
      'A revolutionary exploration of sleep and how it affects every aspect of our lives.',
    image: 'https://picsum.photos/800/400?random=4',
    source: 'goodreads.com',
    url: 'https://goodreads.com/why-we-sleep',
    type: 'book',
  },
  {
    title: 'Pink Pony Club',
    artist: 'Chappell Roan',
    albumArt: 'https://picsum.photos/400/400?random=5',
    source: 'spotify.com',
    url: 'https://spotify.com/track/pinkponyclub',
    type: 'song',
  },
  {
    title: 'The Art of Doing Science and Engineering',
    description: 'Learning to Learn by Richard Hamming',
    image: 'https://picsum.photos/800/400?random=6',
    source: 'stripe.press',
    url: 'https://stripe.press/hamming',
    type: 'book',
  },
  {
    title: 'How to Build a Shed',
    description: 'A comprehensive guide to building your own backyard shed.',
    image: 'https://picsum.photos/800/400?random=7',
    source: 'youtube.com',
    url: 'https://youtube.com/watch?v=shed',
    type: 'video',
  },
  {
    title: 'The Future of AI Strategy',
    description:
      'How artificial intelligence is reshaping competitive advantage.',
    image: 'https://picsum.photos/800/400?random=8',
    source: 'hbr.org',
    url: 'https://hbr.org/ai-strategy',
    type: 'article',
  },
  {
    title: 'Best Beaches in Mexico',
    description: 'A curated guide to the most beautiful beaches.',
    image: 'https://picsum.photos/800/400?random=9',
    source: 'travel.com',
    url: 'https://travel.com/mexico-beaches',
    type: 'article',
  },
  {
    title: 'Wonderwall',
    artist: 'Oasis',
    albumArt: 'https://picsum.photos/400/400?random=10',
    source: 'spotify.com',
    url: 'https://spotify.com/track/wonderwall',
    type: 'song',
  },
];

// Generate mock Zigs for the feed
const now = new Date();
const weekNumber = getWeekNumber(now);

export const mockZigs: Zig[] = [
  {
    id: '1',
    user: mockUsers[0],
    link: mockLinks[0],
    caption:
      "This article completely changed how I look at Mars colonization. The section on fuel economics is brutal but necessary. Required reading for anyone who thinks we'll be multi-planetary by 2050.",
    publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000), // 2 hours ago
    weekNumber,
    year: now.getFullYear(),
    savesCount: 1243,
    commentsCount: 45,
    isSaved: false,
    isLate: false,
  },
  {
    id: '2',
    user: mockUsers[4],
    link: mockLinks[1],
    caption:
      "Getting ready for the reunion tour. This track still holds up 30 years later. The guitar work on this one is just *chef's kiss*.",
    publishedAt: new Date(now.getTime() - 2 * 60 * 60 * 1000),
    weekNumber,
    year: now.getFullYear(),
    savesCount: 12,
    commentsCount: 2,
    isSaved: true,
    isLate: false,
  },
  {
    id: '3',
    user: mockUsers[1],
    link: mockLinks[2],
    caption:
      "Finally finished this 1,300 page monster. It's a masterpiece of investigative journalism and urban history. Every designer should understand how power shapes cities.",
    publishedAt: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    weekNumber,
    year: now.getFullYear(),
    savesCount: 892,
    commentsCount: 67,
    isSaved: false,
    isLate: false,
  },
  {
    id: '4',
    user: mockUsers[2],
    link: mockLinks[7],
    caption:
      "If you're building products in the AI space, this HBR piece is essential. The frameworks for thinking about competitive moats are especially valuable.",
    publishedAt: new Date(now.getTime() - 4 * 60 * 60 * 1000),
    weekNumber,
    year: now.getFullYear(),
    savesCount: 456,
    commentsCount: 23,
    isSaved: false,
    isLate: false,
  },
  {
    id: '5',
    user: mockUsers[3],
    link: mockLinks[3],
    caption:
      "This book changed my entire relationship with sleep. The chapter on sleep and creativity alone is worth the read. I now protect my 8 hours religiously.",
    publishedAt: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    weekNumber,
    year: now.getFullYear(),
    savesCount: 1567,
    commentsCount: 89,
    isSaved: true,
    isLate: false,
  },
];

// Global Zeitgeist - Top saved items
export const mockZeitgeist: Zig[] = [...mockZigs].sort(
  (a, b) => b.savesCount - a.savesCount
);

// Mock vault items
export const mockVaultItems: VaultItem[] = [
  {
    id: 'v1',
    link: mockLinks[4],
    addedAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000),
    isSelected: false,
  },
  {
    id: 'v2',
    link: mockLinks[7],
    addedAt: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000),
    isSelected: false,
  },
  {
    id: 'v3',
    link: mockLinks[2],
    addedAt: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000),
    isSelected: true,
  },
  {
    id: 'v4',
    link: mockLinks[6],
    addedAt: new Date(now.getTime() - 5 * 24 * 60 * 60 * 1000),
    isSelected: false,
  },
];

// Past Zigs for profile archive
export const mockPastZigs: Zig[] = [
  {
    id: 'past1',
    user: currentUser,
    link: mockLinks[8],
    caption: 'Planning my next vacation!',
    publishedAt: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000),
    weekNumber: weekNumber - 1,
    year: now.getFullYear(),
    savesCount: 34,
    commentsCount: 5,
    isSaved: false,
    isLate: false,
  },
  {
    id: 'past2',
    user: currentUser,
    link: mockLinks[9],
    caption: 'Timeless classic.',
    publishedAt: new Date(now.getTime() - 14 * 24 * 60 * 60 * 1000),
    weekNumber: weekNumber - 2,
    year: now.getFullYear(),
    savesCount: 78,
    commentsCount: 12,
    isSaved: false,
    isLate: false,
  },
  {
    id: 'past3',
    user: currentUser,
    link: mockLinks[5],
    caption: 'Every engineer should read this.',
    publishedAt: new Date(now.getTime() - 21 * 24 * 60 * 60 * 1000),
    weekNumber: weekNumber - 3,
    year: now.getFullYear(),
    savesCount: 156,
    commentsCount: 23,
    isSaved: false,
    isLate: false,
  },
];

// Mock activity/notifications
export interface Activity {
  id: string;
  type: 'save' | 'comment' | 'follow';
  user: User;
  zig?: Zig;
  message: string;
  timestamp: Date;
  read: boolean;
}

export const mockActivity: Activity[] = [
  {
    id: 'a1',
    type: 'save',
    user: mockUsers[0],
    zig: mockPastZigs[0],
    message: 'saved your Zig',
    timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'a2',
    type: 'follow',
    user: mockUsers[1],
    message: 'started following you',
    timestamp: new Date(now.getTime() - 3 * 60 * 60 * 1000),
    read: false,
  },
  {
    id: 'a3',
    type: 'comment',
    user: mockUsers[2],
    zig: mockPastZigs[1],
    message: 'commented on your Zig',
    timestamp: new Date(now.getTime() - 5 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'a4',
    type: 'save',
    user: mockUsers[3],
    zig: mockPastZigs[2],
    message: 'saved your Zig',
    timestamp: new Date(now.getTime() - 8 * 60 * 60 * 1000),
    read: true,
  },
  {
    id: 'a5',
    type: 'follow',
    user: mockUsers[4],
    message: 'started following you',
    timestamp: new Date(now.getTime() - 24 * 60 * 60 * 1000),
    read: true,
  },
];
