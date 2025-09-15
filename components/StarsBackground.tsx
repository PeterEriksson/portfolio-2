import { useEffect } from "react";
import { loadStarsPreset } from "tsparticles-preset-stars";
import { tsParticles } from "tsparticles-engine";

export default function StarsBackground() {
  useEffect(() => {
    (async () => {
      await loadStarsPreset(tsParticles);

      await tsParticles.load("tsparticles", {
        preset: "stars",
        background: {
          color: "#091c29", // keep dark background
        },
        fullScreen: {
          zIndex: -1,
        },
        particles: {
          number: {
            value: /* 50 */ 10,
          },
          size: {
            value: /* 0.75 */ 1.3,
          },
          /* color: {
            value: "rgba(97, 218, 251, 0.1)", //react blue lower opacity
          }, */
        },
      });
    })();
  }, []);

  return (
    <div id="tsparticles" className="absolute inset-0 z-[-1] hidden xs:block" />
  );
}
