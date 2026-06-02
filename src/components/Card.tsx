import type { ReactNode } from "react";
import "./styles/card.css";
import clsx from "clsx";

type Props = {
  children: ReactNode;
  title?: string;
  className?: string;
  childrenClassName?: string;
};

const Card = ({ children, title, childrenClassName, className }: Props) => {
  return (
    <div
      className={clsx(
        "p-4 rounded-2xl bg-linear-to-br from-card to-card/60 flex flex-col gap-4",
        className,
      )}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      <div
        className={clsx(
          childrenClassName,
          "animate-[fade-in_1s_ease-out_forwards]",
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default Card;
