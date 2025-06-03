import { useEffect } from "react";
import BeatLoader from "react-spinners/BeatLoader";
import { connect } from "react-redux";
import {
  deletePhoneThunk,
  getPhonesThunk,
  updateNfcThunk,
} from "../../store/slices/phonesSlice";
import defImage from "./defaultPhoto.png";
import styles from "./PhoneList.module.sass";

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
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Model</th>
            <th>Brand</th>
            <th>Year</th>
            <th>CPU</th>
            <th>Screen size</th>
            <th>NFC</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phones.map((p) => (
            <tr key={p.id}>
              <td>
                <img
                  className={styles.userImage}
                  src={
                    p.image
                      ? `http://localhost:5000/images/${p.image}`
                      : defImage
                  }
                  alt={`${p.model} ${p.brand}`}
                />
              </td>
              <td>{p.model}</td>
              <td>{p.brand}</td>
              <td>{p.year}</td>
              <td>
                {p.name} ({p.manufacturer})
              </td>
              <td>{p.screen_size}</td>
              <td>
                <label className={styles.switch}>
                  <input
                    type="checkbox"
                    checked={p.has_nfc}
                    onChange={() =>
                      updateNfc({ id: p.id, has_nfc: !p.has_nfc })
                    }
                  />
                  <span className={styles.slider}></span>
                </label>
              </td>
              <td>
                <button
                  className={styles.deleteButton}
                  onClick={() => deletePhone(p.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFetching && (
        <div className={styles.loaderOverlay}>
          <BeatLoader loading={true} size={6} />
        </div>
      )}

      {error && (
        <div className={styles.errorBox}>
          <strong>Error: </strong>
          {error}
        </div>
      )}
    </div>
  );
}

const mapStateToProps = ({ phonesData }) => phonesData;

const mapDispatchToProps = (dispatch) => ({
  getPhones: () => dispatch(getPhonesThunk()),
  updateNfc: (payload) => dispatch(updateNfcThunk(payload)),
  deletePhone: (id) => dispatch(deletePhoneThunk(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(PhonesList);
