import { useContract, useSigner } from 'wagmi'

function GetSigner() {
  const { data: signer, isError, isLoading } = useSigner()

  return signer;
}

export default GetSigner;