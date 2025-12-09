import Image from "next/image";

type ProductGalleryProps = {
  alt: string;
  src: string;
};

export default function ProductGallery({ alt, src }: ProductGalleryProps) {
  return (
    <div className="flex flex-1 justify-center rounded-2xl bg-white p-4">
      <div className="relative flex h-64 w-full items-center justify-center">
        <Image
          src={src}
          alt={alt}
          width={400}
          height={400}
          className="h-full w-full object-contain"
        />
      </div>
    </div>
  );
}
