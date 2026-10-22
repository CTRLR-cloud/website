import { Reveal } from "@/components/Reveal";

type Brand = {
  name: string;
  /** Path under `public/`. Without one, the name is shown as a wordmark. */
  logo?: string;
  /** Display height in px, tuned per logo so they look the same visual size. */
  height?: number;
};

const brands: Brand[] = [
  { name: "Unitree", logo: "/logos/unitree.svg", height: 24 },
  { name: "AgiBot", logo: "/logos/agibot.png", height: 34 },
  { name: "Booster Robotics", logo: "/logos/booster.svg", height: 20 },
  { name: "Keenon", logo: "/logos/keenon.png", height: 38 },
  { name: "Pudu", logo: "/logos/pudu.svg", height: 26 },
  { name: "DJI", logo: "/logos/dji.svg", height: 30 },
  { name: "Boston Dynamics", logo: "/logos/boston-dynamics.svg", height: 44 },
  { name: "FANUC", logo: "/logos/fanuc.svg", height: 30 },
  { name: "KUKA", logo: "/logos/kuka.svg", height: 22 },
  { name: "ABB", logo: "/logos/abb.svg", height: 26 },
  { name: "ROBOTIS", logo: "/logos/robotis.png", height: 24 },
];

function BrandItem({ brand }: { brand: Brand }) {
  return (
    <li className="flex h-12 shrink-0 items-center px-8 md:px-12">
      {brand.logo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logo}
          alt={brand.name}
          style={{ height: brand.height ?? 28 }}
          className="w-auto max-w-[190px] object-contain opacity-70 brightness-0 invert"
        />
      ) : (
        <span className="whitespace-nowrap text-xl font-semibold tracking-tight text-white/60 md:text-2xl">
          {brand.name}
        </span>
      )}
    </li>
  );
}

/** Scrolling strip of robot makers, right below the home hero. */
export function BrandStrip() {
  // The track holds the list twice and slides by half its width, so the loop is seamless.
  // One copy of the list is already wider than large screens.
  const half = brands;

  return (
    <section className="border-b border-hairline bg-black py-12 md:py-14">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <h2 className="text-premium text-2xl font-semibold tracking-tight text-white sm:text-3xl">
            We work on the biggest names in robotics and drones
          </h2>
        </Reveal>
        <Reveal delayMs={60}>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-white/60">
            Our agent works on any robot, drone, or physical AI device, regardless of manufacturer.
          </p>
        </Reveal>
      </div>

      <div className="mask-fade-x mt-10 overflow-hidden" aria-hidden>
        <ul className="animate-marquee-slow flex w-max hover:[animation-play-state:paused]">
          {[...half, ...half].map((brand, i) => (
            <BrandItem key={`${brand.name}-${i}`} brand={brand} />
          ))}
        </ul>
      </div>
      <ul className="sr-only">
        {brands.map((brand) => (
          <li key={brand.name}>{brand.name}</li>
        ))}
      </ul>
    </section>
  );
}
