import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = (props) => {

  const [sueldo, setSueldo] = useState();
  const [ahorro, setAhorro] = useState();

  const [diezporciento, setDiezporciento] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [impuesto, setImpuesto] = useState(0);

  const [isLoading, setIsLoading] = useState(false);


  const callApi = (async () => {
    setIsLoading(true);

    try {
      setIsLoading(true);
      const response = await fetch(`http://127.0.0.1:8085/rest/msdxc/dxc?ahorro=${ahorro}&sueldo=${sueldo}`, {
        headers: {
          "Content-Type": "application/json"
        }
      });
      let data = await response.json()
      console.log(`http://127.0.0.1:8085/rest/msdxc/dxc?ahorro=${ahorro}&sueldo=${sueldo}`);
      console.log(JSON.stringify(data));

      setDiezporciento(data.dxc);
      setSaldo(data.saldo);
      setImpuesto(data.impuesto);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(`Error ${error}`);
    }
  });

  const resetValues = (async () => {
    setIsLoading(true);

    setAhorro('');
    setSueldo('');

    setIsLoading(false);
  });

  const onInputAhorro = ({ target: { value } }) => setAhorro(value);
  const onInputSueldo = ({ target: { value } }) => setSueldo(value);


  return (
    <Container className="p-3">
      <Col>
        <Row>
          <Col xs={5}>
            <label htmlFor="ahorro">Ahorro</label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="iAhorro" onChange={onInputAhorro} value={ahorro} aria-label="Monto Ahorrado  en Pesos" />
            </InputGroup>

            <label htmlFor="sueldo">Sueldo</label>
            <InputGroup className="mb-3">
              <InputGroup.Prepend>
                <InputGroup.Text>$</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl id="iSueldo" onChange={onInputSueldo} value={sueldo} aria-label="Monto Sueldo en Pesos" />
            </InputGroup>

            <Row style={{ marginLeft: 2 }}>
              <Col xs={4}>
                <Button variant="primary" type="submit" id="btnSubmit" onClick={callApi} >
                  Enviar
              </Button>
              </Col>

              <Col xs={4}>
                <Button variant="primary" type="submit" id="btnReset" onClick={resetValues} >
                  Reset
              </Button>
              </Col>

              <Col xs={4}>
                {
                  isLoading ? (
                    <Spinner animation="border" role="status" >
                      <span className="sr-only">Loading...</span>
                    </Spinner>

                  ) : null
                }
              </Col>
            </Row>
          </Col>
          <Col xs={7} style={{ padding: 10 }}>
            <Card
              bg={'primary'}
              text={'light'}
            >
              <Card.Body>
                <Card.Title> Resultado Calculo 10% </Card.Title>
                <Card.Text>
                  10% : <span id="diez">{diezporciento}</span>
                </Card.Text>
                <Card.Text>
                  Saldo : <span id="saldo">{saldo}</span>
                </Card.Text>
                <Card.Text>
                  Impuesto : <span id="impuesto">{impuesto}</span>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Col>
    </Container>
  );
}

export default App;
