import { Helmet } from "react-helmet-async";

export default function SEO({
  title = "Proven Profit Brand | High-Converting Websites",
  description = "We build modern websites, funnels, and systems that help businesses grow and convert more customers.",
  url = "https://www.provenprofitbrand.com",
  image = "https://www.provenprofitbrand.com/og-image.png"
}) {
  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph (WhatsApp / Facebook) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Optional SEO hints */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  );
}