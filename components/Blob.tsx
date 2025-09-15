//https://www.fffuel.co/bbblurry/
//blob hex generate
//"hsla(212, 59%, 30%, 0.45)

export default function Blob() {
  return (
    <svg
      className=" absolute transform top-14 sm:-top-9    hidden md:inline"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      viewBox="0 0 800 800"
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
          //color-interpolation-filters="sRGB"
          colorInterpolationFilters="sRGB"
        >
          <feGaussianBlur
            stdDeviation="40"
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
          ry="277.5"
          cx="106.39933337466255"
          cy="371.5369515144388"
          //fill="hsla(212, 59%, 40%, 0.21)"
          fill="hsla(212, 73%, 18%, 0.59)"
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
  className="absolute"
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
