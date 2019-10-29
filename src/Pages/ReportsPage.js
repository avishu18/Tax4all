import React from 'react'
import ReportNavbar from '../components/ReportNavbar'
import './ReportsPage.css';
import { Container, Row, Col, Button, Modal, Form, Image, Accordion, Card, Popover, OverlayTrigger } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import ReportCard from '../components/ReportCard'


class ReportsPage extends React.Component {
    constructor(props) {
        super(props);
        this.incomeInput=0;
        this.state = {
            personalDetails: { children: 0 },
            showModal: false,
            newReportImg: {
                file: null,
                URL: ""
            }
        }

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModalR = this.openModalR.bind(this);
        this.closeModalR = this.closeModalR.bind(this);
        this.createReport = this.createReport.bind(this);
        this.updatePersonalDetails = this.updatePersonalDetails.bind(this);



        this.fNameInput = React.createRef();
        this.lNameInput = React.createRef();
        this.iDInput = React.createRef();
        this.birthInput = React.createRef();
        this.maritalInput = React.createRef();
        this.addressInput = React.createRef();
        this.noOfChildrenInput = React.createRef();
        this.yearInput = React.createRef();
        this.workPlaceAInput = React.createRef();
        this.incomeAInput = React.createRef();
        this.lifeInsAInput = React.createRef();
        this.pensionAInput = React.createRef();
        this.paidTaxAInput = React.createRef();
        this.incomeBInput = React.createRef();
        this.lifeInsBInput = React.createRef();
        this.pensionBInput = React.createRef();
        this.paidTaxBInput = React.createRef();
        this.incomeInput = React.createRef();
        this.lifeInsInput = React.createRef();
        this.pensionInput = React.createRef();
        this.paidTaxInput = React.createRef();
        
    }

    
    openModal() {
        this.setState({ showModal: true })
    }

    closeModal() {
        this.setState({ showModal: false })
    }

    openModalR() {
        this.setState({ showModalR: true })
    }

    closeModalR() {
        this.setState({ showModalR: false })
    }


    updatePersonalDetails() {

        const personalDetails = {
            fName: this.fNameInput.current.value,
            lName: this.lNameInput.current.value,
            iD: this.iDInput.current.value,
            birth: this.birthInput.current.value,
            marital: this.maritalInput.current.value,
            address: this.addressInput.current.value,
            children: this.noOfChildrenInput.current.value,
        }

        this.setState({personalDetails});
        console.log({personalDetails});

    }

