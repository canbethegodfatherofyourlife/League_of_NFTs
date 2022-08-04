import { useContract, useSigner } from 'wagmi';
import AuctionABI from '../contracts/AuctionABI.json';

function GetAuction() {
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: '0xE91aD2A2A6f6678c878A650063D9C7a24dD396D8',
    contractInterface: AuctionABI,
    signerOrProvider: signer,
  })

  return contract;
}

export default GetAuction;