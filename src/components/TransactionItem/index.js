import './index.css'

const TransactionItem = props => {
  const {transactionDetails, transactionDelete} = props
  const {id, title, amount, type} = transactionDetails

  const onClickDeleteIcon = () => {
    transactionDelete(id)
  }

  return (
    <li className="history-item">
      <p className="history-row">{title}</p>
      <p className="history-row">{amount}</p>
      <div className="history-row-container">
        <p className="history-row">{type}</p>
        <button
          className="delete-icon-button"
          type="button"
          onClick={onClickDeleteIcon}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
