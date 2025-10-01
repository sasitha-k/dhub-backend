import { Cookies } from "react-cookie";

export const getCookie = (cname) => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export function getToken() {
  return Cookies.get("token");
}

export const formatCamelCase = (str) => {
  if (!str) return "";

  return str
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

export const reactSelectStyles = {
  control: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // text-sm
  }),
  input: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // text-sm
  }),
  multiValue: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // text-sm
    backgroundColor: "black",
    color: "white",
  }),
  multiValueLabel: (provided) => ({
    ...provided,
    fontSize: "0.875rem", // text-sm
    color: "white",
  }),
  option: (provided, state) => ({
    ...provided,
    fontSize: "0.875rem", // text-sm
    backgroundColor: state.isSelected ? "black" : "white",
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: "black",
      color: "white",
    },
  }),
  multiValueRemove: (provided) => ({
    ...provided,
    color: "white",
    ":hover": {
      backgroundColor: "black",
      color: "white",
    },
  }),
};
