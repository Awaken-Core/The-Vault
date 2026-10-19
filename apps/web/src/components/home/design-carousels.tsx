"use client";

import { useEffect, useState } from "react";
import { getDesignCarouselItems } from "@/actions/design-actions";
import FlexCarousel, { type FlexCarouselItem } from "./carousels";

const DesignCarousels = () => {
  const [items, setItems] = useState<FlexCarouselItem[]>();
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    let active = true;

    const loadDesigns = async () => {
      try {
        const designs = await getDesignCarouselItems();

        if (!designs.length) throw new Error("The design API returned no images");
        if (active) setItems(designs);
      } catch {
        if (active) setLoadFailed(true);
      }
    };

    loadDesigns();
    return () => {
      active = false;
    };
  }, []);

  return (
    <section id="work" className="mx-auto max-w-[1080px] space-y-8 px-5 py-12 sm:px-8 sm:py-16">
      <div className="border-b border-black/15 pb-7 sm:pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">Selected crazy work</p>
        <h2 className="mt-6 max-w-[760px] text-balance text-[clamp(2.1rem,3.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.05em] text-[#242424]">
          Quality work. <span className="font-apparel font-normal">Thats Passion.</span>
        </h2>
      </div>

      <div className="relative h-[440px] overflow-hidden rounded-[1.5rem] bg-[#ecece8] sm:h-[560px]">
        <FlexCarousel
          items={items}
          preset="liquid"
          intro="rise"
          cardHeight={0.5}
          gap={12}
          squeeze={0.2}
          focusOnClick
          captions
          fit="natural"
          radius={0}
          lensWidth={0.74}
          lensHeight={1.18}
          tilt={62}
          roundness={1}
          bend={0.34}
          reach={0.38}
          curl="twist"
          dispersion={0.45}
          liquid={0}
          followCursor={false}
          autoplay
          interval={4}
          captureWheel={false}
        />

        {!items && !loadFailed && (
          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.16em] text-black/35">
            Loading recent work
          </p>
        )}
        {loadFailed && (
          <p className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.16em] text-black/35">
            Showing demo collection
          </p>
        )}
      </div>
    </section>
  );
};

export default DesignCarousels;
