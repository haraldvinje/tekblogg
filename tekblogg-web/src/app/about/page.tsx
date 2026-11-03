import { Metadata } from "next";
import { About } from "./about";
import { PageTransition } from "@/components/page-transition";

export const metadata: Metadata = {
  title: "Om TekBlogg",
  description:
    "TekBlogg er en blogg om teknologi og programmering. Bloggen er drevet av Harald Vinje.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    images: ["/harald_og.png"],
  },
};

export default async function AboutPage() {
  return (
    <PageTransition>
      <About />
    </PageTransition>
  );
}
