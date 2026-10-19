"use server";

const DESIGNS_ENDPOINT = "https://design.mehulxbuilds.in/api/v1/design/all";

interface DesignRecord {
  id: string;
  title: string;
  description: string | null;
  url: string;
}

interface DesignsResponse {
  success: boolean;
  design: DesignRecord[];
}

export interface DesignCarouselItem {
  src: string;
  alt: string;
  title: string;
  subtitle: string;
}

export async function getDesignCarouselItems(): Promise<DesignCarouselItem[]> {
  const response = await fetch(DESIGNS_ENDPOINT, {
    next: { revalidate: 60 * 30 },
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error(`Design API returned ${response.status}`);
  }

  const data = (await response.json()) as DesignsResponse;
  const designs = Array.isArray(data.design) ? data.design : [];

  return designs
    .filter((design) => Boolean(design.url && design.title))
    .map((design) => ({
      src: design.url,
      alt: design.description || `${design.title} design by Awaken Studios`,
      title: design.title,
      subtitle: design.description || "Awaken Studios",
    }));
}

