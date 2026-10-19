"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

const ContactPage = () => {

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({ "namespace": "introduction" });
      cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
    })();
  }, [])

  return (
    <section id="book-call" className="mx-auto max-w-[1080px] px-5 py-12 sm:px-8 sm:py-16 space-y-12">
      <div className="border-b border-black/15 pb-7 sm:pb-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-black/45">Free audit</p>
        <h2 className="mt-6 max-w-[760px] text-balance text-[clamp(2.1rem,3.2vw,3.25rem)] font-medium leading-[1.05] tracking-[-0.05em] text-[#242424]">
          Know what is not working. <span className="font-apparel font-normal">Know what to fix next.</span>
        </h2>
      </div>
      <Cal namespace="introduction"
        calLink="awakenxstudios/introduction"
        style={{ width: "100%", height: "100%", overflow: "scroll", }}
        config={{ "layout": "month_view", "useSlotsViewOnSmallScreen": "true" }}
      />
    </section>
  );
};

export default ContactPage;
