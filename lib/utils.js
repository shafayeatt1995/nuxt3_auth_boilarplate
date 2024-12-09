import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
const loadedAnimations = new Map();

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function strSlug(val) {
  return val
    .toLowerCase()
    .replace(/\s+/g, "_")
    .replace(/[^\w\-]/g, "");
}

export function arrayConverter(value) {
  return Array.isArray(value) ? value : value ? [value] : [];
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getItem(key, defaultValue = "") {
  if (typeof window === "undefined") return;
  const item = localStorage.getItem(key);
  return item ?? defaultValue;
}

export function setItem(key, value) {
  localStorage.setItem(key, value);
}

export function removeItem(key) {
  localStorage.removeItem(key);
}

export function randomStr(key = 10) {
  return [...Array(key)].map(() => Math.random().toString(36)[2]).join("");
}

export function encode(value) {
  return value ? btoa(value) : "";
}

export function decode(value) {
  return value ? atob(value) : "";
}

export async function initLottie(container, path) {
  if (typeof window === "undefined") return;

  if (
    loadedAnimations.has(container) &&
    loadedAnimations.get(container) === path
  ) {
    return;
  }

  const loadLottieScript = () => {
    return new Promise((resolve, reject) => {
      if (window.lottie) {
        resolve();
      } else {
        const script = document.createElement("script");
        script.src = "/js/lottie.min.js";
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      }
    });
  };

  await loadLottieScript();

  window.lottie.loadAnimation({
    container: container,
    renderer: "canvas",
    loop: true,
    autoplay: true,
    path: path,
  });

  loadedAnimations.set(container, path);
}

export function paginate(items = [], perPage = 24) {
  return { perPage, page: items.length / perPage + 1 };
}

export function cookieParse(cookie = document.cookie) {
  return cookie.split(";").reduce((acc, cookie) => {
    const [name, value] = cookie.split("=").map((item) => item.trim());
    acc[name] = decodeURIComponent(value);
    return acc;
  }, {});
}

export function setCookie(name, value, options = {}) {
  let expiresOption = "";
  const { expires, ...otherOptions } = options;

  if (expires) {
    const days = parseInt(expires, 10);
    if (!isNaN(days) && days > 0) {
      expiresOption = `expires=${new Date(
        Date.now() + days * 24 * 60 * 60 * 1000
      ).toUTCString()}; `;
    } else {
      console.warn("Invalid expires value. Using session cookie instead.");
    }
  }

  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; ${expiresOption}${Object.entries(otherOptions)
    .map(([key, val]) => `${key}=${val}`)
    .join("; ")}`;
}

export function getCookie(name) {
  const cookies = cookieParse();
  return cookies[name];
}

export function removeCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

export function checkDate(date) {
  return !isNaN(new Date(date).getTime());
}

export function fullDateFormat(date = new Date()) {
  return Intl.DateTimeFormat("en-US", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function meta({
  title = "CholoZai - Your Ultimate Guide to Travel in Bangladesh",
  description = "Discover the beauty of Bangladesh with CholoZai. Explore top destinations, hidden gems, cultural experiences, and travel tips for an unforgettable journey through this vibrant country.",
} = {}) {
  return [
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
  ];
}

export const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
