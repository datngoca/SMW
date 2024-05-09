import { useState } from "react";
import ProductList from "./ProductList";

function Products() {

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload(!reload);
  }

  return (
    <>
      <ProductList reload={handleReload} />
    </>
  );
}

export default Products;