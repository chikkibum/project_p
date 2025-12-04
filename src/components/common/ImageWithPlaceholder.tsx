import Image, { type ImageProps } from 'next/image';
import { shimmer, toBase64 } from '@/lib/image';

interface ImageWithPlaceholderProps extends ImageProps {
  width?: number;
  height?: number;
  fill?: boolean;
}

export default function ImageWithPlaceholder({
  width,
  height,
  fill,
  alt,
  ...props
}: ImageWithPlaceholderProps) {
  // Generate placeholder dimensions
  // If fill is used, use default dimensions, otherwise use provided width/height
  const placeholderWidth = width || 1920;
  const placeholderHeight = height || 1080;

  // Generate the shimmer placeholder SVG and convert to base64
  const shimmerSvg = shimmer(placeholderWidth, placeholderHeight);
  const blurDataURL = `data:image/svg+xml;base64,${toBase64(shimmerSvg)}`;

  return (
    <Image
      {...props}
      alt={alt}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      fill={fill}
      placeholder="blur"
      blurDataURL={blurDataURL}
    />
  );
}

