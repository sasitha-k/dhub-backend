import Link from "next/link";
import React from "react";

export default function ReferenceLink({ children, path, ...props }) {
  if (!path) {
    return <span className="text-gray-500">{children}</span>;
  }
  return (
    <Link
      href={path}
      className="text-blue-600 font-semibold text-xs hover:underline"
      {...props}
    >
      {children}
    </Link>
  );
}
