import { requireAuth } from "@/utils/auth-utils";
import { redirect } from "next/navigation";

const RootPage = async () => {
    await requireAuth();

    return redirect("/home");
};

export default RootPage;