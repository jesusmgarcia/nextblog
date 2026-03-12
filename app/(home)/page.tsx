import Footer from '@/components/home/footer';
import Navbar from '@/components/home/header/navbar';
import HeroSection from '@/components/home/heroSection';
import TopArticles from '@/components/home/topArticles';

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TopArticles />
      <Footer />
    </div>
  );
}
