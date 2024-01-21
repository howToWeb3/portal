import dataBlog from 'assets/fake-data/data-blog';
import BlogList from 'components/blog/BlogList';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import React from 'react';

function Blog(props) {
    return (
        <div className="wrapper">
            <PageTitle title="Blog List" />

            <BlogList data={dataBlog} />

            <Footer />
        </div>
    );
}

export default Blog;
