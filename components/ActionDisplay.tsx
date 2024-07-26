import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
import { InputAmount } from "@/components/ui/input-amount";

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

export function ActionDisplay({ data }: { data: ActionData }) {
  const { account, signAndSubmitTransaction } = useWallet();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const placeholders = [
    "What's the first rule of Fight Club?",
    "Who is Tyler Durden?",
    "Where is Andrew Laeddis Hiding?",
    "Write a Javascript method to reverse a string",
    "How to assemble your own PC?",
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
  };
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("submitted");
  };

  const handleAction = async (action: any) => {
    if (!account) {
      toast({
        title: "Lỗi",
        description: "Vui lòng kết nối ví trước khi thực hiện giao dịch.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const body = {
        fromAddress: account.address.toString(),
        toAddress:
          "0x0bd634d9cad82957af1f1338de981fd33e0d1928e16f0b27731e4d1b0e6e4738",
        amount: "1",
      };
      console.log("Dữ liệu gửi đi:", body);

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
        console.error("Chi tiết lỗi:", errorData);
        throw new Error(errorData.message || "Yêu cầu không hợp lệ");
      }

      const result = await response.json();
      console.log(result);
      const { transaction, message } = result;

      // Sử dụng signAndSubmitTransaction để ký và gửi giao dịch
      const pendingTransaction = await signAndSubmitTransaction(transaction);
      console.log("Pending transaction:", pendingTransaction);

      // Chờ giao dịch được xác nhận
      const txnHash = await pendingTransaction.hash;
      console.log("Transaction hash:", txnHash);

      toast({
        title: "Thành công",
        description: `${message}. Hash giao dịch: ${txnHash}`,
      });
    } catch (error) {
      console.error("Error details:", error);
      let errorMessage = "Đã xảy ra lỗi không xác định";
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      toast({
        title: "Lỗi",
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
                onClick={() => handleAction(action)}
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
                    onSubmit={() => handleAction(action)}
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
