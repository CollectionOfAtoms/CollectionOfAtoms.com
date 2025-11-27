import PhotoGrid from '../components/PhotoGrid';

const photos = [
  '20190608_160812~2.jpg',
  '20190624_183358.jpg',
  '20190726_161359.jpg',
  '20190726_190449.jpg',
  '20190818_142628.jpg',
  '20190928_151114.jpg',
  '20190928_171913.jpg',
  '20200606_153237.jpg',
  '20200731_192729.jpg',
  '20250801_100930.jpg',
  '20250831_064905.jpg',
  '20250916_191828~2.jpg',
  '20250916_192049.jpg',
  '20250926_125828.jpg',
  '20250927_114440.jpg',
].map((file) => ({
  src: `/photos/${file}`,
  alt: file.replace(/\.[^.]+$/, '').replace(/[_~-]/g, ' '),
}));

export default function Photography() {
  return (
    <div className="page">
      <h1>Photography</h1>
      <p>Tap any image to view it full size.</p>
      <PhotoGrid photos={photos} />
    </div>
  );
}
