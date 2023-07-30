import React, { useState, useEffect } from "react";
import { ethers } from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

/**
 * React.createContext() 是一个用于创建 React 上下文的函数。
 * 上下文（Context）可以在React组件树中共享数据，而不需要通过逐层传递props。
 * 通过创建一个上下文对象，可以在其中定义共享的数据和方法，
 * 然后在需要访问这些数据和方法的组件中使用。
 */
export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
	// 创建Web3Provider实例
	const provider = new ethers.providers.Web3Provider(window.ethereum)
	// 从provider中获取一个signer
	const signer = provider.getSigner();
	// 创建合约实例
	const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
	return transactionContract;
};

export const TransactionProvider = ({ children }) => {
	const [currentAccount, setCurrentAccount] = useState("")
	const [formData, setformData] = useState({ addressTo: "", amount: "", keyword: "", message: "" });
	const [isLoading, setIsLoading] = useState(false);
	const [transactionCount, setTransactionCount] = useState(localStorage.getItem("transactionCount"));
	const [transactions, setTransactions] = useState([]);

	const handleChange = (e, name) => {
		setformData((prevState) => ({ ...prevState, [name]: e.target.value }));
	}

	// 检查有没有链接钱包，并获取当前的账户
	const checkIfWalletIsConnected = async () => {
		try {
			if (!ethereum) return alert("请安装Metamask!");
			// 发送了一个以太坊 JSON-RPC 请求，eth_accounts用于获取当前用户在当前网络中的以太坊账户列表。
			const accounts = await ethereum.request({ method: 'eth_accounts' })
			if (accounts.length) {
				setCurrentAccount(accounts[0])
				getAllTransactions()
			} else {
				console.log("accounts", accounts)
			}
		} catch (error) {
			console.log(error)
			throw new Error("没有获取到ethereum对象")
		}

	}

	const checkIfTransactionsExists = async () => {
		try {
			if (ethereum) {
				const transactionsContract = getEthereumContract();
				const currentTransactionCount = await transactionsContract.getTransactionCount();

				window.localStorage.setItem("transactionCount", currentTransactionCount);
			}
		} catch (error) {
			console.log(error);
			throw new Error("No ethereum object");
		}
	};

	const getAllTransactions = async () => {
		try {
			if (ethereum) {
				const transactionsContract = getEthereumContract();
				const availableTransactions = await transactionsContract.getAllTransactions();

				const structuredTransactions = availableTransactions.map((transaction) => ({
					addressTo: transaction.receiver,
					addressFrom: transaction.sender,
					timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
					message: transaction.message,
					keyword: transaction.keyword,
					amount: parseInt(transaction.amount._hex) / (10 ** 18)
				}));

				console.log(structuredTransactions);

				setTransactions(structuredTransactions);
			} else {
				if (!ethereum) return alert("请安装Metamask!");
			}
		} catch (error) {
			console.log(error);
			throw new Error("没有获取到ethereum对象")
		}
	};

	// 连接钱包
	const connectWallet = async () => {
		try {
			if (!ethereum) return alert("请安装Metamask!");
			const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
			setCurrentAccount(accounts[0])
			window.location.reload();
		} catch (error) {
			console.log(error)
			throw new Error("没有获取到ethereum对象")
		}
	}
	const sendTransaction = async () => {
		try {
			if (!ethereum) return alert("请安装Metamask!");
			const { addressTo, amount, keyword, message } = formData;
			// 获取智能合约实例
			const transactionContract = getEthereumContract()

			// 将以太币的数量(amount)转换为以太币的最小单位（wei）
			const parsedAmount = ethers.utils.parseEther(amount);
			// 发送一笔以太坊交易
			await ethereum.request({
				method: "eth_sendTransaction",
				params: [{
					from: currentAccount,
					to: addressTo,
					gas: "0x5208",
					value: parsedAmount._hex,
				}],
			});
			// 将交易信息添加到区块链中
			const transactionHash = await transactionContract.addToBlockchain(addressTo, parsedAmount, message, keyword);
			setIsLoading(true);
			console.log(`Loading - ${transactionHash.hash}`);
			await transactionHash.wait();
			console.log(`Success - ${transactionHash.hash}`);
			setIsLoading(false);

			const transactionsCount = await transactionContract.getTransactionCount();

			setTransactionCount(transactionsCount.toNumber());
			window.location.reload();

		} catch (error) {
			console.log(error)
			throw new Error("没有获取到ethereum对象")
		}
	}
	useEffect(() => {
		checkIfWalletIsConnected()
		checkIfTransactionsExists()
	}, [])
	return (
		<TransactionContext.Provider
			value={{
				connectWallet,
				currentAccount,
				formData,
				setformData,
				handleChange,
				sendTransaction,
				transactions,
				isLoading
			}}>
			{children}
		</TransactionContext.Provider>
	)
}

