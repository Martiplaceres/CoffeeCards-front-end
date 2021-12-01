import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import axios from "axios";
export default function BeanDetails(props) {
  const [bean, setBean] = useState("");
  const { beanId } = useParams();
  const userId = localStorage.getItem("id");
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/beans/${beanId}`
        );
        console.log("Bean:", response.data);
        setBean(response.data);
      } catch (e) {
        console.log("error:", e);
      }
    })();
  }, []);

  return (
    <div className="animation" style={{ textAlign: "center", marginTop: 50 }}>
      <h1 style={{ fontSize: 25 }}>All you need to know about beans from: </h1>
      <div key={bean.id}>
        <h2
          style={{
            fontSize: 45,
            fontFamily: "lobster",
            marginTop: 50,
            fontWeight: "bold",
          }}
        >
          {bean.name}
        </h2>
        <h3 style={{ fontSize: 20, fontWeight: "bold", marginTop: 30 }}>
          {" "}
          {bean.facts}{" "}
        </h3>
        {bean.history}
      </div>
    </div>
  );
}
