"use client";
import CountUp from "react-countup";
import { formatAmount } from "@/lib/utils";

const AnimatedCounter = ({ amount }: { amount: number }) => {
  const formated_amount: string = formatAmount(amount);
  const currency_symbol: string = formated_amount[0];
  const amount_in_number: number = Number(
    formated_amount.substring(1).replaceAll(",", "")
  );

  return (
    <CountUp
      end={amount_in_number}
      decimals={2}
      prefix={`${currency_symbol} `}
    />
  );
};

export default AnimatedCounter;
