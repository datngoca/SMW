import { useState } from "react";
import RevenueChart from "./chart.js";

function Chart() {

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <RevenueChart reload={handleReload} />
    </>
  );
}

export default Chart;