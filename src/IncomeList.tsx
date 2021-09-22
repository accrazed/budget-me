import React from 'react';
import FrequencyField from './FrequencyField';
import type { Frequency } from './FrequencyField';

interface ITransactionList {
    curAmount: string;
    curTitle: string;
    items: Transaction[];
    total: number;
    frequency: Frequency;
}
class TransactionList extends React.Component<ITransactionList, ITransactionList> {
    constructor(props: any) {
        super(props);

        this.state = {
            items: [],
            curTitle: '',
            curAmount: '',
            total: 0,
            frequency: null,
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleAmountChange = this.handleAmountChange.bind(this);
        this.addItem = this.addItem.bind(this);
        this.onFreqChange = this.onFreqChange.bind(this);
    }

    onFreqChange(freq: Frequency) {
        this.setState({ frequency: freq });
    }

    handleTitleChange(e: any) {
        this.setState({ curTitle: e.target.value });
    }

    handleAmountChange(e: any) {
        this.setState({ curAmount: e.target.value });
    }

    addItem(e: any) {
        e.preventDefault();
        let curAmount = Number(this.state.curAmount);
        let curTitle = this.state.curTitle;
        let curFrequency = this.state.frequency;
        let curTotal = this.state.total;

        if (isNaN(curAmount) || curAmount === 0 || curTitle.length === 0) return;

        const items = this.state.items;
        this.setState({
            items: items.concat(new Transaction(curTitle, curAmount, curFrequency)),
            total: curTotal + curAmount,
            curAmount: '',
            curTitle: '',
        });
    }

    render() {
        let list = this.state.items.map((item) => {
            return (
                <div className="field-item">
                    {item.name}: ${item.amount} ({item.frequency})
                </div>
            );
        });
        return (
            <div className="add-income">
                <div>Freq {this.state.frequency}</div>
                <form onSubmit={this.addItem}>
                    <label htmlFor="">
                        Title
                        <input
                            className="field-input"
                            type="text"
                            value={this.state.curTitle}
                            onChange={this.handleTitleChange}
                        />
                    </label>
                    <label htmlFor="">
                        Amount
                        <input
                            className="field-input"
                            type="text"
                            value={this.state.curAmount}
                            onChange={this.handleAmountChange}
                        />
                    </label>
                    <FrequencyField
                        active={null}
                        onClick={(freq: Frequency) => this.onFreqChange(freq)}
                    />
                    <input type="submit" value="Submit" />
                </form>
                <div className="field-list">{list}</div>
                <div className="total">Total: ${this.state.total} / month</div>
            </div>
        );
    }
}

class Transaction {
    name: string;
    amount: number;
    frequency: Frequency;

    constructor(name: string, amount: number, frequency: Frequency) {
        this.name = name;
        this.amount = amount;
        this.frequency = frequency;
    }
}
export default TransactionList;
