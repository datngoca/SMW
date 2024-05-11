import { useState } from "react";
import CustomerList from "./Customer";

function Customer() {

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <CustomerList reload={handleReload} />
    </>
  );
}

export default Customer;