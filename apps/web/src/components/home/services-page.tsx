const services = [
  ["01", "SaaS & MVP development", "We turn your idea into a working, scalable product and get it ready to launch."],
  ["02", "Web & product design", "We design clear, easy-to-use websites and products that turn visitors into customers."],
  ["03", "Web development", "We build fast, responsive, reliable websites that work on every device."],
  ["04", "Brand design", "We create your logo, visual identity, and design system so your brand looks consistent everywhere."],
  ["05", "Marketing", "We plan and run campaigns that bring the right people to your product or business."],
  ["06", "SEO, AEO & GEO", "We help your business appear in Google, answer engines, and AI-generated search results."],
  ["07", "Free audit", "We review your website, product, and search visibility. You get a clear list of what to fix first."],
];

const ServicePage = () => (
  <section id="services" className="mx-auto max-w-[1080px] px-5 py-20 sm:px-8 sm:py-24">
    <div id="about" className="border-b border-black/15 pb-14 sm:pb-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">What we do</p>
      <h2 className="mt-6 max-w-[760px] text-balance text-[clamp(2.1rem,3.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.05em] text-[#242424]">
        Design. Development. Marketing. <span className="font-apparel font-normal">One team.</span>
      </h2>
    </div>

    <div className="divide-y divide-black/15">
      {services.map(([number, title, copy]) => (
        <article key={number} className="grid gap-4 py-8 sm:grid-cols-[0.35fr_0.9fr_1.35fr] sm:items-start sm:gap-8">
          <span className="text-xs text-black/35">{number}</span>
          <h3 className="text-xl font-medium tracking-[-0.03em]">{title}</h3>
          <p className="max-w-md text-sm leading-relaxed text-black/50">{copy}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ServicePage;
