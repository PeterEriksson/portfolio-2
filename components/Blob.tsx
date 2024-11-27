//https://www.fffuel.co/bbblurry/
//blob hex generate
//the hex color used here is #1b3448 . changed to slightly darker.

//className="pointer-events-none opacity-80 absolute top-1/2 transform  -translate-y-[60%] scale-x-[2]   md:scale-[] scale-y-[1.5] md:scale-y-100  "

type Props = {
  bottomCornerLeft?: boolean;
  bottomCornerRight?: boolean;
};

export default function Blob({ bottomCornerLeft, bottomCornerRight }: Props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
      className={`pointer-events-none opacity-80 absolute top-1/2 transform    ${
        bottomCornerRight && "translate-x-1/2"
      } ${
        bottomCornerLeft && "-translate-x-1/2"
      } hidden md:inline   //-translate-y-[60%]  //scale-x-[2]   //md:scale-[] //scale-y-[1.5] //md:scale-y-100  `}
    >
      <defs>
        <filter
          id="bbblurry-filter"
          x="-100%"
          y="-100%"
          width="400%"
          height="400%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="43"
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            in="SourceGraphic"
            edgeMode="none"
            result="blur"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          rx="196"
          ry="196"
          cx="421.2134149509241"
          cy="321.130118810338"
          //fill="hsla(212, 44%, 27%, 1.00)" (opacity fix)
          fill="hsla(212, 44%, 22%, 1.00)"
        ></ellipse>
      </g>
    </svg>
  );
}

/* KLADD..-> */

{
  /* <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink"  viewBox="0 0 800 800"><defs><filter id="bbblurry-filter" x="-100%" y="-100%" width="400%" height="400%" filterUnits="objectBoundingBox" primitiveUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
	<feGaussianBlur stdDeviation="43" x="0%" y="0%" width="100%" height="100%" in="SourceGraphic" edgeMode="none" result="blur"></feGaussianBlur></filter></defs><g filter="url(#bbblurry-filter)"><ellipse rx="196" ry="196" cx="421.2134149509241" cy="321.130118810338" fill="hsla(212, 44%, 27%, 1.00)"></ellipse></g></svg> */
}
<svg
  xmlns="http://www.w3.org/2000/svg"
  version="1.1"
  xmlnsXlink="http://www.w3.org/1999/xlink"
  viewBox="0 0 640 800"
  opacity="0.84"
>
  <defs>
    <filter
      id="bbblurry-filter"
      x="-100%"
      y="-100%"
      width="400%"
      height="400%"
      filterUnits="objectBoundingBox"
      primitiveUnits="userSpaceOnUse"
      color-interpolation-filters="sRGB"
    >
      <feGaussianBlur
        stdDeviation="71"
        x="0%"
        y="0%"
        width="100%"
        height="100%"
        in="SourceGraphic"
        edgeMode="none"
        result="blur"
      ></feGaussianBlur>
    </filter>
  </defs>
  <g filter="url(#bbblurry-filter)">
    <ellipse
      rx="277.5"
      ry="215"
      cx="324.02758188322775"
      cy="385.4610230453371"
      fill="#1b3448"
    ></ellipse>
  </g>
</svg>;
