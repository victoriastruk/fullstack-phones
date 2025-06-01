import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import { getPhonesThunk } from "../../store/slices/phonesSlice";
import defImage from "./defaultPhoto.png";

function PhonesList({ phones, isFetching, error, getPhones }) {
  useEffect(() => {
    getPhones();
  }, []);

  return (
    <>
      <BeatLoader loading={isFetching} />
      {error && <div>Error!</div>}
      <ul>
        {phones.map((u) => (
          <li key={u.id}>
            <img
              src={
                u.image ? `http://localhost:5000/images/${u.image}` : defImage
              }
              alt={`${u.firstName} ${u.lastName}`}
            />
            <p>{JSON.stringify(u)}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

const mapStateToProps = ({ phonesData }) => phonesData;

const mapDispatchToProps = (dispatch) => ({
  getPhones: () => dispatch(getPhonesThunk()),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhonesList);
