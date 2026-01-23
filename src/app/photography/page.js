import PhotoGrid from '../../components/PhotoGrid';

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
    src: '/photos/20190713_164823.jpg',
    alt: 'Photo from July 13, 2019',
    caption: 'July 13, 2019.',
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
    src: '/photos/20190805_183952.jpg',
    alt: 'Photo from August 5, 2019',
    caption: 'August 5, 2019.',
  },
  {
    src: '/photos/20190818_142628.jpg',
    alt: 'Longs Peak Summit',
    caption: 'Yours Truly on the Summit of Longs Peak, August 2019. \n Photo Credit Hayden Ripple',
  },
  {
    src: '/photos/20190822_132758.jpg',
    alt: 'Photo from August 22, 2019',
    caption: 'August 22, 2019.',
  },
  {
    src: '/photos/20190913_182923~2.jpg',
    alt: 'Photo from September 13, 2019',
    caption: 'September 13, 2019.',
  },
  {
    src: '/photos/20190918_140653.jpg',
    alt: 'Photo from September 18, 2019',
    caption: 'September 18, 2019.',
  },
  {
    src: '/photos/20190918_144148.jpg',
    alt: 'Photo from September 18, 2019',
    caption: 'September 18, 2019.',
  },
  {
    src: '/photos/20190928_151114.jpg',
    alt: 'Autumn in Snoqualmie',
    caption: 'Autumn Descends on Snoqualmie Pass, September 2019.',
  },
  {
    src: '/photos/20190928_161324.jpg',
    alt: 'Photo from September 28, 2019',
    caption: 'September 28, 2019.',
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
    src: '/photos/20200731_193033.jpg',
    alt: 'Photo from July 31, 2020',
    caption: 'July 31, 2020.',
  },
  {
    src: '/photos/20200808_200149.jpg',
    alt: 'Photo from August 8, 2020',
    caption: 'August 8, 2020.',
  },
  {
    src: '/photos/20210122_063847.jpg',
    alt: 'Photo from January 22, 2021',
    caption: 'January 22, 2021.',
  },
  {
    src: '/photos/20230930_134314.jpg',
    alt: 'Photo from September 30, 2023',
    caption: 'September 30, 2023.',
  },
  {
    src: '/photos/20250623_134841.jpg',
    alt: 'Photo from June 23, 2025',
    caption: 'June 23, 2025.',
  },
  {
    src: '/photos/20250630_142735-EDIT.jpg',
    alt: 'Photo from June 30, 2025',
    caption: 'June 30, 2025.',
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
    src: '/photos/Golden_frog.jpg',
    alt: 'Golden frog',
    caption: 'Golden frog.',
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
    <div className="page photography-page">
      <div className="page-title-band">
        <h1 className="page-title">Photography</h1>
      </div>
      <section className="standard-page-hero">
        <div className="standard-page-hero-image standard-page-hero-image--top">
          <img src="/photos/Fiery_sunset_w_berries.jpg" alt="Fiery sunset with berries" />
        </div>
        <div className="section-divider section-divider--hero">
          <img src="/CollectionOfAtoms_logo/Atom_transparent.svg" alt="" aria-hidden="true" />
        </div>
      </section>
      <PhotoGrid photos={photos} />
    </div>
  );
}
