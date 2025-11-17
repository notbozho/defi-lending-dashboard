import { blo } from "blo";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useEns } from "@/hooks";
import { truncateAddress } from "@/utils/truncate";

type UserDisplayProps = {
  shouldTruncateAddress?: boolean;
  className?: string;
  onClick?: () => void;
};

export default function UserDisplay({
  shouldTruncateAddress = true,
  className,
  onClick,
}: UserDisplayProps) {
  const { address, ensName, ensAvatar } = useEns();

  function getDisplayName(): string {
    if (ensName) return ensName;

    if (shouldTruncateAddress) return truncateAddress(address as `0x${string}`);

    return address ?? "";
  }

  const displayName = getDisplayName();
  const avatarSrc = ensAvatar ?? blo(address as `0x${string}`);
  const referrerPolicy = ensAvatar ? "no-referrer" : undefined;

  return (
    <Button variant="outline" onClick={onClick} className={`flex items-center gap-2 ${className}`}>
      <span className="hidden text-base sm:inline-block">{displayName}</span>

      <Avatar className="size-6">
        <AvatarImage
          src={avatarSrc}
          alt={`${displayName} avatar`}
          referrerPolicy={referrerPolicy}
        />
      </Avatar>
    </Button>
  );
}
