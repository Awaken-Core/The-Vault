"use client";

import { Toaster } from "@repo/ui";
import { GoogleOAuthProvider } from "@react-oauth/google";
import QueryProvider from "./query-client";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => {
    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
            <QueryProvider>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Toaster position="bottom-right" />
                </ThemeProvider>
            </QueryProvider>
        </GoogleOAuthProvider>
    );
};

export default Providers;
