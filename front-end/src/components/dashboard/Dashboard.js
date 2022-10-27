import React,{Fragment} from 'react';


import Accordion from 'react-bootstrap/Accordion';

const Dashboard = () => {
    return (
        <Fragment>
            <section>
                <h1>My name is juboraz  </h1>

                <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Accordion Item #1</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                        <Accordion.Header>Accordion Item #3</Accordion.Header>
                        <Accordion.Body>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                        eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </section>
        </Fragment>
    );
};

export default Dashboard;