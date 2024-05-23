import { useState } from "react";
import EmployeeList from "./EmployeeList";

function Employee() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <EmployeeList reload={handleReload} />
    </>
  );
}

export default Employee;
