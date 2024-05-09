import { useEffect, useState } from "react";
import { getResource } from "../../services/services";
import GoBack from "../../components/GoBack";

function ProductList(props) {
  const api = "products";
  const { reload } = props;
  const [data, setData] = useState([]);
  const [editReload, setEditReload] = useState(false);

  const handleReload = () => {
    setEditReload(!editReload);
  };

  useEffect(() => {
    const fetchApi = async () => {
      const result = await getResource(api);
      setData(result);
    };
    fetchApi();
  }, [reload, editReload]);

  console.log(data);

  return (
    <>
      <div className="card mb-3">
        <div className="card-header">
          <span className="card-button">
            <GoBack />
          </span>
          <strong>Danh sách sản phẩm</strong>
        </div>
        <div className="card-body">
          <table className="table  text-center ">
            <thead>
              <tr className="column column-thead">
                <th className="box box-thead">Name</th>
                <th className="box box-thead">Category</th>
                <th className="box box-thead">No Of Producst</th>
                <th className="box box-thead">Cost Value</th>
                <th className="box box-thead">Service Provider</th>
                <th className="box box-thead">Status</th>
                <th className="box box-thead">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.data &&
                data.data.map((item, index) => (
                  <tr className="column" key={item._id}>
                    <td className="box">{item.name}</td>
                    <td className="box">{item.category}</td>
                    <td className="box">{item.no_of_Products}</td>
                    <td className="box">${item.price}</td>
                    <td className="box"> {item.serviceProvider}</td>
                    <td className="box"> {item.status}</td>
                    <td className="box"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default ProductList;