    createReport() {
        const {activeUser} = this.props;

        var incomeA = 0;
        if ( this.incomeAInput.current.value !== "") {
            incomeA = parseInt(this.incomeAInput.current.value);
        }
        var incomeB = 0;
        if ( this.incomeBInput.current.value !== "") {
            incomeB = parseInt(this.incomeBInput.current.value);
        }
        var income = incomeA + incomeB;

        var lifeInsA = 0;
        if ( this.lifeInsAInput.current.value !== "") {
            lifeInsA = parseInt(this.lifeInsAInput.current.value);
        }
        var lifeInsB = 0;
        if ( this.lifeInsBInput.current.value !== "") {
            lifeInsB = parseInt(this.lifeInsBInput.current.value);
        }
        var lifeIns = lifeInsA + lifeInsB;
        
        var pensionA = 0;
        if ( this.pensionAInput.current.value !== "") {
            pensionA = parseInt(this.pensionAInput.current.value);
        }
        var pensionB = 0;
        if ( this.pensionBInput.current.value !== "") {
            pensionB = parseInt(this.pensionBInput.current.value);
        }
        var pension = pensionA + pensionB;

        var paidTaxA = 0;
        if ( this.paidTaxAInput.current.value !== "") {
            paidTaxA = parseInt(this.paidTaxAInput.current.value);
        }
        var paidTaxB = 0;
        if ( this.paidTaxBInput.current.value !== "") {
            paidTaxB = parseInt(this.paidTaxBInput.current.value);
        }
        var paidTax = paidTaxA + paidTaxB;

        console.log(paidTax);

        var pensionDed=0;
        var grossTax=0;
        var maxDed = Math.min(income,85200)*0.07;
        var maxPensionDed = 85200*0.05;

        var lifeInsded = Math.min( lifeIns, maxDed-maxPensionDed)
        if (pension < maxDed) {
            pensionDed=pension*0.35;
        }  else {
            pensionDed=maxPensionDed*.35;
        } 

        var netIncome= income-pensionDed-lifeInsded

        var firstStep=74880
        var secondStep=107400
        var thirdStep=172320
        var forthStep=239520
        var fifthStep=498360
        var sixthStep=641880

        var firstPer=0.1
        var secondPer=0.14
        var thirdPer=0.2
        var forthPer=0.31
        var fifthPer=0.35
        var sixthPer=0.47

        if (netIncome<firstStep) {
            grossTax=netIncome*firstPer;
        } else if (netIncome<secondStep) {
            grossTax=firstStep*firstPer+(netIncome-firstStep)*secondPer
        } else if (netIncome<thirdStep) {
             grossTax=firstStep*firstPer+secondStep*secondPer+(netIncome-secondStep)*thirdPer
        } else if (netIncome<forthStep) {
             grossTax=firstStep*firstPer+secondStep*secondPer+thirdStep*thirdPer+(netIncome-thirdStep)*forthPer
        } else if (netIncome<fifthStep) {
             grossTax=firstStep*firstPer+secondStep*secondPer+thirdStep*thirdPer+forthStep*forthPer+(netIncome-forthStep)*fifthPer
        } else if (netIncome<sixthStep) {
             grossTax=firstStep*firstPer+secondStep*secondPer+thirdStep*thirdPer+forthStep*forthPer+fifthStep*fifthPer+(netIncome-fifthStep)*sixthPer
        } else grossTax=firstStep*firstPer+secondStep*secondPer+thirdStep*thirdPer+forthStep*forthPer+fifthStep*fifthPer+sixthStep*sixthPer+(netIncome-sixthStep)*0.5;

        var point=2580
        var taxRefund=0

        var children = 0;
        if ( this.state.personalDetails.children !== "" ) {
            children = parseInt(this.state.personalDetails.children);
        }
        console.log(children);

        var taxDed = (2.25 + children)*point

        var taxRefund = Math.floor( paidTax-grossTax-taxDed);

        console.log(taxDed);
        console.log(taxRefund);

        const newReport = {
            name: this.yearInput.current.value,
            desc: "החזר צפוי : " + taxRefund,
            //desc: this.income.current.value,
            //desc: this.pensionInput.current.value,
            //desc: this.paidTaxInput.current.value,
        }

        this.props.addReport(newReport);

        
        this.closeModalR();
    }

