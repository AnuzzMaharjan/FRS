import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <>
        <h1>Page Not found</h1>
        <Link to='/'> Go back to the home page!!</Link>
        </>
    )
}