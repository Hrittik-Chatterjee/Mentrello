import FluidBackground from '@/components/FluidBackground';
import HeroContent from '@/components/HeroContent';

export default function Home() {
  return (
    <main className="w-full h-screen font-sans overflow-hidden">
      <FluidBackground>
        <div
          className="flex flex-col items-center justify-center w-full h-full px-4 relative"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(0,0,0,0.35) 0%, transparent 100%)",
          }}
        >
          <HeroContent />
        </div>
      </FluidBackground>
    </main>
  );
}
