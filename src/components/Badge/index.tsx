import { PropsWithChildren } from "react";

interface BadgeProps {
  status: "success" | "error";
}
const COLORS = {
  success: "border-[#00C853] text-[#00C853]",
  error: "border-[#FF0759] text-[#FF0759]",
};

function Badge({ children, status }: PropsWithChildren<BadgeProps>) {
  const colors = status in COLORS ? COLORS[status] : COLORS.error;
  return (
    <div
      className={`border font-semibold text-12 ${colors} rounded-md py-2 px-3`}
    >
      {children}
    </div>
  );
}

export default Badge;
