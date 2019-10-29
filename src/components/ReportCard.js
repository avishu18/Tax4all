import React from 'react'
import { Card } from 'react-bootstrap'


class ReportCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { }
    }
    render() {
        const { report } = this.props;
        return (
            <Card className="report">
                <Card.Img variant="top" src={report.img} />
                <Card.Body>
                    <Card.Title>{report.name}</Card.Title>
                    <Card.Text>
                        {report.desc}
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}




export default ReportCard;
