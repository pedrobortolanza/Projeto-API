import Header from "./Header";
import Footer from "./Footer";
import { Container } from "reactstrap";

function Layout(props) {
    return (
        <>
            <Header />
            <main className="min-h-screen">
                <Container>{props.children}</Container>
            </main>
            <Footer />
        </>
    );
}

export default Layout;
