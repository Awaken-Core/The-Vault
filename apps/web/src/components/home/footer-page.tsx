import { MoveUpRight, PhoneCall } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import CalDotCom from "./clickable-cal-dot-com";

const footerLinks = [
    { title: "Explore", links: [["Services", "#services"], ["About", "#about"], ["Work", "#work"]] },
    { title: "Connect", links: [["Instagram", "https://instagram.com/awakenxstudios"], ["LinkedIn", "https://www.linkedin.com/company/awakenxstudios/"], ["Email", "mailto:awakenstudios@gmail.com"]] },
    { title: "Legal", links: [["Privacy Policy", "#"], ["Terms of Service", "#"], ["Cookies", "#"]] },
];

const FooterPage = () => (
    <footer id="contact" className="m-2 overflow-hidden border-4 border-white bg-[#131313] text-white rounded-[2rem]">
        <div className="mx-auto max-w-6xl px-6 pt-20 sm:px-10 sm:pt-24">
            <div className="text-center">
                <h2 className="text-[clamp(2rem,3.2vw,3.25rem)] font-medium leading-[0.95] tracking-[-0.05em]">
                    Ready to build or grow?
                    <span className="mt-1 block font-apparel font-normal tracking-[-0.03em]">Let’s get to work.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/45">
                    Get a free audit of your website, product, marketing, or search visibility. We will tell you what to fix first.
                </p>

                <div className="mx-auto mt-10 flex max-w-[400px] flex-col gap-2 sm:flex-row">
                    <Link
                        href="#work"
                        className="h-11 min-w-0 flex-1 rounded-full border border-white/5 bg-[#282828] transition-all ease-in-out duration-150 hover:bg-[#3c3c3c] px-5 text-sm tracking-tight text-white outline-none placeholder:text-white/55 flex items-center justify-center font-medium gap-2 hover:-translate-y-0.5"
                    >
                        <span>Explore Our Work</span>
                        <MoveUpRight className="size-4" />
                    </Link>
                    <CalDotCom>
                        <button className="h-11 rounded-full bg-[#51b7ff] px-7 text-sm font-normal transition-all ease-in-out duration-150 hover:bg-[#21a3ff] flex items-center gap-2 tracking-tight hover:-translate-y-0.5">
                            <span>Claim Your Free Audit</span>
                            <PhoneCall className="size-4" />
                        </button>
                    </CalDotCom>
                </div>
            </div>

            <div className="mt-20 grid gap-12 border-t border-white/10 pt-12 sm:grid-cols-[1.8fr_3fr] sm:gap-20">
                <div>
                    <Link href="#top" className="inline-flex items-center gap-3 text-2xl font-medium tracking-[-0.04em]">
                        <span className="flex size-8 scale-110 items-center justify-center rounded-full bg-white">
                            <Image src="/assets/logo/logo-dark.svg" alt="" width={23} height={23} />
                        </span>
                        Awaken Studios.
                    </Link>
                    <p className="mt-4 max-w-[240px] text-sm leading-relaxed text-white/40">
                        Design and development for brands, founders, and business owners.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
                    {footerLinks.map((group) => (
                        <div key={group.title}>
                            <h3 className="mb-4 text-sm font-medium">{group.title}</h3>
                            <ul className="space-y-2.5 text-sm text-white/40">
                                {group.links.map(([label, href]) => (
                                    <li key={label}>
                                        <Link href={href} className="transition-colors hover:text-white">{label}</Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>

            <div aria-hidden="true" className="h-[clamp(8rem,18vw,16rem)] overflow-hidden pt-10">
                <p className="text-center text-[clamp(7rem,18vw,16rem)] font-semibold text-[#2c2c2c] font-candle">
                    Awaken
                </p>
            </div>
        </div>
    </footer>
);

export default FooterPage;
