function Forms() {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <h4>Forms</h4>
      <div className="section">
        <form style={{ width: "100%" }} onSubmit={handleSubmit}>
          <fieldset
            style={{
              width: "60%",
              margin: "auto",
              marginBottom: "2%",
              textAlign: "end",
            }}
          >
            <legend>Personal Details</legend>
            <input
              className="fields"
              type="text"
              id="firstname"
              placeholder="Firstname"
              name="firstname"
              required
            />

            <input
              className="fields"
              type="text"
              id="lastname"
              placeholder="Lastname"
              name="lastname"
              required
            />

            <input
              className="fields"
              type="email"
              id="email"
              placeholder="Email"
              name="email"
              required
            />

            <input
              className="fields"
              type="tel"
              id="tel"
              placeholder="Mobile"
              name="tel"
              minLength="10"
              required
              pattern="[0-9]+"
            />

            <input
              className="fields"
              type="address"
              id="address"
              placeholder="Address"
              name="address"
              required
            />

            <input type="submit" className="buttons" style={{ width: "20%" }} />
          </fieldset>
        </form>
      </div>
    </>
  );
}

export default Forms;
