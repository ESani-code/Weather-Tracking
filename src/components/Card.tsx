import type { ReactNode } from "react";
import "./card.css";

type Props = {
  children: ReactNode;
  title: string;
};

const Card = ({ children, title }: Props) => {
  return (
    <div className="p-4 rounded-2xl bg-slate-800">
      <h2>{title}</h2>
      <div>{children}</div>
    </div>
  );
};

export default Card;
