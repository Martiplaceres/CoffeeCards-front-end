import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken, selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import "../App.css";
import QRCode from "react-qr-code";
import { Modal, Button } from "react-bootstrap";

export default function MyVouchers() {
  const [myVouchers, setMyVouchers] = useState([]);
  const token = useSelector(selectToken);
  const userId = localStorage.getItem("id");
  const user = useSelector(selectUser);

  const [qrCodeValue, setQrCodeValue] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/vouchers/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("My vouchers:", response.data);
        setMyVouchers(response.data);
      } catch (e) {
        console.log("error:", e);
      }
    })();
  }, []);

  return (
    <div
      className="animation"
      style={{
        textAlign: "center",
        marginTop: 50,
      }}
    >
      <h1
        style={{
          fontSize: 25,
          fontFamily: "lobster",
        }}
      >
        {user.name}, time for free coffee!
      </h1>

      {!Array.isArray(myVouchers)
        ? `You have no vouchers yet.`
        : myVouchers.map((voucher) => {
            return (
              <div key={voucher.id}>
                <Button
                  variant="primary"
                  onClick={() => {
                    const url = `http://localhost:3000/scanvoucher?id=${voucher.id}&storeId=${voucher.storeId}`;
                    console.log(url);
                    setQrCodeValue(url);
                  }}
                >
                  {voucher.store.name}
                </Button>

                <Modal
                  show={qrCodeValue != null}
                  onHide={() => setQrCodeValue(null)}
                >
                  <Modal.Header closeButton>
                    <Modal.Title>Show QR code to use voucher</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {qrCodeValue && <QRCode value={qrCodeValue} />}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="secondary"
                      onClick={() => setQrCodeValue(null)}
                    >
                      Close
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div>
            );
          })}
    </div>
  );
}
