import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@repo/ui"

const faqs = [
  {
    question: "What can Awaken Studios help me launch or grow?",
    answer: "We build SaaS products, MVPs, websites, and brand systems. We also handle marketing, SEO, answer engine optimization, and generative engine optimization.",
  },
  {
    question: "Do you work with solo founders as well as established brands?",
    answer: "Yes. We work with solo founders, business owners, small teams, and established brands. We adjust the scope to your goals, budget, and stage.",
  },
  {
    question: "How quickly can you launch an MVP or website?",
    answer: "Most websites and MVPs take four to eight weeks. We confirm the scope, timeline, and milestones before work starts.",
  },
  {
    question: "Do you handle strategy, design, and development together?",
    answer: "Yes. We handle strategy, UX, visual design, development, testing, and launch. You work with one team from start to finish.",
  },
  {
    question: "What is included in the free audit?",
    answer: "We check your positioning, UX, conversion flow, performance, SEO, accessibility, and AI-search visibility. You get a prioritized list of fixes. There is no obligation to hire us.",
  },
  {
    question: "What happens after I book a call?",
    answer: "We discuss your goals, problems, audience, and timeline. Then we send you a recommended plan, price, and delivery schedule.",
  },
]

const FaqPage = () => {
    return (
        <section id="faq" className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 space-y-6">
            <div className="border-b pb-7 sm:pb-8">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">FAQs</p>
                <h2 className="mt-6 max-w-[760px] text-balance text-[clamp(2.1rem,3.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.05em] text-[#242424] space-x-2">
                    <span>Questions?</span>
                    <span className="font-apparel font-normal">Here are the answers.</span>
                </h2>
            </div>

            <Accordion type="single" collapsible className="w-full border-t border-black/15">
                {faqs.map((faq, index) => (
                    <AccordionItem key={faq.question} value={`faq-${index + 1}`} className="border-black/15">
                        <AccordionTrigger className="py-6 text-base font-medium tracking-[-0.02em] text-[#242424] hover:no-underline sm:py-7 sm:text-lg">
                            <span className="flex items-start gap-5 sm:gap-8">
                                <span className="pt-1 text-[10px] font-normal tabular-nums text-black/35">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <span>{faq.question}</span>
                            </span>
                        </AccordionTrigger>
                        <AccordionContent className="max-w-2xl pb-6 pl-9 pr-10 text-sm leading-relaxed text-black/50 sm:pb-7 sm:pl-[4.5rem]">
                            {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
            </Accordion>

        </section>
    )
}

export default FaqPage;
