import { useState } from "react";
import OrderList from "./OrderList";
function OrdersList() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <OrderList reload={handleReload} />
    </>
  );
}

export default OrdersList;
