import moment from "moment";

export default function date(value) {
  return moment(value).format("L");
}
