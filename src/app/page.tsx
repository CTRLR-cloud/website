import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ContactUsSection } from "@/components/ContactUsSection";
import { PageIntro } from "@/components/PageIntro";
import { ParallaxTextSection } from "@/components/ParallaxTextSection";
import { StoriesSection } from "@/components/StoriesSection";
import { getCachedStories } from "@/lib/roboticsFeeds";
import { UseCasesHorizontalScrollSection } from "@/components/UseCasesHorizontalScrollSection";
import { FocusOnWhatMattersSection } from "@/components/FocusOnWhatMattersSection";
import { WhyCTRLRSection } from "@/components/WhyCTRLRSection";
import { CommandHQ } from "@/components/CommandHQ";
import { HomeHero } from "@/components/HomeHero";
import { SeeItInActionSection } from "@/components/SeeItInActionSection";
import { BrandStrip } from "@/components/BrandStrip";
import { PilotSection } from "@/components/PilotSection";
import { RoboticsCompaniesSection } from "@/components/RoboticsCompaniesSection";

export default async function Home() {
  const stories = await getCachedStories();

  return (
    <div className="min-h-screen flex flex-col">
      <PageIntro />
      <SiteHeader />

      <main className="pt-16 flex-1">
        <HomeHero />
        <BrandStrip />
        <WhyCTRLRSection />
        <SeeItInActionSection />
        <ParallaxTextSection />
        <CommandHQ />
        <UseCasesHorizontalScrollSection />
        <RoboticsCompaniesSection />
        <FocusOnWhatMattersSection />
        <StoriesSection stories={stories} />
        <PilotSection />
        <ContactUsSection />
      </main>

      <SiteFooter />
    </div>
  );
}
