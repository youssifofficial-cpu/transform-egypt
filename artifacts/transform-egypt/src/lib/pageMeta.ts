export const SITE_URL = "https://transform-egypt.com";
export const SITE_NAME = "TransforM Egypt";

export interface PageMeta {
  title: string;
  description: string;
  canonical: string;
}

const routes: Record<string, PageMeta> = {
  "/": {
    title: "TransforM Egypt — Where Beauty Meets Precision",
    description: "Egypt and the Middle East's #1 premium beauty brand. Hair extensions, lash, microblading, skincare, nails, and wigs by Mervat Attalla.",
    canonical: SITE_URL,
  },
  "/services": {
    title: "Beauty Services — TransforM Egypt",
    description: "Full service menu: hair extensions, lash extensions, microblading, skincare, nails, wigs. Four luxury branches in Cairo.",
    canonical: `${SITE_URL}/services`,
  },
  "/transformations": {
    title: "Before & After Gallery — TransforM Egypt",
    description: "Real client transformations. Browse our before & after gallery.",
    canonical: `${SITE_URL}/transformations`,
  },
  "/reviews": {
    title: "Client Reviews — TransforM Egypt",
    description: "Thousands of 5-star reviews from our clients across Egypt.",
    canonical: `${SITE_URL}/reviews`,
  },
  "/boutique": {
    title: "Beauty Boutique — TransforM Egypt",
    description: "Shop professional beauty products, hair care, and accessories.",
    canonical: `${SITE_URL}/boutique`,
  },
  "/cart": {
    title: "Cart — TransforM Egypt",
    description: "Your shopping cart.",
    canonical: `${SITE_URL}/cart`,
  },
  "/book": {
    title: "Book an Appointment — TransforM Egypt",
    description: "Book your beauty appointment at any of our 4 Cairo branches.",
    canonical: `${SITE_URL}/book`,
  },
};

export function getPageMeta(path: string): PageMeta {
  return routes[path] ?? routes["/"];
}

export const ALL_ROUTES = Object.keys(routes);
