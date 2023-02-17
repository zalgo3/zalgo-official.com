import {redirect} from 'next/navigation';

const Page = ({params}: {params: {slug: string}}) => {
    redirect(`/blog/${params.slug}`);
};

export default Page;
