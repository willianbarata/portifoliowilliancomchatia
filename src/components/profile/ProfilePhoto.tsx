"use client";

import { useState } from "react";

export function ProfilePhoto({ size = 128 }: { size?: number }) {
  const sources = ["/william.jpg", "/profile.jpg", "/profile.jpeg", "/profile.png", "/profile.webp"];
  const [index, setIndex] = useState(0);
  const src = sources[index] ?? "/profile-placeholder.svg";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      onError={() => setIndex((i) => Math.min(i + 1, sources.length))}
      alt="Foto de perfil"
      width={size}
      height={size}
      className="rounded-full ring-2 ring-blue-500/30 object-cover"
      style={{ width: size, height: size }}
    />
  );
}
