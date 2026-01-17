import { useRouter } from "next/navigation";
import { motion } from "motion/react";

import { Button, Card, CardContent } from "@/components";
import { Empty, EmptyContent, EmptyDescription, EmptyTitle } from "@/components/ui/empty";

export default function ReserveNotFound() {
  const router = useRouter();

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
            <EmptyTitle>Reserve not found</EmptyTitle>
            <EmptyDescription>
              We couldn&apos;t find the reserve you were looking for.
            </EmptyDescription>
            <EmptyContent>
              <Button
                onClick={() => {
                  router.push("/reserves");
                }}
              >
                Browse Reserves
              </Button>
            </EmptyContent>
          </Empty>
        </CardContent>
      </Card>
    </motion.div>
  );
}
