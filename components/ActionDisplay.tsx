import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

import { useToast } from "@/components/ui/use-toast";

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
        toAddress: '0x0bd634d9cad82957af1f1338de981fd33e0d1928e16f0b27731e4d1b0e6e4738',
        amount: '1',
      };
      console.log('Dữ liệu gửi đi:', body);
      
      const response = await fetch('http://127.0.0.1:3000/api/actions/transfer-apt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Chi tiết lỗi:', errorData);
        throw new Error(errorData.message || 'Yêu cầu không hợp lệ');
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
      let errorMessage = 'Đã xảy ra lỗi không xác định';
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
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

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <img src={data.icon} alt={data.title} className="w-16 h-16 mb-4" />
      <h2 className="text-2xl font-bold mb-2">{data.title}</h2>
      <p className="text-gray-600 mb-4">{data.description}</p>
      <div className="space-y-2">
        {data.links.actions.map((action, index) => (
          <div key={index}>
            <Button
              onClick={() => handleAction(action)}
              className="w-full mb-2"
              disabled={loading}
            >
              {loading ? 'Đang xử lý...' : action.label}
            </Button>
            {action.parameters && (
              <div className="ml-4">
                {action.parameters.map((param, paramIndex) => (
                  <div key={paramIndex} className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      {param.label}
                    </label>
                    <input
                      type="text"
                      name={param.name}
                      required={param.required}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}