import { useWeb3Contract } from "react-moralis"
import { abi, contractAddre } from "../contants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
export default function LotteryEntrace() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddre ? contractAddre[chainId][0] : null

    const [entraceFee, setEntraceFee] = useState("0")

    // const { runContractFunction: enterRaffle } = useWeb3Contract({
    //     abi: abi,
    //     contractAddress: raffleAddress,
    //     functionName: "enterRaffle",
    //     params: {},
    //     msgValue: 10000,
    //     chainId: chainId,
    // })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    useEffect(() => {
        if (isWeb3Enabled) {
            async function updateUI() {
                const entraceFeeFromCall = (await getEntranceFee()).toString()
                setEntraceFee(ethers.utils.formatUnits(entraceFeeFromCall), "ether")
                console.log(entraceFeeFromCall)
            }
            updateUI()
        }
    }, [isWeb3Enabled])
    return (
        <div>
            Dicentralized Lottery
            <div>Entrance Fee is {entraceFee}</div>
        </div>
    )
}
