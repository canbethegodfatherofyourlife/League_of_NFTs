import { useContract, useSigner } from 'wagmi';
import AuctionABI from '../artifacts/auction.json';

function GetAuction() {
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: '0x77086505161c2eee97F07F0f49c5A5AD04aBe464',
    contractInterface: AuctionABI,
    signerOrProvider: signer,
  })

  return contract;
}

export default GetAuction;