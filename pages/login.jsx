import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import Login from "../public/Images/login_img_1.png";
import Image from "next/image";

export default function LoginPage({ username }) {
  const router = useRouter();
  const { msg } = router.query;
  return (
    <Layout pageTitle="Login">
      <br />
      {msg ? <h3 className="red">{msg}</h3> : <></>}

      <div className="container">
        <div className="row">
          <div className="col-lg-12 ">
            <h1 className="h center ">Login Page</h1>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <form action="/api/login" method="POST">
              <h1 className="h center "></h1>
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  minLength="3"
                  name="username"
                  id="username"
                  type="text"
                  className="form-control "
                  placeholder="Enter your username"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  minLength="5"
                  name="password"
                  id="password"
                  type="password"
                  className="form-control "
                  placeholder="Enter your password"
                  required
                />
              </div>
              <br />
              <button className="btn  btn-success ">
                <input
                  style={{ border: "none", background: "#198754" }}
                  type="submit"
                  value="Login"
                />
              </button>

              <Link style={{ textDecoration: "none", color: "black" }} href="/">
                <button className="btn btn-secondary float-end   ">
                  Visit Home page
                </button>
              </Link>
            </form>
          </div>

          <div className="col-lg-6">
            <Image
              src={Login}
              width={650}
              height={450}
              className="img-fluid bounce-top"
              alt="img"
              priority
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const req = context.req;
  const res = context.res;
  var username = getCookie("username", { req, res });
  if (username != undefined) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
  return { props: { username: false } };
}
