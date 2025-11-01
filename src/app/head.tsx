// src/app/head.tsx
export default function Head() {
  return (
    <>
      {/* Preload the heaviest hero layers */}
      <link rel="preload" as="image" href="/citypop/citypop_skyline_far.png" />
      <link rel="preload" as="image" href="/citypop/citypop_street_mid.png" />
      <link rel="preload" as="image" href="/citypop/citypop_palm_near.png" />
      <link rel="preload" as="audio" href="/audio/BGM.mp3" />
    </>
  );
}
