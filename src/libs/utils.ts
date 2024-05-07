import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const cn = (...args: ClassValue[]): string | undefined => twMerge(clsx(args));

const capitalize = (s: string) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
}

export { cn, capitalize };