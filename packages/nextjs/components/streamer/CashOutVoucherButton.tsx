import { utils } from "ethers";
import { Address } from "wagmi";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import { Voucher } from "~~/pages/streamer";

type CashOutVoucherButtonProps = {
  clientAddress: Address;
  challenged: Address[];
  closed: Address[];
  voucher: Voucher;
};

export const CashOutVoucherButton = ({ clientAddress, challenged, closed, voucher }: CashOutVoucherButtonProps) => {
  const { writeAsync } = useScaffoldContractWrite({
    contractName: "Streamer",
    functionName: "withdrawEarnings",
    args: [{ ...voucher, sig: utils.splitSignature(voucher.signature) as any }],
  });

  return (
    <button
      className={`m-2 btn btn-primary${challenged.includes(clientAddress) ? " btn-error" : ""}${
        closed.includes(clientAddress) ? " btn-disabled" : ""
      }`}
      onClick={() => {
        writeAsync();
      }}
    >
      Cash out latest voucher
    </button>
  );
};
