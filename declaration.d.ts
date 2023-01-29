/* Solution for: Can't import CSS modules. TypeScript says "Cannot Find Module" */
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

declare module "react-scroll";
