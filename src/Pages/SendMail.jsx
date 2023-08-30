import axios from "axios";
import { useDialog } from "../Context/DialogContext";
import Header from "../Components/Header";
import VendorForm from "../Components/Form";
import AlertDialogSlide from "../Components/Dialog";
import Footer from "../Components/Footer";

function SendMail() {
  const { dispatch } = useDialog();
  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  async function sendmailtovendor(mail) {
    dispatch({ type: "loading" });
    // console.log("called");
    try {
      await axios.post("http://localhost:5000/sendmail", {
        ...mail,
        subject: "remainder",
      });
      dispatch({ type: "show_message", email: mail.email });
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Send mail to vendor</h1>
      <div style={style}>
        <VendorForm onSubmit={sendmailtovendor} />
      </div>
      <AlertDialogSlide />
      <Footer />
    </div>
  );
}

export default SendMail;
