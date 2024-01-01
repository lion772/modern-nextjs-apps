import Link from "next/link";
//Unlike in many other React projects, in NextJS you have to access 'src' property.
import LogoImg from "@/assets/logo.png";
import classes from './header.module.css';

export default function Header() {
    return(
        <>
            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <img src={LogoImg.src} alt="A plate"/>
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <Link href="/meals">Meals</Link>
                        </li>
                        <li>
                            <Link href="/meals/share">Share Meal</Link>
                        </li>
                        <li>
                            <Link href="/community">Community</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <div className={classes.title}>
                <h1>Welcome to my brand-new NextJS project!</h1>
            </div>
        </>

)
}