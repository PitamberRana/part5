const Notification = ({ msg, classStatus }) => {
  if (msg === null) {
    return null;
  }

  return (
    <div className={classStatus === "notify" ? "notify" : "error"}>{msg}</div>
  );
};
export default Notification;
