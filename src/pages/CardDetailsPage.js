import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
import { selectToken, selectUser } from "../store/user/selectors";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CoffeeCup from "../components/CoffeCup";
import { Card } from "react-bootstrap";
import "../App.css";
export default function CardDetailsPage() {
  const [myCard, setMyCard] = useState(null);
  const token = useSelector(selectToken);
  const { storeId } = useParams();
  const user = useSelector(selectUser);
  // const userToken = useSelector(getUserWithStoredToken);
  const userId = localStorage.getItem("id");

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/transaction/${storeId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("current stamps:", response.data);
        setMyCard(response.data);
      } catch (e) {
        console.log("error:", e);
      }
    })();
  }, []);

  if (!myCard) return <div>Loading!</div>;
  // console.log("my card", myCard);
  return (
    <div
      className="animation"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        marginTop: 50,
      }}
    >
      <h1 style={{ fontSize: 30, marginTop: 30, marginBottom: 25 }}>
        {" "}
        Enjoy your coffee!
      </h1>
      <Card className="card" style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>{myCard.store}</Card.Title>
          <div style={{ display: "flex", justifyContent: "row" }}>
            {[...Array(myCard.currentStamps)].map((e, i) => (
              <div>
                <CoffeeCup />
              </div>
            ))}
          </div>
        </Card.Body>
      </Card>
      <div>
        <h3
          style={{
            textAlign: "center",
            marginTop: 10,
            fontSize: 20,
          }}
        >
          {user.name}, you need {myCard.stampLimit - myCard.currentStamps} more
          stamps to get a voucher.
        </h3>
        <p>Are you curious about which beans are we using?</p>
        <button type="button" class="btn btn-dark">
          <Link to={`/beans/${myCard.lastBean.id}`} style={{ color: "white" }}>
            Learn more about {myCard.lastBean.name} bean.
          </Link>{" "}
        </button>
      </div>
    </div>
  );
}

{
  /* <Link to={`/beans/${myCard.lastBean.id}`}>
            Learn more about {myCard.lastBean.name} bean.
          </Link> */
}
