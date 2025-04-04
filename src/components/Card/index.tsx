import { PropsWithChildren } from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

function Card({ title, children, ...props }: PropsWithChildren<CardProps>) {
  return (
    <section
      {...props}
      className={`flex flex-col rounded-xl bg-secondary gap-4 py-4 flex-1 ${props.className}`}
    >
      {children}
    </section>
  );
}

export function CardContent({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`flex flex-col gap-4 px-4 flex-1 ${className}`} {...props}>
      {children}
    </div>
  );
}
export function CardTitle({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <h2
      className={`text-white text-18 font-extrabold px-4 ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
}

export default Card;
