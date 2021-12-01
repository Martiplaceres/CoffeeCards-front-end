import React, { useEffect, useState } from "react";
import axios from "axios";
import { selectToken } from "../store/user/selectors";
import { useSelector } from "react-redux";
import CoffeeCup from "../components/CoffeCup";
import { Card } from "react-bootstrap";

export default function MyCardsPage() {
  const [myStampCards, setMyStampCards] = useState([]);
  const token = useSelector(selectToken);
  const userId = localStorage.getItem("id");
  // console.log("user id", userId);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/transaction/mycards/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("My cards:", response.data);
        setMyStampCards(response.data);
      } catch (e) {
        console.log("error:", e);
      }
    })();
  }, []);

  return (
    <div
      className="animation"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        marginTop: 50,
      }}
    >
      <h1
        style={{
          fontSize: 30,
          fontFamily: "lobster",
        }}
      >
        {" "}
        Your active stamp cards:{" "}
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {!myStampCards
          ? "Loading"
          : myStampCards.map((stampCard) => {
              return stampCard.stamps > 0 ? (
                <div key={stampCard.id} style={{ marginTop: 20 }}>
                  <Card className="card" style={{ width: "18rem" }}>
                    <Card.Body>
                      <Card.Title>{stampCard.store_name}</Card.Title>
                      <div style={{ display: "flex", justifyContent: "row" }}>
                        {[...Array(stampCard.stamps)].map((e, i) => (
                          <div>
                            <CoffeeCup />
                            <p></p>
                          </div>
                        ))}
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              ) : (
                <div></div>
              );
            })}
      </div>
    </div>
  );
}
