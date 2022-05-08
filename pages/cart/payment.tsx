import useForm from 'hooks/useForm'
import useShopping from 'hooks/useShopping'
import { creditCards } from 'consts/creditCard'
import { months, years } from 'consts/selecPayment'

function Payment() {
  const { amount } = useShopping()
  const { formState, handleBlur, handleChange, handleSubmit } = useForm()

  const { cardNumber, name, surname, month, year, zipCode } = formState

  return (
    <div className="wrapperFormPayment">
      <form className="formPayment" onSubmit={handleSubmit}>
        <label className="formPayment__label" htmlFor="card">
          Choose card type:
        </label>
        <select
          className="formPayment__select"
          name="card"
          onChange={handleChange}
          onBlur={handleBlur}
        >
          {creditCards.map((card) => (
            <option key={card} value={card}>
              {card}
            </option>
          ))}
        </select>
        <fieldset className="formPayment__fieldset">
          <legend className="formPayment__legend">Payment Details</legend>
          <div className="formPayment__info">
            <div className="wrapperInfo">
              <label className="formPayment__label" htmlFor="cardNumber">
                Card number:
              </label>
              <input
                className="formPayment__input"
                type="text"
                name="cardNumber"
                placeholder="9999999999999999"
                pattern="^[0-9]{14,19}$"
                maxLength={19}
                autoComplete="off"
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
              <span
                className={
                  cardNumber.error && cardNumber.hasError
                    ? `errorMsg errorMsg_payment`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {cardNumber.error}
              </span>
            </div>
            <div className="wrapperInfo">
              <span className="formPayment__label">Expiration:</span>
              <div className="formPayment__expiration">
                <select
                  name="month"
                  className="expiration__month"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month.toString()}
                    </option>
                  ))}
                </select>
                <span className="formPayment__separator">/</span>
                <select
                  name="year"
                  className="expiration__year"
                  onBlur={handleBlur}
                  onChange={handleChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year.toString()}
                    </option>
                  ))}
                </select>
              </div>
              <span
                className={
                  (month.error && month.hasError) ||
                  (year.error && year.hasError)
                    ? `errorMsg errorMsg_payment`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {month.error ? month.error + '. ' + year.error : year.error}
              </span>
            </div>
          </div>
          <div className="formPayment__info">
            <div className="wrapperInfo">
              <label className="formPayment__label" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                className="formPayment__input"
                name="Name"
                placeholder="Oliver"
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
              <span
                className={
                  name.error && name.hasError
                    ? `errorMsg errorMsg_payment`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {name.error}
              </span>
            </div>
            <div className="wrapperInfo">
              <label className="formPayment__label" htmlFor="surname">
                Surname
              </label>
              <input
                type="text"
                className="formPayment__input"
                name="surname"
                placeholder="Parker"
                pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\s]+$"
                onBlur={handleBlur}
                onChange={handleChange}
                required
              />
              <span
                className={
                  surname.error && surname.hasError
                    ? `errorMsg errorMsg_payment`
                    : `errorMsg errorMsg_hidden`
                }
              >
                {surname.error}
              </span>
            </div>
          </div>

          <label className="formPayment__label" htmlFor="postcode">
            Zip Code:
          </label>
          <input
            className="formPayment__input"
            type="text"
            name="zipCode"
            placeholder="11111"
            pattern="^[0-9]{4,9}$"
            maxLength={9}
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            required
          />
          <span
            className={
              zipCode.error && zipCode.hasError
                ? `errorMsg errorMsg_payment`
                : `errorMsg errorMsg_hidden`
            }
          >
            {zipCode.error}
          </span>
          <span className="formPayment__amount">Amount: {amount}</span>
        </fieldset>
        <button className="panelBtnCart__btn formPayment__btn">
          <span className="panelBtnCart__text">Continue</span>
        </button>
      </form>
    </div>
  )
}

export default Payment
