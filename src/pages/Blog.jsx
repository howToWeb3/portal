import BlogList from 'components/blog/BlogList';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import { LINKS } from 'constants/common';
import React, { useEffect, useState } from 'react';

function Blog() {
    const [
        data,
        setData,
    ] = useState([]);

    useEffect(() => {
        getBlogList();
    }, []);

    const getBlogList = async () => {
        const data = await fetch(`${LINKS.CDN}/locales/en/blogs.json`).then(res => res.json());
        setData(data);
    };

    return (
        <div className="wrapper">
            <PageTitle title="Blog List" />

            <BlogList data={data.items} />

            <Footer />
        </div>
    );
}

export default Blog;
