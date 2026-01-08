import { format, formatDistanceToNowStrict } from "date-fns";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui";
import { cn } from "@/lib/utils";

type TimestampProps = {
  value: string | number | Date;
  relative?: boolean;
  className?: string;
};

export default function Timestamp({ value, relative, className }: TimestampProps) {
  const date = new Date(value);

  const absolute = format(date, "dd/MM/yyyy HH:mm:ss");

  const display = relative ? formatDistanceToNowStrict(date, { addSuffix: true }) : absolute;

  return (
    <Tooltip delayDuration={200}>
      <TooltipTrigger asChild>
        <time dateTime={date.toISOString()} className={cn("cursor-pointer", className)}>
          {display}
        </time>
      </TooltipTrigger>
      <TooltipContent>{absolute}</TooltipContent>
    </Tooltip>
  );
}
