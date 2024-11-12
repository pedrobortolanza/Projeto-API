import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form, FormGroup, Label, Input, Container } from "reactstrap";

function Participantes() {
    const [participante, setParticipante] = useState(null); // Controla o participante selecionado para edição
    const [participantes, setParticipantes] = useState([]);
    const header = ['ID', 'Nome do Participante', 'CPF Participante', "Data do Evento", "Ações"]

    // Função para salvar ou adicionar participante
    async function salvarParticipante(participante) {
        try {
            // Se o participante tem id, estamos editando
            if (participante.id) {
                await axios.put(`http://localhost:3006/participantes/${participante.id}`, participante);
                alert("Evento atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3006/participantes", participante);
                alert("Evento adicionado com sucesso!");
            }
            listarParticipantes();
            setParticipante(null); // Limpa o estado após salvar
        } catch (error) {
            alert("Erro ao salvar o Participante. Tente novamente.");
            console.error(error);
        }
    }

    // Função para listar todos os participante
    function listarParticipantes() {
        axios.get("http://localhost:3006/participantes").then((response) => {
            setParticipantes(response.data);
        });
    }

    // Função para excluir participante
    function excluirParticipante(id) {
        axios.delete(`http://localhost:3006/participantes/${id}`)
            .then(() => {
                listarParticipantes();
                alert("Participante excluído com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao deletar, tente novamente.");
                console.error(error);
            });
    }

    // Função para editar participante
    function editarParticipante(participante) {
        setParticipante({
            id: participante.id,
            nomeParticipante: participante.nomeParticipante,
            cpfParticipante: participante.cpfParticipante,
            dataEmissao: participante.dataEmissao,
        });
    }

    // Atualizar valores dos campos do participante
    function onChangeParticipante(campo, valor) {
        setParticipante((prevIngresso) => ({
            ...prevIngresso,
            [campo]: valor,
        }));
    }

    // useEffect para listar participantes ao montar o componente
    useEffect(() => {
        listarParticipantes();
    }, []);

    // Formulário para adicionar ou editar participante
    function Formulario() {
        return (
            <Container className="mt-5 mb-5 mx-auto">
                <h3>{participante?.id ? "Editar Evento" : "Adicionar Evento"}</h3>
                <Form onSubmit={(e) => { e.preventDefault(); salvarParticipante(participante); }}>
                    <div className="container mt-5 mb-5 mx-auto">
                        <FormGroup>
                            <Label for="nomeParticipante">Nome do Particiopante</Label>
                            <Input
                                type="text"
                                id="nomeParticipante"
                                name="nomeParticipante"
                                value={participante?.nomeParticipante || ""}
                                onChange={(e) => onChangeParticipante("nomeParticipante", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="cpfParticipante">CPF do Participante</Label>
                            <Input
                                type="text"
                                id="cpfParticipante"
                                name="cpfParticipante"
                                value={participante?.cpfParticipante || ""}
                                onChange={(e) => onChangeParticipante("cpfParticipante", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dataEmissao">Data da Emissao</Label>
                            <Input
                                type="date"
                                id="dataEmissao"
                                name="dataEmissao"
                                value={participante?.dataEmissao || ""}
                                onChange={(e) => onChangeParticipante("dataEmissao", e.target.value)}
                            />
                        </FormGroup>

                        {/* Utilizando Row e Col para separar os botões corretamente */}
                        <div className="row mt-3">
                            <div className="col">
                                {/* Botão Salvar */}
                                <Button color="primary" type="submit" block>
                                    {participante?.id ? "Salvar Alterações" : "Adicionar Participante"}
                                </Button>
                            </div>
                            <div className="col">
                                {/* Botão Cancelar */}
                                <Button color="secondary" onClick={() => setParticipante(null)} block>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }

    // Listagem de participantes
    function Lista() {
        return (
            <Container className="mt-5">
                <h3>Participantes</h3>
                <Button color="success" className="mb-3 mr-3" onClick={() => setParticipante({})}>
                    Adicionar Participante
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            {header.map((col, index) => {
                                return (
                                    <th key={index}>{col}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {participantes.map((participante) => (
                            <tr key={participante.id}>
                                <td>{participante.id}</td>
                                <td>{participante.nomeParticipante}</td>
                                <td>{participante.cpfParticipante}</td>
                                <td>{new Date(participante.dataEmissao).toLocaleDateString()}</td>
                                <td>
                                    <Button color="warning" className="mr-3" onClick={() => editarParticipante(participante)}>
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" className="ml-3" onClick={() => excluirParticipante(participante.id)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        );
    }

    // Exibe o formulário de adicionar ou editar ou a lista de participantes
    return participante ? Formulario() : Lista();
}

export default Participantes;