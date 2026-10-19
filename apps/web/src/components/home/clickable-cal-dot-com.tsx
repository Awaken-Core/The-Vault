"use client";

import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function CalDotCom({ className, children = "Click here" }: { className?: string, children?: string | React.ReactNode }) {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ "namespace": "introduction" });
            cal("ui", { "hideEventTypeDetails": false, "layout": "month_view" });
        })();
    }, [])
    return (
        <div className={className} data-cal-namespace="introduction"
            data-cal-link="awakenxstudios/introduction"

            data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true"}'
        >{children}</div>
    );
};