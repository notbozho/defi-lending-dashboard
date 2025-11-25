"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, Fuel } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useAccount } from "wagmi";

import {
  AnimatedNumber,
  Button,
  FormattedNumber,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBalanceOf } from "@/hooks/web3/useBalanceOf";
import { MarketReserve } from "@/lib/aave";
import { cn } from "@/lib/utils";
import { INPUT_REGEX, ZERO_ADDRESS } from "@/utils/constants";

type ReserveActionsProps = {
  reserve: MarketReserve;
  loading: boolean;
};

export default function ReserveActions({ reserve, loading }: ReserveActionsProps) {
  const [supplyAmount, setSupplyAmount] = useState("");
  const [borrowAmount, setBorrowAmount] = useState("");

  const { isConnected, address } = useAccount();

  const { data: userBalanceData } = useBalanceOf({
    accountAddress: address ?? ZERO_ADDRESS,
    tokenAddress: reserve?.underlyingAddress || ZERO_ADDRESS,
  });

  const TokenIcon =
    !reserve?.imageUrl || loading ? (
      <Skeleton className="size-8 rounded-full" />
    ) : (
      <Image
        src={reserve.imageUrl}
        alt={reserve.symbol}
        width={16}
        height={16}
        className="size-8 rounded-full"
      />
    );

  const buttonText = isConnected ? "Supply" : "Connect Wallet";

  return (
    <Card className="order-2 max-h-[calc(100vh-48px)] w-[400px] self-start overflow-x-auto px-6 py-6">
      <Tabs defaultValue="supply" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="supply">Supply</TabsTrigger>
          <TabsTrigger value="borrow">Borrow</TabsTrigger>
        </TabsList>

        {/* SUPPLY TAB */}
        <TabsContent value="supply" className="mt-4 flex flex-col gap-4">
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>Supply Collateral {reserve?.symbol}</span>
          </div>

          <InputGroup className="py-8">
            <motion.div
              className="relative flex flex-1 flex-col"
              initial={false}
              animate={{
                y: supplyAmount ? -2 : 0,
                scale: supplyAmount ? 0.95 : 1,
              }}
              transition={{ ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
            >
              <InputGroupInput
                placeholder="Enter amount"
                maxLength={24}
                className={cn(!supplyAmount && "text-lg!")}
                value={supplyAmount}
                onChange={(e) => {
                  if (!INPUT_REGEX.test(e.target.value)) return;

                  setSupplyAmount(e.target.value);
                }}
              />
              <motion.div
                key={supplyAmount ? "usd-visible" : "usd-hidden"}
                initial={{
                  opacity: 0,
                  y: -4,
                }}
                animate={{
                  opacity: supplyAmount ? 1 : 0,
                  y: supplyAmount ? 0 : -4,
                }}
                transition={{ ease: "easeOut", type: "spring", stiffness: 230, damping: 22 }}
              >
                {supplyAmount && (
                  <FormattedNumber
                    value={Number(supplyAmount) * reserve.oraclePrice.toNumber()}
                    decimals={2}
                    compact
                    symbol="usd"
                    className="text-muted-foreground pl-3 text-xs"
                  />
                )}
              </motion.div>
            </motion.div>
            <InputGroupAddon align="inline-start">{TokenIcon}</InputGroupAddon>

            <InputGroupAddon align="inline-end" className="flex flex-col items-end gap-1">
              <InputGroupButton variant="link">Max</InputGroupButton>
              <AnimatePresence mode="popLayout">
                {isConnected && !!reserve?.symbol && (
                  <motion.span
                    key="balance"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
                    className="text-muted-foreground pr-2 text-xs"
                  >
                    {userBalanceData?.balance.toNumber() || 0} {reserve?.symbol}
                  </motion.span>
                )}
              </AnimatePresence>
            </InputGroupAddon>
          </InputGroup>

          <span className="text-muted-foreground">Transaction Overview</span>
          <div className="bg-muted text-muted-foreground flex flex-col justify-between gap-2 rounded-md px-3 py-3 text-xs">
            <span className="flex items-center justify-between gap-2">
              <span>Supplied</span>
              <div className="flex items-center">
                <span>0</span>
                <ArrowRight className="mx-1 inline h-4 w-4" />
                <span className="text-foreground">
                  <AnimatedNumber mode="number" value={0.2324} className="text-xs" decimals={4} />{" "}
                  {reserve?.symbol ?? <Skeleton className="inline-block h-3 w-8" />}
                </span>
              </div>
            </span>
            <span className="flex items-center justify-between gap-2">
              <span>Supply APY</span>
              <span className="text-foreground">3.25%</span>
            </span>
            <span className="flex items-center justify-between gap-2">
              <span>Estimated Gas</span>
              <span>$1.12 (0.0004 ETH)</span>
            </span>
          </div>

          <Button className="flex w-full items-center justify-center gap-2 py-3 text-base">
            {buttonText}
          </Button>
        </TabsContent>

        {/* BORROW TAB */}
        <TabsContent value="borrow" className="mt-4 flex flex-col gap-4">
          <div className="text-muted-foreground flex justify-between text-sm">
            <span>Borrow {reserve?.symbol}</span>
          </div>

          <InputGroup className="py-8">
            <motion.div
              className="relative flex flex-1 flex-col"
              initial={false}
              animate={{
                y: supplyAmount ? -2 : 0,
                scale: supplyAmount ? 0.95 : 1,
              }}
              transition={{ ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
            >
              <InputGroupInput
                placeholder="Enter amount"
                maxLength={24}
                className={cn(!borrowAmount && "text-lg!")}
                value={borrowAmount}
                onChange={(e) => {
                  if (!INPUT_REGEX.test(e.target.value)) return;

                  setBorrowAmount(e.target.value);
                }}
              />
              <motion.div
                key={supplyAmount ? "usd-visible" : "usd-hidden"}
                initial={{
                  opacity: 0,
                  y: -4,
                }}
                animate={{
                  opacity: borrowAmount ? 1 : 0,
                  y: borrowAmount ? 0 : -4,
                }}
                transition={{ ease: "easeOut", type: "spring", stiffness: 230, damping: 22 }}
              >
                {borrowAmount && (
                  <FormattedNumber
                    value={borrowAmount}
                    decimals={2}
                    compact
                    symbol="usd"
                    className="text-muted-foreground pl-3 text-xs"
                  />
                )}
              </motion.div>
            </motion.div>
            <InputGroupAddon align="inline-start">{TokenIcon}</InputGroupAddon>

            <InputGroupAddon align="inline-end" className="flex flex-col items-end gap-1">
              <InputGroupButton variant="link">Max</InputGroupButton>
              <AnimatePresence mode="popLayout">
                {isConnected && !!reserve?.symbol && (
                  <motion.span
                    key="balance"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ ease: "easeOut", type: "spring", stiffness: 300, damping: 20 }}
                    className="text-muted-foreground pr-2 text-xs"
                  >
                    0.2324 {reserve?.symbol}
                  </motion.span>
                )}
              </AnimatePresence>
            </InputGroupAddon>
          </InputGroup>

          <span className="text-muted-foreground">Transaction Overview</span>
          <div className="bg-muted text-muted-foreground flex flex-col justify-between gap-2 rounded-md px-3 py-3 text-xs">
            <span className="flex items-center justify-between gap-2">
              <span>Borrowed</span>
              <div className="flex items-center">
                <span>0</span>
                <ArrowRight className="mx-1 inline h-4 w-4" />
                <span className="text-foreground">
                  <AnimatedNumber mode="number" value={0.2324} className="text-xs" decimals={4} />{" "}
                  {reserve?.symbol ?? <Skeleton className="inline-block h-4 w-8" />}
                </span>
              </div>
            </span>
            <span className="flex items-center justify-between gap-2">
              <span>Supply APY</span>
              <span className="text-foreground">3.25%</span>
            </span>
            <span className="flex items-center justify-between gap-2">
              <span>Estimated Gas</span>
              <span>$1.12 (0.0004 ETH)</span>
            </span>
          </div>

          <Button className="flex w-full items-center justify-center gap-2 py-3 text-base">
            {buttonText}
          </Button>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
