import ChoteiSite from "./ChoteiSite";

const restaurantSchema = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: "長亭 CHOTEI",
  servesCuisine: ["Chinese", "Japanese"],
  telephone: "+81-50-3101-3945",
  address: {
    "@type": "PostalAddress",
    postalCode: "106-0032",
    addressRegion: "東京都",
    addressLocality: "港区",
    streetAddress: "六本木7-13-9 1F",
    addressCountry: "JP",
  },
  url: "https://chotei-restaurant.fllmoon.chatgpt.site",
  image: "/images/real/hero-counter.webp",
  acceptsReservations: "https://restaurant.ikyu.com/149159",
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <ChoteiSite />
    </>
  );
}
