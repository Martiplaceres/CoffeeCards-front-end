import React, { useEffect, useState } from "react";
import axios from "axios";

import { Redirect } from "react-router";
import {
  BrowserRouter as Router,
  Link,
  useLocation,
  useHistory,
} from "react-router-dom";

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

async function transaction(userToken, token, store, bean, quantity) {
  console.log(userToken, token, store, bean, quantity);
}

export default function ScanPage() {
  const query = useQuery();
  const token = query.get("token");
  const store = query.get("store");
  const bean = query.get("bean");
  const quantity = query.get("quantity");
  const history = useHistory();
  const [scanFailed, setScanFailed] = useState(false);
  useEffect(() => {
    (async () => {
      try {
        const response = await axios.post(
          `http://localhost:4000/transaction/?store=${store}&quantity=${quantity}&bean=${bean}&token=${token}`
        );
        history.push(`carddetails/${store}`);
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
