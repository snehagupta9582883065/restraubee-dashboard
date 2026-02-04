import { Navbar } from "@/components/navbar";
import { SmoothScroll } from "@/components/smooth-scroll";

export default function MarketingLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <SmoothScroll>
            <Navbar />
            {children}
        </SmoothScroll>
    );
}
