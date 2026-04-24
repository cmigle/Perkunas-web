import Hero from '../components/home/Hero';
import Marquee from '../components/home/Marquee';
import Heritage from '../components/home/Heritage';
import CarDNA from '../components/home/CarDNA';
import SpecDashboard from '../components/home/SpecDashboard';
import StatsBar from '../components/home/StatsBar';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Heritage />
      <CarDNA />
      <SpecDashboard />
      <StatsBar />
      <CTASection />
    </>
  );
}
