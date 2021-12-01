import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken, selectUserId, selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import "../App.css";

export default function MyVouchers() {
  const [myVouchers, setMyVouchers] = useState([]);
  const token = useSelector(selectToken);
  const userId = localStorage.getItem("id");
  const user = useSelector(selectUser);

  const [message, setMessage] = useState("");

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
                <button
                  // className="button"
                  style={{ marginTop: 20 }}
                  type="button"
                  class="btn btn-dark"
                  onClick={() => {
                    const result = window.confirm(
                      "Are you sure you want to make use of this voucher?"
                    );

                    if (result) {
                      setMessage(
                        `You have a free coffee at ${voucher.store.name}`
                      );

                      async function updateVoucher() {
                        try {
                          const response = await axios.put(
                            `http://localhost:4000/vouchers/${voucher.id}`,
                            {
                              claimed: true,
                            }
                          );
                        } catch (e) {
                          console.log("error:", e);
                        }
                      }
                      updateVoucher();
                    }
                  }}
                >
                  {voucher.store.name}
                </button>
              </div>
            );
          })}
      <p>{message}</p>
    </div>
  );
}
