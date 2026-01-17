import { motion } from "motion/react";

import { Card, CardContent } from "@/components";
import { Empty, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

export default function ReservesNotFound() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="flex min-h-[80dvh] w-full items-center justify-center"
    >
      <Card>
        <CardContent>
          <Empty>
            <EmptyTitle>No reserves found</EmptyTitle>
            <EmptyDescription>We couldn&apos;t find any reserves in this market.</EmptyDescription>
          </Empty>
        </CardContent>
      </Card>
    </motion.div>
  );
}
