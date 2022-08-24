import Head from "next/head"
import Image from "next/image"
import styles from "../styles/Home.module.css"
// import Header from "../components/ManualHeader"
import Header from "../components/Header"
import LotteryEntrace from "../components/LotteryEntrace"

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>Lottery Raffle</title>
                <meta name="description" content="Smart Contract Lottery" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <LotteryEntrace />
        </div>
    )
}
