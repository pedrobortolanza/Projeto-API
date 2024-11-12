import { Navbar, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';

function Header() {
    return (
        <header className="w-100 bg-light-purple p-3">
            <Navbar expand="md" className="d-flex justify-content-between align-items-center">
                <NavbarBrand href="/" className="text-white font-weight-bold" style={{ fontSize: '30px' }}>
                    Eventos
                </NavbarBrand>
                <Nav className="ml-auto">
                    <NavItem>
                        <NavLink href="/eventos" className="text-white font-weight-bold">
                            Eventos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/ingressos" className="text-white font-weight-bold">
                            Ingressos
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/participantes" className="text-white font-weight-bold">
                            Participantes
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/locais" className="text-white font-weight-bold">
                            Locais
                        </NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </header>
    );
}

export default Header;
