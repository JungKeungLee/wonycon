import Header from "@/components/Header";
import IntroExperience from "@/components/IntroExperience";
import SetlistSection from "@/components/SetlistSection";
import EndingSection from "@/components/EndingSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <IntroExperience />
        <SetlistSection />
        <EndingSection />
      </main>
      <Footer />
    </>
  );
}
