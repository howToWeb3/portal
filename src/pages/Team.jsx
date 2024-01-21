import dataTeam from 'assets/fake-data/dataTeam';
import Create from 'components/create/Create';
import Footer from 'components/footer/Footer';
import PageTitle from 'components/pagetitle/PageTitle';
import Team2 from 'components/team/Team2';
import React from 'react';

function Team(props) {
    return (
        <div className="page-team wrapper">
            <PageTitle title="Our Team" />

            <Team2 data={dataTeam} />

            <Create />

            <Footer />
        </div>
    );
}

export default Team;
