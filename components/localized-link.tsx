"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";
import { ComponentProps } from "react";

type LocalizedLinkProps = ComponentProps<typeof Link>;

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { getLocalizedPath } = useLanguage();

  const localizedHref =
    typeof href === "string" ? getLocalizedPath(href) : href;

  return <Link href={localizedHref} {...props} />;
}
