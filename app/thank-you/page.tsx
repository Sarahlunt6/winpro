import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Thank you",
  description: "Your quote request was received. We'll be in touch within 24 hours.",
  robots: { index: false }, // no reason to index the confirmation page
};

// Post-submission confirmation (§5 sitemap, §6).
export default function ThankYouPage() {
  return (
    <section className="bg-cloud py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-xl text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-sky-light text-sky">
            <CheckIcon />
          </span>
          <h1 className="mt-6 text-balance text-3xl font-extrabold leading-tight sm:text-4xl">
            Request received — thank you!
          </h1>
          <p className="mx-auto mt-4 max-w-md text-lg text-ink/70">
            We&apos;ll review the details and call you within 24 hours to confirm and
            get you a price. Need us sooner? Give us a ring.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href={site.phoneHref} size="lg" className="w-full sm:w-auto">
              Call {site.phone}
            </Button>
            <Button href="/" variant="ghost" size="lg" className="w-full sm:w-auto">
              Back to home
            </Button>
          </div>
          <p className="mt-8 text-sm text-ink/50">
            Follow our work on{" "}
            <a
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sky hover:underline"
            >
              Instagram {site.instagram.handle}
            </a>
          </p>
        </div>
      </Container>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}
