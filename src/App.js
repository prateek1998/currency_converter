import React, { Component } from "react";
import { Card } from "react-bootstrap";
import "./App.css";
class App extends Component {
  constructor() {
    super();
    this.state = {
      currencies: [
        "CAD",
        "HKD",
        "ISK",
        "PHP",
        "DKK",
        "HUF",
        "CZK",
        "AUD",
        "RON",
        "SEK",
        "IDR",
        "INR",
        "BRL",
        "RUB",
        "HRK",
        "JPY",
        "THB",
        "CHF",
        "SGD",
        "PLN",
        "BGN",
        "TRY",
        "CNY",
        "NOK",
        "NZD",
        "ZAR",
        "USD",
        "MXN",
        "ILS",
        "GBP",
        "KRW",
        "MYR",
      ],
      base: "USD",
      amount: "0",
      convertTo: "INR",
      result: "",
      date: "",
    };
  }
  handleInput = (e) => {
    this.setState(
      { amount: e.target.value, result: null, date: null },
      this.converter
    );
  };
  handleOutput = (e) => {
    this.setState(
      { [e.target.name]: e.target.value, result: null },
      this.converter
    );
  };

  handleSwap = (e) => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null,
      },
      this.converter
    );
  };
  converter = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      fetch(`https://api.exchangeratesapi.io/latest?base=${this.state.base}`)
        .then((res) => res.json())
        .then((data) => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date,
          });
          // console.log(result);
        });
    }
  };

  render() {
    const { amount, date, base, currencies, result, convertTo } = this.state;
    return (
      <div className="App">
        <h1>CURRENCY CONVERTER</h1>
        <Card style={{ width: "18rem", margin: "10vh auto" }}>
          <Card.Body>
            <Card.Title>
              {" "}
              <h5>
                {amount} {base} is equivalent to
              </h5>
              <h2>
                {amount === ""
                  ? "0"
                  : result === null
                  ? "Calculating..."
                  : result}{" "}
                {convertTo}
              </h2>
            </Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <p>As of {amount === "" ? null : date === null ? "" : date}</p>
            </Card.Subtitle>
            {/* <Card.Text>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.
            </Card.Text>
            <Card.Link href="#">Card Link</Card.Link>
            <Card.Link href="#">Another Link</Card.Link>
             */}

            <form>
              <input type="number" value={amount} onChange={this.handleInput} />
              <select name="base" value={base} onChange={this.handleOutput}>
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <input
                disabled={true}
                value={
                  amount === ""
                    ? "0"
                    : result === null
                    ? "Calculating.."
                    : result
                }
                // onChange={this.handleOutput}
              />
              <select
                name="convertTo"
                value={convertTo}
                onChange={this.handleOutput}
              >
                {currencies.map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
              <button onClick={this.handleSwap}>SWAP</button>
            </form>
          </Card.Body>
        </Card>
      </div>
    );
  }
}

export default App;
