import PhotoGrid from '../components/PhotoGrid';

const photos = [
  {
    src: '/photos/20190608_160812~2.jpg',
    alt: 'Afternoon reflections',
    caption: 'North California Coast, June 2019.',
  },
  {
    src: '/photos/20190624_183358.jpg',
    alt: 'Mountain pass',
    caption: 'Sierra Mountains, California, June 2019.',
  },
  {
    src: '/photos/20190726_161359.jpg',
    alt: 'Telluride',
    caption: 'Telluride Basin, July 2019.',
  },
  {
    src: '/photos/20190726_190449.jpg',
    alt: 'Blue Lake',
    caption: 'Blue lake, July 2019.',
  },
  {
    src: '/photos/20190818_142628.jpg',
    alt: 'Longs Peak Summit',
    caption: 'Yours Truly on the Summit of Longs Peak, August 2019. \n Photo Credit Hayden Ripple',
  },
  {
    src: '/photos/20190928_151114.jpg',
    alt: 'Autumn in Snoqualmie',
    caption: 'Autumn Descends on Snoqualmie Pass, September 2019.',
  },
  {
    src: '/photos/20190928_171913.jpg',
    alt: 'First Snow',
    caption: 'First Snow, September 2019.',
  },
  {
    src: '/photos/20200606_153237.jpg',
    alt: 'Bearded Dragon',
    caption: 'A Handsome Bearded Dragon, June 2020.',
  },
  {
    src: '/photos/20200731_192729.jpg',
    alt: 'Burn Scar',
    caption: 'Walking Through an Old Burn Scar on Mt. Adams, July 2020.',
  },
  {
    src: '/photos/20250801_100930.jpg',
    alt: 'Mountain Goats',
    caption: 'Mountain Goats on Torrey\'s Peak, August 2025.',
  },
  {
    src: '/photos/20250831_064905.jpg',
    alt: 'Burning Man Sunrise',
    caption: 'Enjoying the Sunrise at Burning Man, August 2025.',
  },
  {
    src: '/photos/20250916_191828~2.jpg',
    alt: 'Sunset Smoke',
    caption: 'Sunset Smoke Over Hayden Pass, Olympic National Park, September 2025.',
  },
  {
    src: '/photos/20250916_192049.jpg',
    alt: 'Berry Bush Beneath a Fiery Sky',
    caption: 'Berry Bush Beneath the Fiery Sky, Olympic National Park, September 2025.',
  },
  {
    src: '/photos/20250926_125828.jpg',
    alt: 'Diablo Lake',
    caption: 'Lunchtime at Diablo Lake, North Cascades, September 2025.',
  },
  {
    src: '/photos/20250927_114440.jpg',
    alt: 'Rest Awhile',
    caption: 'Rest Awhile, Stehekin Washington, September 2025.',
  },
];

export default function Photography() {
  return (
    <div className="page">
      <h1>Photography</h1>
      <PhotoGrid photos={photos} />
    </div>
  );
}
