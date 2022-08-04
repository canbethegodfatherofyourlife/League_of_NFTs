import { useContract, useSigner } from 'wagmi';
import OpenABI from '../contracts/OpenABI.json'

function GetContract() {
  const { data: signer, isError, isLoading } = useSigner()

  const contract = useContract({
    addressOrName: '0xa691CBd9ABBF5D66e7dBAf38D569371258773A7C',
    contractInterface: OpenABI,
    signerOrProvider: signer,
  })

  return contract;
}

export default GetContract;