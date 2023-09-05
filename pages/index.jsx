import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'

export default function HomePage( {username} ) {
    return (
      <Layout pageTitle="Home">
        <div className="center">
          {username ? (
            <>
              <h2>
                Hi{" "}
                <span className="text-warning bg-danger p-2 rounded-5  ">
                  {" "}
                  {username}
                </span>
              </h2>

              <Link href="/profile">
                <button className="btn btn-success btn-lg mt-4">Profile</button>
              </Link>
              <Link href="/api/logout">
                <button className="btn btn-warning btn-lg mt-4">Logout</button>
              </Link>
            </>
          ) : (
            <>
              <h2>Log in</h2>
             
              <Link href="/login">
                <button className="btn btn-success btn-lg mt-4">Login</button>
              </Link>
              <Link href="/signup">
                <button className="btn btn-warning btn-lg mt-4">Signup</button>
              </Link>
            </>
          )}
        </div>
      </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        username = false;
    }
    return { props: {username} };
};