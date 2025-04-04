import Card, { CardContent } from "@/components/Card";
import Information from "@/components/icons/Information";
import { ReactNode } from "react";

interface CardTotalsProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: ReactNode;
  value: string | number | React.ReactNode;
  title: React.ReactNode | string;
  info?: string;
}

function CardTotals({ icon, value, title, info, ...props }: CardTotalsProps) {
  return (
    <Card {...props}>
      <CardContent>
        <div className="flex flex-row gap-4 items-center">
          {icon}
          <div className="flex flex-col">
            <div className="font-bold text-18 text-white">{value}</div>
            <div className="font-normal text-16 text-white/60 flex flex-row gap-1 items-center">
              {title}
              {info && (
                <div title={info}>
                  <Information className="w-4 fill-white/60 h-4" />
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default CardTotals;
