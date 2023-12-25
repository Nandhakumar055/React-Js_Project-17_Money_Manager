import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    titleInput: '',
    amountInput: '',
    transactionsList: [],
    optionId: transactionTypeOptions[0].optionId,
  }

  onChangeTittleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    this.setState({amountInput: event.target.value})
  }

  onChangeTypeSelect = event => {
    this.setState({optionId: event.target.value})
  }

  onAddTransaction = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state

    const typeOption = transactionTypeOptions.find(
      eachItem => eachItem.optionId === optionId,
    )

    const {displayText} = typeOption

    const addNewTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }

    this.setState(prevState => ({
      transactionsList: [...prevState.transactionsList, addNewTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  transactionDelete = id => {
    const {transactionsList} = this.state
    const updatedTransactionsList = transactionsList.filter(
      eachTransaction => eachTransaction.id !== id,
    )

    this.setState({
      transactionsList: updatedTransactionsList,
    })
  }

  getIncome = () => {
    const {transactionsList} = this.state
    let incomeAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      }
    })
    return incomeAmount
  }

  getExpenses = () => {
    const {transactionsList} = this.state
    let expensesAmount = 0
    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachTransaction.amount
      }
    })
    return expensesAmount
  }

  getBalance = () => {
    const {transactionsList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    transactionsList.forEach(eachTransaction => {
      if (eachTransaction.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTransaction.amount
      } else {
        expensesAmount += eachTransaction.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount

    return balanceAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionsList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()

    return (
      <div className="money-manager-bg-container">
        <div className="main-container">
          <div className="welcome-container-section">
            <h1 className="user-name">Hi, Richard</h1>
            <p className="welcome-greeting">
              Welcome back to your{' '}
              <span className="app-title"> Money Manager</span>
            </p>
          </div>
          <ul className="money-details-section">
            <MoneyDetails
              balanceAmount={balanceAmount}
              incomeAmount={incomeAmount}
              expensesAmount={expensesAmount}
            />
          </ul>
          <div className="add-transaction-and-history">
            <form
              className="add-transaction-form-container"
              onSubmit={this.onAddTransaction}
            >
              <h1 className="add-transaction-heading">Add Transaction</h1>
              <label htmlFor="Title" className="label">
                TITLE
              </label>
              <input
                id="Title"
                type="text"
                placeholder="TITLE"
                className="text-input"
                onChange={this.onChangeTittleInput}
                value={titleInput}
              />
              <label htmlFor="Amount" className="label">
                AMOUNT
              </label>
              <input
                id="Amount"
                type="text"
                placeholder="AMOUNT"
                className="text-input"
                onChange={this.onChangeAmountInput}
                value={amountInput}
              />
              <label htmlFor="Type" className="label">
                TITLE
              </label>
              <select
                id="select"
                value={optionId}
                className="text-input"
                onChange={this.onChangeTypeSelect}
              >
                {transactionTypeOptions.map(eachOption => (
                  <option key={eachOption.optionId} value={eachOption.optionId}>
                    {eachOption.displayText}
                  </option>
                ))}
              </select>
              <div>
                <button className="add-button" type="submit">
                  Add
                </button>
              </div>
            </form>
            <div className="history-container">
              <h1 className="history-heading">History</h1>
              <div className="history-card-container">
                <div className="heading-row-container">
                  <p className="heading-row">Title</p>
                  <p className="heading-row">Amount</p>
                  <p className="heading-row-diff">Type</p>
                </div>
                {transactionsList.length !== 0 ? (
                  <ul className="history-items-container">
                    {transactionsList.map(eachTransaction => (
                      <TransactionItem
                        key={eachTransaction.id}
                        transactionDetails={eachTransaction}
                        transactionDelete={this.transactionDelete}
                      />
                    ))}
                  </ul>
                ) : (
                  <div className="no-history-container">
                    <p className="no-history">No history</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
