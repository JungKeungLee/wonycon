"use client";

import { useState } from "react";
import TicketOpening from "./opening/TicketOpening";
import Hero from "./Hero";

/** 오프닝 티켓 모션과 Hero 등장을 이어붙인다 - 티켓 입장이 끝나는 순간(onDone)에만 Hero가 움직이기 시작한다. */
export default function IntroExperience() {
  const [heroStart, setHeroStart] = useState(false);

  return (
    <>
      <TicketOpening onDone={() => setHeroStart(true)} />
      <Hero start={heroStart} />
    </>
  );
}
