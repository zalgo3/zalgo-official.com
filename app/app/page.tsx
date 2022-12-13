"use client";

import Link from "next/link";
import { Button } from "@fluentui/react-components";

const Page = () => {
  return (
    <>
      <h1>ざるご / 田辺広樹</h1>
      <Button>
        <Link href="/blog">ブログ</Link>
      </Button>
    </>
  );
};

export default Page;
