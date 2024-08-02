import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  InputTransactionData,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { InputAmount } from "@/components/ui/input-amount";
import { TransactionHash } from "@/components/TransactionHash";
import { aptosClient } from "@/utils";

interface ActionData {
  title: string;
  icon: string;
  description: string;
  links: {
    actions: Array<{
      label: string;
      amount: number;
      parameters?: Array<{
        name: string;
        label: string;
        required: boolean;
      }>;
    }>;
  };
}

export function ActionDisplay({ data }: { data: ActionData }) {
  const { account, network, signAndSubmitTransaction } = useWallet();
  const [inputValue, setInputValue] = useState("");
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleAction = async (amount: any) => {
    console.log("amount :", amount);
    if (!account) {
      toast({
        title: "Error",
        description: "Please connect your wallet before making a transaction.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const body = {
        fromAddress: account.address as string,
        toAddress:
          "0x0bd634d9cad82957af1f1338de981fd33e0d1928e16f0b27731e4d1b0e6e4738",
        amount: amount,
      };

      const response = await fetch(
        "http://127.0.0.1:3000/api/actions/transfer-apt",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
          credentials: "include",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Detailed error:", errorData);
        throw new Error(errorData.message || "Invalid request");
      }

      const result = await response.json();
      console.log(result);
      const { transaction, message } = result;
      console.log(transaction);

      // Sử dụng signAndSubmitTransaction để ký và gửi giao dịch
      const pendingTransaction = await signAndSubmitTransaction(transaction);
      await aptosClient(network).waitForTransaction({
        transactionHash: pendingTransaction.hash,
      });

      toast({
        title: "Success",
        description: (
          <TransactionHash hash={pendingTransaction.hash} network={network} />
        ),
      });
    } catch (error) {
      console.error("Error details:", error);
      let errorMessage = "An unknown error has occurred";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const actionsWithoutParameters = data.links.actions.filter(
    (action) => !action.parameters
  );

  const actionsWithParameters = data.links.actions.filter(
    (action) => (action.parameters ?? []).length > 0
  );

  return (
    <div className="w-full cursor-default overflow-hidden p-6 pb-10 rounded-2xl border border-stroke-primary bg-white dark:bg-darkCard shadow-action">
      <div className="block max-h-[100cqw] overflow-y-hidden border-[1px] bg-white rounded-xl px-5 pt-5">
        <Image
          src={data.icon}
          alt={data.title}
          width={100}
          height={100}
          unoptimized
          className="waspect-auto w-full h-full rounded-xl object-cover object-center"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2 text-black dark:text-white">
        {data.title}
      </h2>
      <p className="text-gray-600 dark:text-textDarkCard mb-4">
        {data.description}
      </p>
      <div className="space-y-2">
        <div className="flex-col ">
          <div className="flex justify-around gap-4">
            {actionsWithoutParameters.map((action, index) => (
              <Button
                key={index}
                onClick={() => handleAction(action.amount)}
                className="flex-1 dark:bg-buttonDarkCard"
                disabled={loading}
              >
                {loading ? "Is Loading  ..." : action.label}
              </Button>
            ))}
          </div>
          <div className="mt-4">
            {actionsWithParameters.map((action, index) => (
              <div key={index}>
                {action.parameters?.map((param, paramIndex) => (
                  <InputAmount
                    key={paramIndex}
                    placeholder={param.label}
                    onChange={handleChange}
                    onSubmit={() => handleAction(inputValue)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
