function TaskForm() {

  const handleSubmit = (event) => {
    event.preventDefault();
    const recipients = document.getElementById("compose-recipients").value;
    const subject = document.getElementById("compose-subject").value;
    const body = document.getElementById("compose-body").value;
    console.log("Recipients:", recipients);
    console.log("Subject:", subject);
    console.log("Body:", body);

    fetch("/test", {
      method: "POST",
      body: JSON.stringify({
        recipients: recipients,
        subject: subject,
        body: body,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        document.getElementById("compose-form").reset();
      })
      .catch((error) => console.error("El error es: " + error));
  };

  return (
    <form id="compose-form" onSubmit={handleSubmit}>
      <div className="form-group">
        To: <input id="compose-recipients" className="form-control" placeholder="Recipients" name="recipients" />
      </div>
      <div className="form-group">
        <input className="form-control" id="compose-subject" placeholder="Subject" name="subject" />
      </div>
      <textarea className="form-control" id="compose-body" placeholder="Body" name="body"></textarea>
      <div id="divButton" className="d-grid gap-2 d-md-flex justify-content-md-end">
        <input type="submit" id="send" value="Send" className="btn btn-primary" />
      </div>
    </form>
  );
}

export default TaskForm;