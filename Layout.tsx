import { Container, Card, CardContent } from "@mui/material";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Container maxWidth="md">
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  );
};

export default Layout;
