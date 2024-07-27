import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import { InputTransactionData } from "@aptos-labs/wallet-adapter-core";
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
      href: string;
      parameters?: Array<{
        name: string;
        label: string;
        required: boolean;
      }>;
    }>;
  };
}
const APTOS_COIN = "0x1::aptos_coin::AptosCoin";

export function ActionDisplay({ data }: { data: ActionData }) {
  const { account, network, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };

  const onSignAndSubmitTransaction = async () => {
    if (!account) return;
    const transaction: InputTransactionData = {
      data: {
        function: "0x1::coin::transfer",
        typeArguments: [APTOS_COIN],
        functionArguments: [
          "0x0bd634d9cad82957af1f1338de981fd33e0d1928e16f0b27731e4d1b0e6e4738",
          1,
        ], // 1 is in Octas
      },
    };
    try {
      const response = await signAndSubmitTransaction(transaction);
      await aptosClient(network).waitForTransaction({
        transactionHash: response.hash,
      });
      toast({
        title: "Success",
        description: <TransactionHash hash={response.hash} network={network} />,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const actionsWithoutParameters = data.links.actions.filter(
    (action) => !action.parameters
  );

  const actionsWithParameters = data.links.actions.filter(
    (action) => (action.parameters ?? []).length > 0
  );

  return (
    <div className="w-full cursor-default overflow-hidden p-6 rounded-2xl border border-stroke-primary bg-white shadow-action">
      <div className="block max-h-[100cqw] overflow-y-hidden px-5 pt-5">
        <Image
          src={data.icon}
          alt={data.title}
          width={100}
          height={100}
          unoptimized
          className="waspect-auto w-full rounded-xl object-cover object-center"
        />
      </div>
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="space-y-2">
        <div className="flex-col ">
          <div className="flex justify-around gap-4">
            {actionsWithoutParameters.map((action, index) => (
              <Button
                key={index}
                onClick={onSignAndSubmitTransaction}
                className="flex-1"
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
                    onSubmit={onSignAndSubmitTransaction}
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
