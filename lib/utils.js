import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function generateUID() {
  var timestamp = Date.now().toString(36);
  var randomNum = Math.random().toString(36).substr(2, 5);
  var uid = timestamp + randomNum;

  return uid;
}

export function textToSlug(text) {
  return text
    .toLowerCase() // Convert the text to lowercase
    .trim() // Remove leading and trailing white spaces
    .normalize("NFD") // Normalize to decomposed Unicode form
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
    .replace(/[^\w-]+/g, "-") // Replace non-word characters (except hyphens) with hyphens
    .replace(/--+/g, "-") // Replace consecutive hyphens with a single hyphen
    .slice(0, 50) // Truncate the slug to a reasonable length (adjust as needed)
    .replace(/^-+|-+$/g, "");
}

export function getChangedProperties(compareThis, compareWith) {
  const picked = {};

  for (const key of Object.keys(compareThis)) {
    if (compareThis[key] !== compareWith[key]) {
      picked[key] = compareThis[key];
    }
  }

  return picked;
}

export function generateFormData(payload) {
  const formData = new FormData();

  for (const key in payload) {
    if (Array.isArray(payload[key])) {
      for (const item of payload[key]) {
        formData.append(key, item);
      }
    } else {
      formData.append(key, payload[key]);
    }
  }

  return formData;
}

export function getImageSrc(image) {
  if (!image) return null;
  return typeof image === "object" ? URL.createObjectURL(image) : image;
}

export function prefixCountryCode(phone) {
  if (phone.startsWith("+880")) return phone;
  if (phone.startsWith("0")) return "+880" + phone.substring(1);
  return phone;
}

export function getQueryParam(url, paramName) {
  const queryString = url.split("?")[1];
  if (!queryString) {
    return null; // No query string found
  }

  const params = new URLSearchParams(queryString);
  return params.get(paramName);
}
