import Head from "next/head";
import React, { useEffect, useState } from "react";
import { GrEmoji } from "react-icons/gr";
import { AiTwotoneHome } from "react-icons/ai";
import { FaFacebook, FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { MdNotifications } from "react-icons/md";
import Router from "next/router";
import { useUser } from "../lib/hooks";
import Link from "next/link";
import { useRouter } from "next/router";

const teamMembers = [
  {
    name: "Member One",
    role: "CEO",
    linkedIn: "https://www.linkedin.com/in/member-one/",
  },
  {
    name: "Member Two",
    role: "CTO",
    linkedIn: "https://www.linkedin.com/in/member-two/",
  },
  {
    name: "Member Three",
    role: "Lead Developer",
    linkedIn: "https://www.linkedin.com/in/member-three/",
  },
];

export default function Layout({ children }) {
  const [user, { mutate }] = useUser();
  const [loading, isLoading] = useState(false);
  const router = useRouter();
  const handleLogout = async () => {
    isLoading(true);
    await fetch("/api/auth", {
      method: "DELETE",
    });
    // set the user state to null
    mutate(null);
    isLoading(false);
    router.push("/");
  };
  return (
    <>
      <Head>
        <title>Patientcare - Revolutionizing Medical File Management</title>
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-0evHe/X+R7YkIZDRvuzKMRqM+OrBnVFBL6DOitfPri4tjfHxaWutUpFmBp4vmVor"
          crossOrigin="anonymous"
        />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-pprn3073KE6tl6bjs2QrFaJGz5/SUsLqktiwsUTF55Jfv3qYSDhgCecCxMW52nD2"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">
              Patientcare
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" href="/">
                    <a style={{ color: "#949585" }}>Home</a>
                  </Link>
                </li>
                <li>
                  <a
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                  >
                    About Us
                  </a>
                </li>
              </ul>
              {user && (
                <button className="btn btn-primary" onClick={handleLogout}>
                  Logout
                </button>
              )}
            </div>
          </div>
        </nav>
      </header>
      <main className="d-flex justify-content-center align-items-center">
        <div className="container mx-auto my-3 h-100">
          <div className="row">
            <div className="col-sm-12">{children}</div>
          </div>
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  About Patientcare
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <a className="navbar-brand" href="/">
                  <img
                    src="/Images/logo.png"
                    alt="Patientcare Logo"
                    style={{ height: "450px" }}
                  />
                </a>
                <br />
                Patientcare is revolutionizing the way medical records are
                managed and accessed. With our platform, healthcare providers
                can create, manage, and access patient files online with
                unprecedented ease. Each patient file is linked to a unique QR
                code, allowing for instant access with a simple scan. This
                system not only enhances the efficiency of medical record
                management but also significantly improves patient care by
                ensuring that critical information is readily available when
                needed.
                <br />
                <h3>Our Team</h3>
                <div className="team-members">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="team-member">
                      <h3>{member.name}</h3>
                      <p>{member.role}</p>
                      <a
                        href={member.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        LinkedIn
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <style jsx>{`
        .our-team-section {
          padding: 20px;
          text-align: center;
        }
        .team-member {
          margin: 10px;
          padding: 10px;
        }
        .container {
          height: 85vh;
        }
        main {
          min-height: 85vh;
        }
      `}</style>
    </>
  );
}
