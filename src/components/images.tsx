'use client';

import Image from 'next/image';
import { Circle, Difference } from '../hooks/usespot';

type Props = {
  image1: string;
  image2: string;
  handleClick: (e: React.MouseEvent<HTMLCanvasElement>, canvas: HTMLCanvasElement) => void;
  canvas1Ref: React.RefObject<HTMLCanvasElement | null>;
  canvas2Ref: React.RefObject<HTMLCanvasElement | null>;
  circles: Circle[];
  differences: Difference[];
};

export default function GameImages({
  image1,
  image2,
  handleClick,
  canvas1Ref,
  canvas2Ref,
  circles,
  differences = [],
}: Props) {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;

  return (
    <div className="flex flex-col md:flex-row gap-4 justify-center relative w-full">
      {[image1, image2].map((img, idx) => (
        <div
          key={idx}
          className="relative w-full md:w-[600px] h-[400px] border overflow-hidden flex-shrink-0"
        >
          <Image
            src={img}
            alt={`Image ${idx + 1}`}
            fill
            className="object-contain"
          />

          <canvas
            ref={idx === 0 ? canvas1Ref : canvas2Ref}
            className="absolute top-0 left-0 w-full h-full"
            onClick={(e) =>
              handleClick(e, (idx === 0 ? canvas1Ref : canvas2Ref).current!)
            }
          />

          {differences.map((diff, i) => {
            const coords = isMobile ? diff.mobile : diff.desktop;
            return (
              <div
                key={`diff-${i}-${idx}`}
                className="absolute border-none"
                style={{
                  top: `${coords.yPercent}%`,
                  left: `${coords.xPercent}%`,
                  width: `${coords.widthPercent}%`,
                  height: `${coords.heightPercent}%`,
                  pointerEvents: 'none',
                }}
              />
            );
          })}
        </div>
      ))}

      {circles.map(({ x, y, status, id }) => (
        <div
          key={id}
          className={`absolute rounded-full border-4 ${
            status === 'pending'
              ? 'border-yellow-500 bg-yellow-300/50'
              : ''
          } ${
            status === 'correct'
              ? 'border-green-600 bg-green-400/50'
              : ''
          }`}
          style={{
            top: y - 25,
            left: x - 25,
            width: 50,
            height: 50,
            pointerEvents: 'none',
            transition: 'background-color 0.5s ease',
          }}
        />
      ))}
    </div>
  );
}
