import React, { useEffect, useState } from "react";
import axios from "axios";

import { Redirect } from "react-router";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "../store/user/selectors";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

async function transaction(userToken, token, store, bean, quantity) {
  console.log(userToken, token, store, bean, quantity);
}

export default function ScanStampPage() {
  const query = useQuery();
  const otpToken = query.get("token");
  const storeUser = query.get("storeuser");
  const bean = query.get("bean");
  const quantity = query.get("quantity");
  const history = useHistory();
  const [scanFailed, setScanFailed] = useState(false);
  const token = useSelector(selectToken);

  console.log(
    `the otp: ${otpToken}, the storeUser: ${storeUser}, the bean: ${bean}, quantity: ${quantity}`
  );
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/transaction?storeuser=${storeUser}&quantity=${quantity}&bean=${bean}&token=${otpToken}`,
          {},
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        history.push(`carddetails/${storeUser}`);
      } catch (e) {
        setScanFailed(true);
      }
    })();
  }, []);

  return (
    <div>
      <h1>Loading!</h1>
    </div>
  );
}
