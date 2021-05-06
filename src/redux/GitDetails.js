import { useSelector } from "react-redux";

function GitDetails() {
  const data = useSelector((state) => state);
  return (
    <>
      <div className="section">
        <fieldset
          style={{
            width: "100%",
            textAlign: "justify",
          }}
        >
          <legend>Details</legend>
          <table className="table">
            <thead>
              <tr>
                <th>Url</th>
                <th>Name</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {data
                ? data.map((i, j) => (
                    <tr key={j}>
                      <td>
                        <a href={i.html_url} target="_blank">
                          {i.html_url}
                        </a>
                      </td>
                      <td>{i.name}</td>
                      <td>{i.description}</td>
                    </tr>
                  ))
                : "loading..."}
            </tbody>
          </table>
          <ul></ul>
        </fieldset>
      </div>
    </>
  );
}

export default GitDetails;
