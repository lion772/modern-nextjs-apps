import Link from "next/link";
import Image from "next/image";

//Unlike in many other React projects, in NextJS you have to access 'src' property.
import LogoImg from "@/assets/logo.png";
import classes from './header.module.css';
import HeaderBackground from "@/components/header/header-background";

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