import Header from '../header';
import SocialLinks from '../social-links';

const Layout = ({children}: {children: React.ReactNode}) => {
    return (
        <>
            <Header />
            <SocialLinks />
            <main>{children}</main>
        </>
    );
};

export default Layout;
