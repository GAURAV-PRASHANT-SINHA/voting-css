import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { useEffect } from "react";

import { resetErrAction } from "../../redux/slices/globalActions/globalActions";

const ErrorMsg = ({ message }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: message,
    }).then(() => {
      // Dispatch resetErrAction only after the alert is closed
      dispatch(resetErrAction());
    });
  }, [dispatch, message]);

  return null; // No need to render anything
};

export default ErrorMsg;
