import { useWeb3Contract } from "react-moralis"
import { abi, contractAddre } from "../contants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { useNotification } from "web3uikit"
export default function LotteryEntrace() {
    const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
    const chainId = parseInt(chainIdHex)
    const raffleAddress = chainId in contractAddre ? contractAddre[chainId][0] : null

    const [entraceFee, setEntraceFee] = useState("0")
    const [numPlayers, setnumPlayers] = useState("0")
    const [rencentWinner, setrencentWinner] = useState("0")

    const dispatch = useNotification()

    const {
        runContractFunction: enterRaffle,
        isLoading,
        isFetching,
    } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "enterRaffle",
        params: {},
        msgValue: entraceFee,
        chainId: chainId,
    })

    const { runContractFunction: getEntranceFee } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getEntranceFee",
        params: {},
    })

    const { runContractFunction: getRecentWinner } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getRecentWinner",
        params: {},
    })

    const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
        abi: abi,
        contractAddress: raffleAddress,
        functionName: "getNumberOfPlayers",
        params: {},
    })

    async function updateUI() {
        const entraceFeeFromCall = (await getEntranceFee()).toString()
        const numPlayersFromCall = (await getNumberOfPlayers()).toString()
        const rencentWinnerFromCall = (await getRecentWinner()).toString()
        setEntraceFee(entraceFeeFromCall)
        setnumPlayers(numPlayersFromCall)
        setrencentWinner(rencentWinnerFromCall)
        console.log(entraceFeeFromCall)
    }

    useEffect(() => {
        if (isWeb3Enabled) {
            updateUI()
        }
    }, [isWeb3Enabled])

    const handleSuccess = async function (tx) {
        await tx.wait(1)
        handleNewNotification(tx)
        updateUI()
    }
    const handleNewNotification = function () {
        dispatch({
            type: "info",
            message: "Transaction Complete",
            title: "Tx Notification",
            position: "topR",
            icon: "bell",
        })
    }
    return (
        <div className="p-5">
            Dicentralized Lottery
            {raffleAddress ? (
                <div>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
                        onClick={async function () {
                            await enterRaffle({
                                // conComplete:
                                onSuccess: handleSuccess,
                                onError: (error) => console.log(error),
                            })
                        }}
                        disabled={isFetching || isLoading}
                    >
                        {isFetching || isLoading ? (
                            <div className="animate-spin spinner-border h-8 w-8 border-b-2 rounded-full"></div>
                        ) : (
                            <div>Enter Raffle</div>
                        )}
                    </button>
                    <div>Entrance Fee is {ethers.utils.formatUnits(entraceFee)}</div>
                    <div>players: {numPlayers}</div>
                    <div>Recent Winner:{rencentWinner}</div>
                </div>
            ) : (
                <div>No Raffle Address Deteched</div>
            )}
        </div>
    )
}
