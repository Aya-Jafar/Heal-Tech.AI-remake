import * as React from "react";

interface ServicesWrapperProps {}

export function ServicesWrapper(props: ServicesWrapperProps) {
  return (
    <div className="services">
      <center>
        <h1>Our Services</h1>
      </center>
      <div className="services-wrapper">
        <div>item1</div>
        <div>item2</div>
        <div>item3</div>
      </div>
    </div>
  );
}
