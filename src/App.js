import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {

  const [sueldo, setSueldo] = useState();
  const [ahorro, setAhorro] = useState();

  const [diezporciento, setDiezporciento] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [impuesto, setImpuesto] = useState(0);

  const callApi = (async () => {
    const response = await fetch(`http://192.81.214.49:8085/rest/msdxc/dxc?ahorro=${ahorro}&sueldo=${sueldo}`,{
      headers: {
        "Content-Type": "application/json"
     }    
    });
    let data = await response.json()
    console.log(`http://192.81.214.49:8085/rest/msdxc/dxc?ahorro=${ahorro}&sueldo=${sueldo}`);
    console.log(JSON.stringify(data));
    setDiezporciento(data.dxc);
    setSaldo(data.saldo);
    setImpuesto(data.impuesto);

  });
  const onInputAhorro = ({target:{value}}) => setAhorro(value);
  const onInputSueldo = ({target:{value}}) => setSueldo(value);


  return (
    <Container className="p-3">
      <Row>
        <Col xs={4}>
          <label htmlFor="ahorro">Ahorro</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="iMonto" onChange={onInputAhorro} value={ahorro}  aria-label="Monto Ahorrado  en Pesos" />
          </InputGroup>

          <label htmlFor="sueldo">Sueldo</label>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text>$</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl id="iAhorro" onChange={onInputSueldo}  value={sueldo} aria-label="Monto Sueldo en Pesos" />
          </InputGroup>

          <Button variant="primary" type="submit" onClick={callApi} >
            Enviar
            </Button>
        </Col>
        <Col xs={8} style={{ padding: 10 }}>
          <Card
            bg={'primary'}
            text={'light'}
          >
            <Card.Body>
              <Card.Title> Resultado Calculo 10% </Card.Title>
              <Card.Text id="diez">
                10% : {diezporciento}
              </Card.Text>
              <Card.Text id="saldo">
                Saldo : {saldo}
              </Card.Text>
              <Card.Text id="impuesto">
                Impuesto : {impuesto}
              </Card.Text>
            </Card.Body>
          </Card>

        </Col>
      </Row>

    </Container>
  );
}

export default App;
