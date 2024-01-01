import Link from "next/link";
import Image from "next/image";

//Unlike in many other React projects, in NextJS you have to access 'src' property.
import LogoImg from "@/assets/logo.png";
import classes from './header.module.css';
import HeaderBackground from "@/components/header/header-background";
import NavLink from "@/components/header/nav-link";


export default function Header() {
    return(
        <>
            <HeaderBackground />

            <header className={classes.header}>
                <Link className={classes.logo} href="/">
                    <Image src={LogoImg} alt="A plate" priority />
                    NextLevel Food
                </Link>

                <nav className={classes.nav}>
                    <ul>
                        <li>
                            <NavLink href={'/meals'}>Share Meal</NavLink>
                        </li>
                        <li>
                            <NavLink href={'/community'}>Foodies Community</NavLink>
                        </li>
                    </ul>
                </nav>
            </header>
        </>

)
}