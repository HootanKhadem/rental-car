import Image from "next/image";
import React from "react";

type Props = {
  src?: string;
  alt?: string;
  title?: string;
  priceLabel?: React.ReactNode;
};

export default function HeroImage({
  src = "/porsche-pic.jpg",
  alt = "Toyota Land Cruiser 300",
  title = "Porsche 911 GT3",
  priceLabel = (
    <>
      <span className="font-medium">55</span> / day
    </>
  ),
}: Props) {
  return (
    <div className="flex items-center justify-end lg:col-span-1 col-span-2">
      <div className="w-full h-full max-w-none rounded-xl overflow-hidden shadow-lg relative">
        <Image
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          width={1200}
          height={800}
          priority
        />

        <div className="absolute inset-x-0 bottom-0 p-4 text-white">
          <div className="bg-black/30 backdrop-blur-sm rounded-md px-3 py-2">
            <div className="text-xl font-serif">{title}</div>
            <div className="text-sm text-zinc-200 mt-1">KWD {priceLabel}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
