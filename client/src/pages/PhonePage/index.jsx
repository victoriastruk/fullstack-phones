import PhonesForm from "../../components/forms/PhoneForm";
import PhonesList from "../../components/PhonesList";

function PhonePage() {
  return (
    <section className="container">
      <h2>Add Phone</h2>
      <PhonesForm />
      <PhonesList />
    </section>
  );
}

export default PhonePage;
