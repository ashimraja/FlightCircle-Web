import React from "react";

type CardProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

export default function Card({
  children,
  className = "",
  as: Tag = "div",
}: CardProps) {
  const base =
    "rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-soft transition hover:-translate-y-1 hover:border-brand/20 hover:shadow-xl";
  return (
    // @ts-ignore allow dynamic tag
    <Tag className={`${base} ${className}`}>{children}</Tag>
  );
}
