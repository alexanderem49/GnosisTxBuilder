type Transaction = {
    "to": string,
    "value": string,
    "data": string
}

type GnosisTxContainer = {
    "version": string;
    "chainId": string;
    "createdAt": number;
    "meta": {
        "name": string;
        "description": string;
        "txBuilderVersion": string;
        "createdFromSafeAddress": string;
        "createdFromOwnerAddress": string;
    };
    "transactions": Transaction[];
};

export class TxBuilder {
    private readonly chainId: number;
    private readonly safeAddress: string;
    private transactions: Transaction[];

    constructor(chainId: number, safeAddress: string) {
        this.chainId = chainId;
        this.safeAddress = safeAddress;
        this.transactions = [];
    }

    addTx(destination: string, data: string, value: string) {
        this.transactions.push({
            to: destination,
            data: data,
            value: value
        })
    }

    getObject(): GnosisTxContainer {
        return {
            "version": "1.0",
            "chainId": this.chainId.toString(),
            "createdAt": Math.floor(Date.now() / 1000),
            "meta": {
                "name": "Transactions Batch",
                "description": "",
                "txBuilderVersion": "1.6.0",
                "createdFromSafeAddress": this.safeAddress,
                "createdFromOwnerAddress": "",
            },
            "transactions": this.transactions
        }
    }

    getString(): string {
        return JSON.stringify(this.getObject());
    }
}