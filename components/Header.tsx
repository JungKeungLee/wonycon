"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONCERT_DATE_LABEL } from "@/data/concert";

const NAV_ITEMS = [
  { label: "ABOUT", href: "#about" },
  { label: "CONCERT", href: "#concert" },
  { label: "3 SONGS", href: "#songs" },
  { label: "MESSAGE", href: "#message" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-40 border-b border-champagne/20 bg-cream/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a
          href="#top"
          onClick={() => setIsOpen(false)}
          className="font-display text-sm tracking-[0.1em] text-ink sm:text-base"
        >
          GOOD BYE SUMMER
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-xs tracking-[0.2em] text-ink-soft transition-colors hover:text-gold-deep"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden font-display text-xs tracking-[0.2em] text-champagne sm:inline">
            {CONCERT_DATE_LABEL}
          </span>
          <span className="font-display text-xs tracking-[0.15em] text-champagne sm:hidden">
            {CONCERT_DATE_LABEL}
          </span>
          <button
            type="button"
            aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span
              className={`h-px w-5 bg-ink transition-transform ${
                isOpen ? "translate-y-[3.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-5 bg-ink transition-transform ${
                isOpen ? "-translate-y-[3.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-champagne/20 bg-cream/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-5 px-6 py-6">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-sm tracking-[0.15em] text-ink-soft transition-colors hover:text-gold-deep"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
