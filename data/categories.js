import {
  Baby,
  Shirt,
  Footprints,
  ToyBrick,
  Backpack,
  Sparkles,
} from "lucide-react";

export const categories = [
  {
    id: 1,
    name: "Baby Girls",
    slug: "baby-girls",
    icon: Shirt,
    bgColor: "bg-pink-50",
    iconColor: "text-secondary",
  },
  {
    id: 2,
    name: "Baby Boys",
    slug: "baby-boys",
    icon: Shirt,
    bgColor: "bg-sky-50",
    iconColor: "text-primary",
  },
  {
    id: 3,
    name: "Newborn",
    slug: "newborn",
    icon: Baby,
    bgColor: "bg-yellow-50",
    iconColor: "text-yellow-500",
  },
  {
    id: 4,
    name: "Shoes",
    slug: "shoes",
    icon: Footprints,
    bgColor: "bg-green-50",
    iconColor: "text-primary",
  },
  {
    id: 5,
    name: "Toys",
    slug: "toys",
    icon: ToyBrick,
    bgColor: "bg-purple-50",
    iconColor: "text-mint-500",
  },
  {
    id: 6,
    name: "Accessories",
    slug: "accessories",
    icon: Backpack,
    bgColor: "bg-orange-50",
    iconColor: "text-lavender-500",
  },
];