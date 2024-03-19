export default function manifest() {
  return {
    name: "100 AI Tools",
    short_name: "100 AI Tools",
    description:
      "100 AI Tools is an AI Tools directory site. Here users can add their tools and promote them.",
    start_url: "/",
    display: "standalone",
    background_color: "#161618",
    theme_color: "#AE6EFF",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
