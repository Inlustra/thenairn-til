
declare module "*.svg";

declare module "*.html" {
  const src: string;
  export default src;
}

declare module "*.png" {
  const src: string;
  export default src;
}
