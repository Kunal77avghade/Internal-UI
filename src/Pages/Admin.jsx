import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { saveAs } from "file-saver";
import { Delete } from "@mui/icons-material";
import Header from "../Components/Header";
import { DialogContextProvider, useDialog } from "../Context/DialogContext";
import DataTable from "../Components/DashBoardTable";
import AlertDialogSlide from "../Components/Dialog";
import Footer from "../Components/Footer";

const Admin = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sampleData, setSampleData] = useState([]);

  useEffect(() => {
    async function getAll() {
      const response = await axios.get("http://localhost:5000/");
      // console.log(response.data);
      setSampleData(response.data);
    }
    getAll();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const style = {
    width: "80%",
    margin: "10%",
    marginTop: "3rem",
  };

  return (
    <>
      <Header />
      <DialogContextProvider>
        <div style={style}>
          <h1 style={{ textAlign: "center" }}>Dashboard</h1>
          <DataTable
            data={sampleData}
            page={page}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
          <ButtoGrid />
        </div>
        <AlertDialogSlide />
      </DialogContextProvider>
      <Footer />
    </>
  );
};

export default Admin;

function ButtoGrid() {
  const { dispatch } = useDialog();
  async function download() {
    try {
      dispatch({ type: "loading" });
      const response = await axios.get(`http://localhost:5000/download`);
      const row = response.data.map((i) => [
        i.vendor,
        i.start.split("T")[0],
        i.end.split("T")[0],
        i.ammount,
        i.comment,
      ]);
      const csvHeader = ["vendor", "Start", "End", "Ammout", "Commnet"];
      const csvContent = `${csvHeader}\n${row.join("\n")}`;
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
      saveAs(blob, `Report.csv`);
      dispatch({ type: "loading_off" });
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  async function deleteall() {
    try {
      dispatch({ type: "loading" });
      await axios.delete(`http://localhost:5000/`);
      dispatch({ type: "loading_off" });
      window.location.reload();
    } catch (e) {
      dispatch({ type: "show_error" });
    }
  }

  const style = {
    display: "flex",
    align: "left",
    justifyContent: "right",
    margin: "2px",
  };

  const space = {
    margin: "10px",
  };

  return (
    <div style={style}>
      <div style={space}>
        <Button variant="contained" color="success" onClick={() => download()}>
          Download <DownloadIcon />
        </Button>
      </div>
      <div style={space}>
        <Button variant="contained" color="error" onClick={() => deleteall()}>
          Delete All <Delete />
        </Button>
      </div>
    </div>
  );
}
