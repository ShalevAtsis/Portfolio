/**
 * Contact details are assembled at runtime from fragments so the plain address
 * and phone number never appear in the static HTML that scrapers harvest.
 * Behaviour for people is unchanged: links are filled in right after hydration.
 */

const MAIL_USER = ["Shalev", "atsis"];
const MAIL_HOST = ["gmail", "com"];
const PHONE = ["972", "58", "506", "0699"];

export const GITHUB_URL = "https://github.com/ShalevAtsis";
export const LINKEDIN_URL = "https://www.linkedin.com/in/shalev-atsis-software-developer/";
export const REPO_URL = "https://github.com/ShalevAtsis/Portfolio";
export const CV_PATH = "/Shalev_Atsis_CV.pdf";
export const CV_FILENAME = "Shalev_Atsis_CV.pdf";

export function getEmail(): string {
  return `${MAIL_USER.join("")}@${MAIL_HOST.join(".")}`;
}

export function getMailto(): string {
  return `mailto:${getEmail()}`;
}

export function getWhatsAppUrl(): string {
  return `https://wa.me/+${PHONE.join("")}`;
}
