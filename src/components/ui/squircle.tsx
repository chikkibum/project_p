"use client";

// to use the filter just add this to your layout.tsx
// <SquiCircleFilterStatic/>
// {children}

// on element you need to add squicircle just add the filter id SkiperSquiCircleFilterLayout
//<div style={{filter: "url(#SkiperSquiCircleFilterLayout)"}}></div>

// thats it you can use the filter now no extra rerenders no complications just pure css filter

export const SquiCircleFilterStatic = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SkiperSquiCircleFilterLayout">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
};

export const SquiCircleFilter = ({
  blurValue = 10,
  colorMatrixValue = 20,
  alphaValue = -7,
}: {
  blurValue?: number;
  colorMatrixValue?: number;
  alphaValue?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SquiCircleFilter">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blurValue}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 ${colorMatrixValue} ${alphaValue}`}
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
};
