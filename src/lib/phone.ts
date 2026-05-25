export function getDepartmentPhoneHref(phone: string) {
  const cleaned = phone.replace(/\s/g, "");
  if (cleaned.startsWith("tel:")) return cleaned;
  if (cleaned.startsWith("+")) return `tel:${cleaned}`;
  return `tel:${cleaned}`;
}
