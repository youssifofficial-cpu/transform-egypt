import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const WHATSAPP_URL = "https://wa.me/201009780008";
export const PHONE_1 = "01009780008";
export const PHONE_2 = "01004545700";

export const BRANCHES = [
  { name: "City Stars", nameAr: "سيتي ستارز", mapUrl: "https://maps.google.com/?q=City+Stars+Cairo" },
  { name: "Cairo Festival City (CFC)", nameAr: "القاهرة فستيفال سيتي", mapUrl: "https://maps.google.com/?q=Cairo+Festival+City" },
  { name: "Sofitel Cairo Nile El Gezirah", nameAr: "سوفيتيل القاهرة", mapUrl: "https://maps.google.com/?q=Sofitel+Cairo+Nile+El+Gezirah" },
  { name: "Nile Ritz-Carlton", nameAr: "نايل ريتز كارلتون", mapUrl: "https://maps.google.com/?q=Nile+Ritz-Carlton+Cairo" },
];

export const SOCIAL = {
  instagram: "https://www.instagram.com/transformegypt",
  tiktok: "https://www.tiktok.com/@transformegypt",
  facebook: "https://www.facebook.com/TransformEgypt",
};

export const SERVICES = [
  { id: "hair-extensions", name: "Hair Extensions", nameAr: "وصلات الشعر", icon: "✨", description: "Premium quality hair extensions for length and volume.", prices: [{ label: "Classic", price: "EGP 2,500" }, { label: "Luxury", price: "EGP 4,500" }] },
  { id: "lash-extensions", name: "Lash Extensions", nameAr: "رموش مزروعة", icon: "👁", description: "Silk, mink and volume lash sets by certified technicians.", prices: [{ label: "Classic Set", price: "EGP 800" }, { label: "Volume Set", price: "EGP 1,200" }] },
  { id: "microblading", name: "Microblading", nameAr: "ميكروبليدنج", icon: "🎨", description: "Semi-permanent eyebrow sculpting for a natural look.", prices: [{ label: "Microblading", price: "EGP 3,500" }, { label: "Ombre Brows", price: "EGP 3,000" }] },
  { id: "skin", name: "Skincare", nameAr: "العناية بالبشرة", icon: "💆", description: "Advanced facial treatments and skin rejuvenation.", prices: [{ label: "Hydrafacial", price: "EGP 1,500" }, { label: "Chemical Peel", price: "EGP 900" }] },
  { id: "nails", name: "Nails", nameAr: "الأظافر", icon: "💅", description: "Gel manicures, nail art, and extensions.", prices: [{ label: "Gel Manicure", price: "EGP 450" }, { label: "Nail Art", price: "EGP 650" }] },
  { id: "wigs", name: "Wigs", nameAr: "الشعر المستعار", icon: "👑", description: "Premium human hair wigs, custom styled and fitted.", prices: [{ label: "Synthetic", price: "EGP 1,800" }, { label: "Human Hair", price: "EGP 5,500+" }] },
];
