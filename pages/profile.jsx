import Layout from '../components/layout'
import { getCookie } from 'cookies-next';
import Link from 'next/link'
import clientPromise from "../lib/mongodb";

export default function ProfilePage( {username, created} ) {
    return (
        <Layout pageTitle="Profile">
            <Link href="/">Home</Link><br/>
            {/* <h2>{username}'s Profile</h2>
            <p>Account created at <strong>{created}</strong></p> */}
            
            <div className="center">
                
            <h1>Welcome <span className='bg-success rounded-5  p-2' >  {username}'s</span></h1>
            <h2>It's your Profile</h2>
            <h3 className='mt-3'>Your account created at <strong>{created}</strong></h3>


            <div className="">
                <Link href="/" >

                <button className='btn btn-danger btn-lg'>
                    Home
                    </button>
                </Link>
            </div>

            </div>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    var username = getCookie('username', { req, res });
    if (username == undefined){
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    const client = await clientPromise;
    const db = client.db("Users");
    const users = await db.collection("Profiles").find({"Username": username}).toArray();
    const userdoc = users[0]
    const created = userdoc['Created']
    return {
      props: {username: username, created: created},
    }
}