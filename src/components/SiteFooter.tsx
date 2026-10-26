"use client";

import Link from "next/link";
import { CtrlRLogo } from "@/components/CtrlRLogo";
import { SITE_LINKS } from "@/config/links";

export function SiteFooter() {
  return (
    <footer className="border-t border-hairline bg-section">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="flex flex-col gap-10 md:flex-row md:flex-wrap md:items-start md:gap-x-10 lg:gap-x-14 xl:gap-x-16">
          <div className="max-w-xs shrink-0 sm:max-w-sm">
            <Link href="/" className="rounded ring-premium inline-flex">
              <span className="text-[var(--accent)]">
                <CtrlRLogo variant="footer" />
              </span>
            </Link>
            <p className="mt-3 max-w-sm text-base font-medium leading-snug text-white/90 sm:text-lg">
              One unified platform for your entire{" "}
              <span className="text-gradient whitespace-nowrap">physical AI fleet</span>
            </p>
            <p className="mt-3 text-sm text-white/45">Built in Dubai · Serving the UAE &amp; GCC</p>

          </div>

          <div className="min-w-[9rem]">
            <div className="text-sm font-semibold text-white/80">Pages</div>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/docs">
                  Docs
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/news">
                  News
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-white ring-premium rounded"
                  href="/platform"
                >
                  Platform
                </Link>
              </li>
              <li>
                <Link className="hover:text-white ring-premium rounded" href="/contact">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="min-w-[9rem]">
            <div className="text-sm font-semibold text-white/80">Links</div>
            <ul className="mt-4 space-y-2 text-sm text-white/55">
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={SITE_LINKS.DEMO}
                  target="_blank"
                  rel="noreferrer"
                >
                  Book a demo
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={SITE_LINKS.CLIENT}
                  target="_blank"
                  rel="noreferrer"
                >
                  Launch Client
                </a>
              </li>
              <li>
                <a
                  className="hover:text-white ring-premium rounded"
                  href={SITE_LINKS.LINKEDIN}
                  target="_blank"
                  rel="noreferrer"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-hairline pt-6 text-xs leading-5 text-white/35 sm:flex-row sm:items-baseline sm:justify-between">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-4">
            <span>Copyright © {new Date().getFullYear()} CTRL+R. All rights reserved.</span>
            <Link
              href="/privacy"
              className="text-white/45 hover:text-white/80 transition ring-premium rounded w-fit"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
