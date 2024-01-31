import * as React from "react";

interface ContactProps {}

export default function Contact(props: ContactProps) {
  return (
    <div className="about-us" id="contact">
      <div className="about-us-container">
        <center>
          <h1>Feel free to contact our team</h1>
          <form action="https://formspree.io/f/xrgwewpq" method="post">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                id="message"
                name="message"
                rows={5}
                cols={50}
                placeholder="Message..."
                required
              ></textarea>
            </div>

            <div className="send">
              <input
                type="submit"
                value="Send"
                className="btn"
                id="explore-btn"
              />
            </div>
          </form>
        </center>
      </div>
    </div>
  );
}
