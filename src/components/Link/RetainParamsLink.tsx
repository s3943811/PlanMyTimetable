"use client";
import { useSearchParams } from "next/navigation";
import Link, { LinkProps } from "next/link";
interface RetainParamsLink extends LinkProps {
  children?: React.ReactNode;
  href: string;
  className?: string;
}
export default function RetainParamsLink({
  href,
  children,
  className,
  ...props
}: RetainParamsLink) {
  const searchParams = useSearchParams();
  return (
    <Link
      href={{ pathname: href, query: searchParams.toString() }}
      {...props}
      className={className}
    >
      {children}
    </Link>
  );
}
