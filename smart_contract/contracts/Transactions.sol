// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    // 一个无符号整数类型的变量，用来记录交易的总数量。
    uint256 transactionCount;

    /* 用于在区块链上触发交易事件。当交易被添加到区块链时，
     会触发此事件，并将相关的信息作为参数传递。*/
    event Transfer(
        address from,
        address receiver,
        uint amount,
        string message,
        uint256 timestap,
        string keyword
    );

    // 定义了一个交易的数据结构。它包含了交易的发送者、接收者、金额、消息、时间戳和关键词等信息。
    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;
        string keyword;
    }
    TransferStruct[] transactions;

    function addToBlockchain(
        address payable receiver,
        uint amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
