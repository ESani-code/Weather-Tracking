import type { ReactNode } from "react";
import "./styles/card.css";

type Props = {
  children: ReactNode;
  title: string;
  childrenClassName?: string;
};

const Card = ({ children, title, childrenClassName }: Props) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-800 flex flex-col gap-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className={childrenClassName}>{children}</div>
    </div>
  );
};

export default Card;
