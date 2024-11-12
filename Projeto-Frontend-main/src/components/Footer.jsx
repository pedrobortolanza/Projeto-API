import { Container, Row, Col, Nav, NavItem, NavLink } from 'reactstrap';

function Footer() {
    return (
        <footer className="bg-light-purple text-white py-5">
            <Container>
                <Row className="justify-content-between align-items-center">
                    <Col md={4} className="mb-4 mb-md-0">
                        <h3 className="font-weight-bold">Eventos</h3>
                    </Col>

                    <Col md={4} className="mb-4 mb-md-0">
                        <Nav className="justify-content-center">
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Sobre</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Serviços</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Contato</NavLink>
                            </NavItem>
                        </Nav>
                    </Col>

                    <Col md={4} className="mb-4 mb-md-0">
                        <div className="d-flex justify-content-center">
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Facebook</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Twitter</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="#" className="text-white hover:text-gray-300">Instagram</NavLink>
                            </NavItem>
                        </div>
                    </Col>
                </Row>

                <div className="text-center mt-4 text-gray-500">
                    <p className="text-sm">
                        &copy; {new Date().getFullYear()} Eventos. Todos os direitos reservados.
                    </p>
                </div>
            </Container>
        </footer>
    );
}

export default Footer;
