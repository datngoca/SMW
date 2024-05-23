import { useState } from "react";
import Profile from "./Profile";

function ProfileContainer() {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  };

  return (
    <>
      <Profile reload={reload} handleReload={handleReload} />
    </>
  );
}

export default ProfileContainer;
