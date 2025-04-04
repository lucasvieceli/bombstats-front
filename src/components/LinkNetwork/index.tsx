"use client";

import Link, { LinkProps } from "next/link";
import { useParams } from "next/navigation";
import { PropsWithChildren } from "react";

function LinkNetwork({
  href,
  children,
  target,
  ...props
}: PropsWithChildren<LinkProps & { className?: string; target?: string }>) {
  const params = useParams();
  return (
    <Link href={`/${params.network}${href}`} {...props}>
      {children}
    </Link>
  );
}

export default LinkNetwork;
