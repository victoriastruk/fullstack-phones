import { useEffect } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import {
  deletePhoneThunk,
  getPhonesThunk,
  updateNfcThunk,
} from "../../store/slices/phonesSlice";
import defImage from "./defaultPhoto.png";
import styles from './PhoneList.module.sass'

function PhonesList({
  phones,
  isFetching,
  error,
  getPhones,
  deletePhone,
  updateNfc,
}) {
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
            <p>
              NFC:{" "}
              {u.has_nfc ? (
                <FaCheckCircle style={{ color: "green" }} />
              ) : (
                <FaTimesCircle style={{ color: "red" }} />
              )}
            </p>

            {/* <label>
              <input
                type="checkbox"
                checked={u.has_nfc}
                onChange={() => updateNfc({ id: u.id, has_nfc: !u.has_nfc })}
              />
              Toggle NFC
            </label> */}

            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={u.has_nfc}
                onChange={() => updateNfc({ id: u.id, has_nfc: !u.has_nfc })}
              />
              <span className={styles.slider}></span>
            </label>

            <button onClick={() => deletePhone(u.id)}>X</button>
          </li>
        ))}
      </ul>
    </>
  );
}

const mapStateToProps = ({ phonesData }) => phonesData;

const mapDispatchToProps = (dispatch) => ({
  getPhones: () => dispatch(getPhonesThunk()),
  updateNfc: (payload) => dispatch(updateNfcThunk(payload)),
  deletePhone: (id) => dispatch(deletePhoneThunk(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhonesList);
