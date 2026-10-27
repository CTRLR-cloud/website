import { SITE_LINKS } from "@/config/links";
import { DEFAULT_DESCRIPTION, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/seo";

/**
 * Machine-readable facts about CTRL+R (schema.org JSON-LD) for search engines and AI assistants.
 * Only states what the site itself says: no prices, ratings, or customer names.
 */
export function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: SITE_NAME,
        url: SITE_URL,
        logo: `${SITE_URL}/Main-CTRLR-logo-trans-bg.png`,
        email: SITE_LINKS.EMAIL,
        slogan: TAGLINE,
        address: { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
        areaServed: ["United Arab Emirates", "Gulf Cooperation Council"],
        sameAs: [SITE_LINKS.LINKEDIN],
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        url: SITE_URL,
        name: SITE_NAME,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
      {
        "@type": "SoftwareApplication",
        "@id": `${SITE_URL}/#software`,
        name: SITE_NAME,
        url: SITE_URL,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web browser",
        description: DEFAULT_DESCRIPTION,
        featureList: [
          "Teleoperation of robots and drones from a web browser",
          "Fleet management across sites, teams, and devices",
          "Live map of every connected robot, drone, camera, and sensor",
          "Recorded, time-stamped sessions and searchable logs",
          "Role-based access control and audit trail",
          "End-to-end encrypted sessions",
          "Custom controllers, keyboard bindings, and ROS commands",
          "Works with robots from any manufacturer",
        ],
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };
  return (
    <script
      type="application/ld+json"
      // JSON-LD must be raw JSON in the page; the content is our own constants, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
