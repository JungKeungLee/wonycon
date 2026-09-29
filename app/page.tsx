import Header from "@/components/Header";
import IntroExperience from "@/components/IntroExperience";
import ThreeSongsTeaser from "@/components/ThreeSongsTeaser";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <IntroExperience />
        <ThreeSongsTeaser />
      </main>
      <Footer />
    </>
  );
}
