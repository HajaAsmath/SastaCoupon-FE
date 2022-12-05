import comingSoon from "./coming_soon.jpg";

export default function ComingSoon() {
  return (
    <img
      src={comingSoon}
      alt="coming soon"
      style={{
        maxWidth: "40%",
      }}
    />
  );
}
