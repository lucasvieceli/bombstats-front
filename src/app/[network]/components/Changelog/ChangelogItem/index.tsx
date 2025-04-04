import Image from "next/image";
import { PropsWithChildren } from "react";

interface ChangelogItemProps {
  title: string;
  description: string;
}
function ChangelogItem({
  title,
  description,
  children,
}: PropsWithChildren<ChangelogItemProps>) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row gap-4">
        <div className=" w-[43px] h-[43px] shrink-0 relative">
          <Image
            src="/images/logo.webp"
            fill
            sizes="auto"
            className="object-contain"
            alt="logo"
          />
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row gap-1 justify-between">
            <div className="font-medium line-clamp-1 text-16 break-all">
              {title}
            </div>
          </div>
          <div className="font-light text-white/80 text-12">{description}</div>
        </div>
      </div>
      <div className="text-white text-12 [&>p]:pb-4 [&>p]:text-4 [&>a]:!text-blue">
        {children}
      </div>
    </div>
  );
}

export default ChangelogItem;
