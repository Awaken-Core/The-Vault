import ContactPage from "@/components/home/contact-page";
import DesignCarousels from "@/components/home/design-carousels";
import FaqPage from "@/components/home/faq-page";
import FooterPage from "@/components/home/footer-page";
import LandingPage from "@/components/home/landing-page";
import ServicePage from "@/components/home/services-page";

const Home = () => {
  return (
    <main id="top" className="min-h-screen w-full overflow-hidden bg-[#f7f7f4] font-sans text-[#242424]">
      <LandingPage />
      <DesignCarousels />
      <ServicePage />
      <ContactPage />
      <FaqPage />
      <FooterPage />
    </main>
  )
};

export default Home;
