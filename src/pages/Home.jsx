import Hero from '../components/home/Hero';
import RightNow from '../components/home/RightNow';
import Marquee from '../components/home/Marquee';
import CarDNA from '../components/home/CarDNA';
import BuildLog from '../components/home/BuildLog';
import Timeline from '../components/home/Timeline';
import SpecDashboard from '../components/home/SpecDashboard';
import StatsBar from '../components/home/StatsBar';
import CTASection from '../components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <RightNow />
      <Marquee />
      <CarDNA />
      <BuildLog />
      <Timeline />
      <SpecDashboard />
      <StatsBar />
      <CTASection />
    </>
  );
}
