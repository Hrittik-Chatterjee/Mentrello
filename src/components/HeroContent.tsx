"use client";

import { motion } from "framer-motion";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.27h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.91a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21.73 16.27z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18, delayChildren: 0.3 } },
};

const item = {
  hidden: { opacity: 0, y: 28, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function HeroContent() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-7 text-center pointer-events-none"
    >
      <motion.div variants={item}>
        <img
          src="/LOGO.svg"
          alt="Mentrello"
          width={360}
          height={296}
          style={{
            filter:
              "brightness(0) invert(1) drop-shadow(0 0 40px rgba(255,255,255,0.12))",
          }}
          className="w-[200px] sm:w-[260px] md:w-[360px] max-w-[80vw] select-none"
        />
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-4">
        <div className="h-px w-8 bg-white/30" />
        <span className="text-[10px] uppercase tracking-[0.45em] text-white/45 font-light select-none">
          Means Minimal
        </span>
        <div className="h-px w-8 bg-white/30" />
      </motion.div>

      <motion.div variants={item} className="flex flex-col items-center gap-0">
        <h2 className="text-xs md:text-sm uppercase tracking-[0.35em] text-white/50 font-light select-none">
          Coming Soon
        </h2>
        <p className="text-white/35 text-sm max-w-[280px] font-light leading-relaxed mt-3 select-none italic">
          Minimal clothing &amp; accessories for the man who chooses with intention.
        </p>
      </motion.div>

      <motion.div variants={item} className="flex items-center gap-3 sm:gap-5 mt-2">
        <SocialLink href="tel:+8801626974996" icon={<PhoneIcon className="w-4 h-4 sm:w-5 sm:h-5" />} />
        <SocialLink href="https://www.facebook.com/mentrello" icon={<FacebookIcon className="w-4 h-4 sm:w-5 sm:h-5" />} />
        <SocialLink href="https://www.instagram.com/mentrelloo" icon={<InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5" />} />
        <SocialLink href="https://wa.me/8801626974996" icon={<WhatsAppIcon className="w-4 h-4 sm:w-5 sm:h-5" />} />
      </motion.div>
    </motion.div>
  );
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="p-3 sm:p-3.5 bg-white/[0.06] hover:bg-white/15 border border-white/10 hover:border-white/30 rounded-xl text-white/50 hover:text-white/90 transition-all duration-300 hover:scale-110 pointer-events-auto"
    >
      {icon}
    </a>
  );
}
