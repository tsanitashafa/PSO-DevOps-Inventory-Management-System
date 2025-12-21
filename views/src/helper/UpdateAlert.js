import Swal from "sweetalert2";
import { UpdateRequest } from "../APIRequest/APIRequest";
export const UpdateToDo = (id, status) => {
  return Swal.fire({
    title: "Change Status?",
    input: "select",
    inputOptions: {
      New: "New",
      Completed: "Completed",
      "In-Progress": "In-Progress",
      Canceled: "Canceled",
    },
    inputValue: status,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, update it!",
  }).then((result) => {
    if (result.isConfirmed) {
      return UpdateRequest(id, result.value).then((res) => {
        if (res) {
          return true;
        } else {
          return false;
        }
      });
    }
  });
};
