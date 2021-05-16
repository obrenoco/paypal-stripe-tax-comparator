import "./styles.css";
import { useState } from "react";

export default function App() {
  const [input, setInput] = useState(0);
  const handleInput = (e) => setInput(e.target.value);

  const currentDate = "16/04/2021";

  const transformCurrency = (x) =>
    new Intl.NumberFormat("eu-FR", {
      style: "currency",
      currency: "EUR"
    }).format(x);

  const stripeUeTax = 0.014;
  const stripeNonUeTax = 0.029;
  const stripeFixTax = 0.25;

  const paypalNationalTax = 0.029;
  const paypalEurope1Tax = 0.034;
  const paypalEurope2Tax = 0.04;
  const paypalFixTax = 0.35;

  const taxValue = (variable, fix) =>
    input ? (variable * input + fix).toFixed(2) : 0;

  const formatedStripeUeTax = taxValue(stripeUeTax, stripeFixTax);
  const formatedStripeTaxUeNon = taxValue(stripeNonUeTax, stripeFixTax);

  const formatedPaypalNationalTax = taxValue(paypalNationalTax, paypalFixTax);
  const formatedPaypalEurope1Tax = taxValue(paypalEurope1Tax, paypalFixTax);
  const formatedPaypalEurope2Tax = taxValue(paypalEurope2Tax, paypalFixTax);

  return (
    <div className="App">
      <h1>🇫🇷 Taxas Paypal x Stripe</h1>
      <p>{currentDate}</p>
      <h2>Total do pagamento recebido </h2>
      <input mask="currency" onChange={handleInput} />
      <div style={{ display: "flex", textAlign: "left", padding: 15 }}>
        <section>
          <p>
            Recebendo{" "}
            <span style={{ fontWeight: "bold" }}>
              {transformCurrency(input)}
            </span>{" "}
            no <span style={{ fontWeight: "bold" }}>Stripe</span> você retira:
          </p>
          <ul style={{ listStyle: "none" }}>
            <li>
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(input - formatedStripeUeTax)}
              </span>{" "}
              em transações <span style={{ fontWeight: "bold" }}>UE</span>{" "}
              pagando uma taxa de{" "}
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(formatedStripeUeTax)}
              </span>{" "}
              {`(${(stripeUeTax * 100).toFixed(2)}% + € ${stripeFixTax} )`}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(input - formatedStripeTaxUeNon)}
              </span>{" "}
              em transações <span style={{ fontWeight: "bold" }}>NO-UE</span>{" "}
              pagando uma taxa de{" "}
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(formatedStripeTaxUeNon)}
              </span>{" "}
              {`(${(stripeNonUeTax * 100).toFixed(2)}% + € ${stripeFixTax} )`}
            </li>
          </ul>
        </section>
        <section>
          <p>
            Recebendo{" "}
            <span style={{ fontWeight: "bold" }}>
              {transformCurrency(input)}
            </span>{" "}
            no <span style={{ fontWeight: "bold" }}>Paypal</span> você retira:
          </p>
          <ul style={{ listStyle: "none" }}>
            <li>
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(input - formatedPaypalNationalTax)}
              </span>{" "}
              em transações{" "}
              <span style={{ fontWeight: "bold" }}>na França</span> pagando uma
              taxa de{" "}
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(formatedPaypalNationalTax)}
              </span>{" "}
              {`(${(paypalNationalTax * 100).toFixed(
                2
              )}% + € ${paypalFixTax} )`}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(input - formatedPaypalEurope1Tax)}
              </span>{" "}
              em transações <span style={{ fontWeight: "bold" }}>Europa 1</span>{" "}
              pagando uma taxa de{" "}
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(formatedPaypalEurope1Tax)}
              </span>{" "}
              {`(${(paypalEurope1Tax * 100).toFixed(2)}% + € ${paypalFixTax} )`}
            </li>
            <li>
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(input - formatedPaypalEurope2Tax)}
              </span>{" "}
              em transações <span style={{ fontWeight: "bold" }}>Europa 2</span>{" "}
              pagando uma taxa de{" "}
              <span style={{ fontWeight: "bold" }}>
                {transformCurrency(formatedPaypalEurope2Tax)}
              </span>{" "}
              {`(${(paypalEurope2Tax * 100).toFixed(2)}% + € ${paypalFixTax} )`}
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
