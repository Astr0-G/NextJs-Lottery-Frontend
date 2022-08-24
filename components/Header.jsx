import { ConnectButton } from "web3uikit"

export default function Header() {
    return (
        <div>
            Dicentralized Lottery
            <ConnectButton moralisAuth={false} />
        </div>
    )
}
