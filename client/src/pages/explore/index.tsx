import Categories from "./categories";
import { useLoaderData } from "react-router-dom";
import "./style.scss";

interface RecordsProps {
  recordid: string;
  price: number;
  name: string;
  host_neighbourhood: string,
  city: string,
  xl_picture_url: string,
}
// const getRecords = (records: any) => {
//   return records
// }

const Explore = () => {
  // const records = getRecords(useLoaderData())
  const records = useLoaderData() as RecordsProps[];
  records.map((records) => (console.log(records.recordid)))
  return (
    <main className="explore-wrapper">
      <section className="categories-wrapper">
        <div className="categories-scroll">
          <Categories />
        </div>
      </section>
      <div className="listing-wrapper">
        {records.map((record) => (
          <div className="card" key={record.recordid}>
            <img src={record.xl_picture_url} alt="" />
            <div className="card-content">
              <p className="location">{`${record.host_neighbourhood},${record.city}`}</p>
              <p className="nights">{}</p>
              <p className="price">{record.price}</p>
            </div>
            
          </div>
        ))}
      </div>
    </main>
  );
};

export default Explore;
