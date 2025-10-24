import Nav from "react-bootstrap/Nav";
const Navbar = () => {
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link href="/" className="nav-item ">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link href="/create-blog" className="nav-item ">
          Write post
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};
export default Navbar;
