import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: {
        template: "%s | Carrot Market",
        default: "Carrot Market",
    },
    description: "Sell and buy all the things!",
};

export default function RootLayout({
    children,
    //@ts-ignore
    carrot,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="min-h-screen bg-neutral-900 text-white max-w-screen-sm mx-auto">
                {carrot}
                {children}
            </body>
        </html>
    );
}
