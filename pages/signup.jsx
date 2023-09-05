import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import { useRouter } from 'next/router'
import Login from "../public/Images/Signup_img_1.png";
import Image from 'next/image';


export default function SignupPage( {username} ) {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Signup">
            {msg ?
                <h3 className="red">{msg}</h3>
            :
                <></>
            }
              <div className="container">
        <div className="row">
        <div className="row">
            <div className="col-lg-12 ">
              <h1 className="h center ">Signup Page</h1>
            </div>
            </div> <div className="row">
          <div className="col-lg-6">
            <form action="/api/signup" method="POST">
              <h1 className="h center "></h1>
                  <div className="mb-3">
                <label className="form-label">Email address</label>
                <input minLength="3" className="form-control " name="username" id="username" type="text" placeholder='Enter your username' required></input><br/>
                </div>
                  <div className="mb-3">
                <label className="form-label">Password</label>
                <input minLength="5" className="form-control " name="password" id="password" type="password" placeholder='Enter your password' required></input><br/>
                </div>
                  <div className="mb-3">
                <label className="form-label">Password Again</label>
                <input minLength="5" className="form-control " name="passwordagain" id="passwordagain" type="password" placeholder='Enter your password again' required></input><br/>
                </div>
                {/* <input type="submit" value="Signup"/> */}
                <button className="btn  btn-success ">
                <input
                  style={{ border: "none", background: "#198754" }}
                  type="submit"
                  value="Signup"
                />
              </button>

               <Link style={{ textDecoration: "none", color: "black" }} href="/">
                <button className="btn btn-secondary float-end   ">
                  Visit Home page
                </button>
              </Link>
            </form>
            </div>
            <div className="col-lg-6 center">
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
            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username != undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { props: {username:false} };
};