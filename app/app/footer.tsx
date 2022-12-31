import moment from 'moment';

/*
const NavBar = () => {
    return (
        <>
                <TabList>
                    <Tab value="home">
                        <Link as="a" href="/">
                            ホーム
                        </Link>
                    </Tab>
                    <Tab value="blog">
                        <Link as="a" href="/blog">
                            ブログ
                        </Link>
                    </Tab>
                    <Tab value="SNS">
                        <Menu>
                            <MenuTrigger disableButtonEnhancement>
                                <Button>SNS</Button>
                            </MenuTrigger>
                            <MenuPopover>
                                <MenuList>
                                    <MenuItem>
                                        <Link
                                            as="a"
                                            href="https://www.twitter.com/zalgo3"
                                        >
                                            Twitter (@zalgo3)
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            as="a"
                                            href="https://www.twitter.com/zalgo_video"
                                        >
                                            Twitter (@zalgo_video)
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            as="a"
                                            href="https://www.youtube.com/@zalgogame?sub_confirmation=1"
                                        >
                                            YouTube (ゲーム実況)
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            as="a"
                                            href="https://www.youtube.com/@zalgosing?sub_confirmation=1"
                                        >
                                            YouTube (歌ってみた)
                                        </Link>
                                    </MenuItem>
                                    <MenuItem>
                                        <Link
                                            as="a"
                                            href="https://www.nicovideo.jp/user/1473771/"
                                        >
                                            ニコニコ動画
                                        </Link>
                                    </MenuItem>
                                </MenuList>
                            </MenuPopover>
                        </Menu>
                    </Tab>
                </TabList>
        </>
    );
};
*/

const Footer = () => {
    const now = moment().format('YYYY');
    const years = now === '2018' ? now : `2018 - ${now}`;
    return (
        <>
        {/*
            <NavBar />
            */}
            © {years} Hiroki Tanabe
        </>
    );
};

export default Footer;
