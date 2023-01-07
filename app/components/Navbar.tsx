import Link from "next/link";
import { useEffect, useState } from "react";
import { GET_CURRENT_USER } from "../config/api-routes";
import { DASHBOARD, GOOGLE_AUTH_START, HISTORY, LOGOUT } from "../config/routes";

export const Navbar = () => {
    const [user, setUser] = useState<{
        id: string;
        name: string;
        picture: string;
        email: string;
        created_time: Date;
        last_token_generated_at: Date;
    } | null>(null)

    useEffect(() => {
        fetch(GET_CURRENT_USER, {
            credentials: 'include',
        }).then(e => e.json()).then(e => setUser(e.user))
    }, [])

    console.log(user)
    return (
        <div className="navbar  justify-between text-sm">
            <div className="">
                <Link href='/' className="btn btn-ghost normal-case text-lg"><img alt="" src="/images/logo.png"  width={200} height={200}></img></Link>
            </div>
            <div className="">
                <ul className="menu menu-horizontal px-1">


                    {!!user ? <>

                        <li className="flex hover:cursor-default">
                            <div className="flex hover:bg-base-100  hover:cursor-default">
                                <img className="w-6 avatar rounded-full" src="https://placeimg.com/80/80/people" />
                                <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
                                    Hi, {user.name.split(' ')[0]}!
                                </span>
                            </div>
                        </li>

                        <li><Link href={DASHBOARD}>Dashboard</Link></li>
                        <li><Link href={HISTORY}>History</Link></li>
                        <li><Link href={LOGOUT}>Logout</Link></li>
                    </> : <div className="">
                            <Link href={GOOGLE_AUTH_START} className='btn btn-sm lowercase'>SignIn with Google</Link>
                    </div>}
                </ul>
            </div>
        </div>
    )

}
