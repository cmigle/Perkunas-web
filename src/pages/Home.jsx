import Hero from '../components/home/Hero';
import Heritage from '../components/home/Heritage';
import MotionReel from '../components/home/MotionReel';
import GalleryStrip from '../components/home/GalleryStrip';
import StatsBar from '../components/home/StatsBar';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Heritage />
      <MotionReel />
      <GalleryStrip />
      <StatsBar />
      <CTASection />
    </>
  );
}
