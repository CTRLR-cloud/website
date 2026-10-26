import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactUsSection } from "@/components/ContactUsSection";
import { PageIntro } from "@/components/PageIntro";
import { UseCasesHorizontalScrollSection } from "@/components/UseCasesHorizontalScrollSection";
import { BuiltForAnyoneSection } from "@/components/BuiltForAnyoneSection";
import { CommandHQ } from "@/components/CommandHQ";
import { InteractiveSession } from "@/components/InteractiveSession";
import { HomeHero } from "@/components/HomeHero";
import { SeeItInActionSection } from "@/components/SeeItInActionSection";
import { BrandStrip } from "@/components/BrandStrip";
import { PilotSection } from "@/components/PilotSection";
import { RoboticsCompaniesSection } from "@/components/RoboticsCompaniesSection";

export const metadata: Metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <PageIntro />
      <SiteHeader />

      <main className="pt-16 flex-1">
        <HomeHero />
        <BrandStrip />
        <BuiltForAnyoneSection />
        <SeeItInActionSection />
        <UseCasesHorizontalScrollSection />
        <PilotSection />
        <CommandHQ />
        <InteractiveSession />
        <RoboticsCompaniesSection />
        <ContactUsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
