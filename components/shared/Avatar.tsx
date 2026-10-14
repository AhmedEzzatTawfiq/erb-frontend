
'use client';

import { AvatarProps } from '@/types/avatar';
import Image from 'next/image';
import { useEffect, useState } from 'react';


const SIZES = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 192,
} as const;

function getInitials(name?: string, initials?: string) {
  if (initials?.trim()) return initials.trim();

  const parts = name?.trim().split(/\s+/).filter(Boolean) ?? [];

  if (!parts.length) return 'EM';

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export default function Avatar({
  avatar,
  name,
  initials,
  initialsBg = 'bg-blue-100 text-blue-700',
  size = 'md',
  className = '',
  alt,
}: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  const dimension = SIZES[size];
  const imageSrc = avatar?.trim();
  const showImage = Boolean(imageSrc) && !hasError;

  useEffect(() => {
    setHasError(false);
  }, [imageSrc]);

  if (!showImage) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full font-bold select-none ${initialsBg} ${className}`}
        style={{
          width: dimension,
          height: dimension,
        }}
        aria-label={name || 'Avatar'}
      >
        {getInitials(name, initials)}
      </span>
    );
  }

  return (
    <Image
      src={imageSrc!}
      width={dimension}
      height={dimension}
      alt={alt || name || 'Avatar'}
      className={`shrink-0 rounded-full object-cover ${className}`}
      onError={() => setHasError(true)}
    />
  );
}
