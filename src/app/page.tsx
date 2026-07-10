import type { Metadata } from "next";
import { getContent } from "@/lib/content";
import Navbar from "@/components/site/navbar";
import Hero from "@/components/site/hero";
import SelectedWork from "@/components/site/selected-work";
import FrameWall from "@/components/site/frame-wall";
import About from "@/components/site/about";
import Services from "@/components/site/services";
import Process from "@/components/site/process";
import WhyMe from "@/components/site/why-me";
import Testimonials from "@/components/site/testimonials";
import Contact from "@/components/site/contact";
import Footer from "@/components/site/footer";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const content = await getContent();
  return {
    title: `${content.brand.name} · ${content.brand.tagline}`,
    description: content.about.text,
  };
}

export default async function Home() {
  const content = await getContent();

  return (
    <>
      <Navbar brandName={content.brand.name} hireMeLabel={content.nav.hireMeLabel} />
      <main>
        <Hero
          titleLine1={content.hero.titleLine1}
          titleLine2={content.hero.titleLine2}
          highlightWord={content.hero.highlightWord}
          imageLeft={content.hero.imageLeft}
          imageRight={content.hero.imageRight}
        />
        <SelectedWork
          eyebrow={content.selectedWork.eyebrow}
          heading={content.selectedWork.heading}
          subheading={content.selectedWork.subheading}
          groups={content.projectGroups}
        />
        <FrameWall
          eyebrow={content.frameWall.eyebrow}
          heading={content.frameWall.heading}
          images={content.frameImages}
        />
        <About eyebrow={content.about.eyebrow} text={content.about.text} tools={content.tools} />
        <Services
          eyebrow={content.services.eyebrow}
          heading={content.services.heading}
          subheading={content.services.subheading}
          items={content.serviceItems}
        />
        <Process
          eyebrow={content.process.eyebrow}
          heading={content.process.heading}
          subheading={content.process.subheading}
          steps={content.processSteps}
        />
        <WhyMe eyebrow={content.whyMe.eyebrow} heading={content.whyMe.heading} items={content.highlights} />
        <Testimonials
          eyebrow={content.testimonials.eyebrow}
          heading={content.testimonials.heading}
          items={content.testimonialItems}
        />
        <Contact
          eyebrow={content.contact.eyebrow}
          heading={content.contact.heading}
          email={content.contact.email}
          socialLinks={content.socialLinks}
        />
      </main>
      <Footer
        brandName={content.brand.name}
        tagline={content.footer.tagline}
        copyrightName={content.footer.copyrightName}
      />
    </>
  );
}
