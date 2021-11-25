import { useSelector } from "react-redux";
import { useState } from "react";
import { selectToken } from "../store/user/selectors";
import axios from "axios";
import QRCode from "react-qr-code";

export default function QRCodePage() {
  const token = useSelector(selectToken);
  const [bean, setBean] = useState("1");
  const [quantity, setQuantity] = useState(0);
  const [qrCodeValue, setQrCodeValue] = useState(null);

  const store = 1;
  const user = 1;

  async function onSubmitForm(event) {
    event.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:4000/store/qr?store=${store}&quantity=${quantity}&bean=${bean}`
      );
      console.log(response.data.qrCodeUrl);
      setQrCodeValue(response.data.qrCodeUrl);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <h1> Hello from QR code page!</h1>
      <div>
        <label for="beans">Bean:</label>
        <select
          value={bean}
          onChange={(e) => setBean(e.target.value)}
          name="beans"
          id="beans"
          form="beanform"
        >
          <option value="1">Brazil</option>
          <option value="2">Peru</option>
          <option value="3">Vietnam</option>
          <option value="4">Indonesia</option>
          <option value="5">India</option>
        </select>
        <label for="quantity">Quantity (between 1 and 5):</label>
        <input
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          type="number"
          id="quantity"
          name="quantity"
          min="1"
          max="5"
        ></input>
        <button onClick={onSubmitForm}>Generate QR code</button>
        <div>{qrCodeValue && <QRCode value={qrCodeValue} />}</div>
      </div>
    </div>
  );
}
