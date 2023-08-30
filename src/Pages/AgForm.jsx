import Header from "../Components/Header";
import { DialogContextProvider } from "../Context/DialogContext";
import AlertDialogSlide from "../Components/Dialog";
import Footer from "../Components/Footer";
import Table from "../Components/Table";

function AgForm() {
  return (
    <div className="App">
      <Header />
      <DialogContextProvider>
        <h1 style={{ textAlign: "center" }}>Invoice Details</h1>
        <Table />
        <AlertDialogSlide />
      </DialogContextProvider>
      <Footer />
    </div>
  );
}

export default AgForm;
