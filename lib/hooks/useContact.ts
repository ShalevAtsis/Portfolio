"use client";

import { getEmail, getMailto, getWhatsAppUrl } from "@/lib/contact";
import { useMounted } from "./useMounted";

/**
 * Contact hrefs, available only after hydration (undefined in server HTML).
 * Spread onto anchors: `<a href={contact.mailto}>`.
 */
export function useContact() {
  const mounted = useMounted();
  return {
    email: mounted ? getEmail() : undefined,
    mailto: mounted ? getMailto() : undefined,
    whatsapp: mounted ? getWhatsAppUrl() : undefined,
  };
}
