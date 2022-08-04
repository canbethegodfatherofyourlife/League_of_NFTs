import { useContract, useSigner } from 'wagmi';
import OpenABI from '../contracts/OpenABI.json'

function GetContract() {
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: '0x110FA4d226cA030C958318f8c8b8C7803De2D5Dc',
    contractInterface: OpenABI,
    signerOrProvider: signer,
  })

  return contract;
}

export default GetContract;