import * as React from "react";

export default function ProblemStatement() {
  return (
    <div className="problems">
      <center>
        <h1>Problems Doctor face</h1>
      </center>
      <div className="grid">
        <div className="problem">
          <p>Long time reading patient records and data</p>
        </div>
        <div className="problem">
          <p>
            Finding it difficult to enter data, especially for those who do not
            like computers
          </p>
        </div>
        <div className="problem">
          <p>There is no source to quickly verify questionable information</p>
        </div>
        <div className="problem">
          <p>CRUDS operations are inaccurate</p>
        </div>
      </div>
    </div>
  );
}
