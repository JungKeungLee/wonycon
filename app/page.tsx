import Header from "@/components/Header";
import IntroExperience from "@/components/IntroExperience";
import ConcertIntro from "@/components/ConcertIntro";
import ConcertInfo from "@/components/ConcertInfo";
import Countdown from "@/components/Countdown";
import ThreeSongs from "@/components/ThreeSongs";
import Message from "@/components/Message";
import Ending from "@/components/Ending";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <IntroExperience />
        <ConcertIntro />
        <ConcertInfo />
        <Countdown />
        <ThreeSongs />
        <Message />
        <Ending />
      </main>
      <Footer />
    </>
  );
}
