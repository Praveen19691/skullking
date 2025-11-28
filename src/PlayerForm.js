import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

/**
 * Initial setup form for configuring game parameters
 * Allows users to set number of players (2-10) and rounds (2-10)
 * Navigates to game page with selected configuration
 */
function PlayerForm() {
  const [playerCount, setPlayerCount] = useState(2);
  const [roundCount, setRoundCount] = useState(10);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/game", { state: { playerCount, roundCount } });
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "60vh" }}
    >
      <Row className="w-100">
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Form onSubmit={handleSubmit} className="card">
            <h1 className="page-heading text-center mb-4">Skull King Setup</h1>

            <Form.Group className="mb-3" controlId="playerCount">
              <Form.Label>Player Count (2-10):</Form.Label>
              <Form.Control
                type="number"
                min={2}
                max={10}
                value={playerCount}
                onChange={(e) => setPlayerCount(Number(e.target.value))}
                required
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="roundCount">
              <Form.Label>Round Count (2-10):</Form.Label>
              <Form.Control
                type="number"
                min={2}
                max={10}
                value={roundCount}
                onChange={(e) => setRoundCount(Number(e.target.value))}
                required
              />
            </Form.Group>

            <div className="d-grid">
              <Button variant="primary" type="submit" size="lg">
                Start Game
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default PlayerForm;
