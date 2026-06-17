import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Placeholder } from "@/components/ui/Placeholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FinalCtaBand } from "@/components/home/FinalCtaBand";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { webPageSchema, breadcrumbSchema } from "@/lib/schema";
import { areasServed } from "@/data/site";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Locally owned window cleaning in St. George & Southern Utah, started in 2025 on honest work and a spotless finish. Meet the WinPro crew.",
  path: "/about",
});

// Values — Quality, Reliability, Integrity (§5.5).
const values = [
  {
    title: "Quality",
    body: "We do it by hand and we don't cut corners — literally. If it's not spotless, we're not done.",
  },
  {
    title: "Reliability",
    body: "We show up when we say we will, ready to work. No no-shows, no runaround.",
  },
  {
    title: "Integrity",
    body: "Honest quotes, honest work, honest pricing. We treat your home like it's our own.",
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={webPageSchema({
          name: "About WinPro Window Cleaning",
          description:
            "Locally owned window cleaning in St. George & Southern Utah, started in 2025.",
          path: "/about",
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <PageHero
        eyebrow="About us"
        title="Small-town window cleaners who actually show up"
        description="WinPro is locally owned and Southern Utah based — built on honest work and a clean finish you can see."
      />

      {/* Story */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-center justify-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Placeholder
              label="The WinPro crew"
              alt="The WinPro window cleaning crew in St. George"
              ratio="wide"
              className="rounded-2xl"
              src="/photos/action-employees.jpg"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div>
              <SectionHeading eyebrow="Our story" title="Started in 2025 by a couple of friends" />
              <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/75">
                <p>
                  We started WinPro in 2025 as a couple of friends who wanted to do honest
                  work and do it right. No upsells, no runaround — just clean windows and a
                  crew you can count on.
                </p>
                <p>
                  We’re proud to be local. We know Southern Utah’s red dust and hard water
                  because we live with it too, and we’ve built our whole service around
                  keeping your glass clear despite it.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-cloud py-16 lg:py-24">
        <Container>
          <SectionHeading
            align="center"
            eyebrow="What we stand for"
            title="Three things we never compromise on"
          />
          <div className="mt-10 grid grid-cols-1 justify-center gap-5 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-ink/10 bg-white p-6">
                <h3 className="font-display text-xl font-bold text-ink">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/70">{v.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Areas served */}
      <section className="bg-white py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <SectionHeading
                eyebrow="Where we work"
                title="Proudly serving Southern Utah"
                description="If you're nearby and don't see your town, reach out — chances are we cover you."
              />
              <ul className="mt-8 flex flex-wrap gap-3">
                {areasServed.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-ink/10 bg-cloud px-5 py-2.5 text-[15px] font-medium text-ink/80"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>
            <div className="overflow-hidden rounded-2xl border border-ink/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d203771.4395285106!2d-113.74089565!3d37.0965278!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80ca44d39857c5b1%3A0x6f1be5c9d19c3c1d!2sSt.%20George%2C%20UT!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="WinPro service area map - St. George & Southern Utah"
                className="grayscale"
              />
            </div>
          </div>
        </Container>
      </section>

      <FinalCtaBand />
    </>
  );
}