    render() {
        const { activeUser, handleLogout, reports } = this.props;
        const { showModal, showModalR, newReportImg } = this.state;
        //const showModal = this.state.showModal;

        if (!activeUser) {
            return <Redirect to="/" />
        }

        const reportsCards = reports.map(report => <Col key={report.id} lg="3" md="6"><ReportCard report={report} /></Col>)

        return (
            <div>
                <ReportNavbar activeUser={activeUser} handleLogout={handleLogout} />
                <Container>
                    
                    <div className="reports-header">
                        <h1>הדוחות של  {activeUser.fname}</h1>
                        <Button variant="primary" onClick={this.openModal}>עדכון פרטים אישיים</Button>
                    </div>
                    <div className="reports-header">
                        <Button variant="primary" onClick={this.openModalR}>דוח חדש</Button>
                    </div>
                    <Row>
                        {reportsCards}
                    </Row>
                </Container>

                <Modal show={showModal} onHide={this.closeModal} size="lg">
                    <Modal.Header >
                        <Modal.Title>עדכון פרטים אישיים</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={2}>
                                    שם פרטי
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.fNameInput} type="text" placeholder="שם פרטי" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    שם משפחה
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.lNameInput} type="text" placeholder="שם משפחה" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    מס. ת.ז.
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.iDInput} type="number" placeholder="מספר תעודת זהות" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                   תאריך לידה
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.birthInput} type="date" placeholder="תאריך לידה לועזי" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    מצב משפחתי
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.maritalInput} type="text" placeholder="מצב משפחתי" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    כתובת 
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.addressInput} type="text" placeholder="כתובת מלאה" />
                                </Col>
                            </Form.Group>

                            <Form.Group as={Row} controlId="formHorizontalPassword">
                                <Form.Label column sm={2}>
                                    מספר ילדים
                                </Form.Label>
                                <Col sm={10}>
                                    <Form.Control ref={this.noOfChildrenInput} type="number" placeholder="מספר ילדים עד גיל 18" />
                                </Col>
                            </Form.Group>

                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.closeModal}>
                            סגור
                        </Button>
                        <Button variant="primary" onClick={this.updatePersonalDetails}>
                            עדכן פרטים
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showModalR} onHide={this.closeModalR} size="lg">
                    <Modal.Header >
                        <Modal.Title>
                            <p>עדכון דוח חדש</p>
                                

                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group as={Row} controlId="formHorizontalEmail">
                                <Form.Label column sm={5}>
                                    שנת הדו"ח
                                </Form.Label>
                                <Col sm={7}>
                                    <Form.Control ref={this.yearInput} type="year" placeholder="שנה" />
                                </Col>
                            </Form.Group>

                            <Form.Label className="data" column sm={5}>
                                     הקלד נתונים מטופס 106
                            </Form.Label>

                            

                            <Form>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                       מקום העבודה
                                     </Form.Label>
                                     <Col sm={7}>
                                      <Form.Control ref={this.workPlaceAInput} type="text" placeholder="שם מקום העבודה" />
                                      </Col>
                                </Form.Group>
                            
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                     הכנסה ממשכורת
                                     </Form.Label>
                                     <Col sm={7}>
                                        <Form.Control ref={this.incomeAInput} type="number" placeholder="שדה 158 בטופס 106" />
                                     </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                      זיכוי - הפקדה לביטוח חיים
                                    </Form.Label>
                                    <Col sm={7}>
                                    <Form.Control ref={this.lifeInsAInput} type="number" placeholder="שדה 036 בטופס 106" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                     זיכוי - הפקדה לקצבה (פנסיה)
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control ref={this.pensionAInput} type="text" placeholder=" שדה 045 בטופס 106" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                        מס הכנסה ששולם 
                                    </Form.Label>
                                    <Col sm={7}>
                                     <Form.Control ref={this.paidTaxAInput} type="text" placeholder="שדה 042 בטופס 106" />
                                    </Col>
                                </Form.Group>

                            </Form>
                            <Accordion defaultActiveKey="0">
                            
                            <Card>
                                <Card.Header>
                                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                    במידה ועבדת במקום עבודה נוסף במהלך השנה לחץ כאן
                                </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                <p>
                                <Form.Label className="data" column sm={7}>
                                     הקלד נתונים מטופס 106 השני!
                            </Form.Label>

                            <Form>
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                       מקום העבודה
                                     </Form.Label>
                                     <Col sm={7}>
                                      <Form.Control ref={this.workPlaceBInput} type="text" placeholder="שם מקום העבודה" />
                                      </Col>
                                </Form.Group>
                            
                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                     הכנסה ממשכורת
                                     </Form.Label>
                                     <Col sm={7}>
                                        <Form.Control ref={this.incomeBInput} type="number" placeholder="שדה 158 בטופס 106" />
                                     </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                      זיכוי - הפקדה לביטוח חיים
                                    </Form.Label>
                                    <Col sm={7}>
                                    <Form.Control ref={this.lifeInsBInput} type="number" placeholder="שדה 036 בטופס 106" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                     זיכוי - הפקדה לקצבה (פנסיה)
                                    </Form.Label>
                                    <Col sm={7}>
                                        <Form.Control ref={this.pensionBInput} type="text" placeholder=" שדה 045 בטופס 106" />
                                    </Col>
                                </Form.Group>

                                <Form.Group as={Row} controlId="formHorizontalPassword">
                                    <Form.Label column sm={5}>
                                        מס הכנסה ששולם 
                                    </Form.Label>
                                    <Col sm={7}>
                                     <Form.Control ref={this.paidTaxBInput} type="text" placeholder="שדה 042 בטופס 106" />
                                    </Col>
                                </Form.Group>

                            </Form>   

                                </p>
                                </Accordion.Collapse>
                            </Card>
                            </Accordion>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        
                        <Button variant="secondary" onClick={this.closeModalR}>
                            סגור
                        </Button>
                        <Button variant="secondary" onClick={this.closeModal}>
                            חשב
                        </Button>
                        <Button variant="primary" onClick={this.createReport}>
                            הדפס דוח
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
}
export default ReportsPage;
