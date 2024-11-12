import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form, FormGroup, Label, Input, Container } from "reactstrap";

function Ingressos() {
    const [ingresso, setIngresso] = useState(null); // Controla o ingresso selecionado para edição
    const [ingressos, setIngressos] = useState([]);

    // Função para salvar ou adicionar ingresso
    async function salvarIngresso(ingresso) {
        try {
            // Se o ingresso tem id, estamos editando
            if (ingresso.id) {
                await axios.put(`http://localhost:3006/ingressos/${ingresso.id}`, ingresso);
                alert("Ingresso atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3006/ingressos", ingresso);
                alert("Ingresso adicionado com sucesso!");
            }
            listarIngressos();
            setIngresso(null); // Limpa o estado após salvar
        } catch (error) {
            alert("Erro ao salvar o ingresso. Tente novamente.");
            console.error(error);
        }
    }

    // Função para listar todos os ingressos
    function listarIngressos() {
        axios.get("http://localhost:3006/ingressos").then((resposta) => {
            setIngressos(resposta.data);
        });
    }

    // Função para excluir ingresso
    function excluirIngresso(id) {
        axios.delete(`http://localhost:3006/ingressos/${id}`)
            .then(() => {
                listarIngressos();
                alert("Ingresso excluído com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao deletar, tente novamente.");
                console.error(error);
            });
    }

    // Função para editar ingresso
    function editarIngresso(ingresso) {
        setIngresso({
            id: ingresso.id,
            nomeEvento: ingresso.nomeEvento,
            nomeParticipante: ingresso.nomeParticipante,
            dataEmissao: ingresso.dataEmissao,
        });
    }

    // Atualizar valores dos campos do ingresso
    function onChangeIngresso(campo, valor) {
        setIngresso((prevIngresso) => ({
            ...prevIngresso,
            [campo]: valor,
        }));
    }

    // useEffect para listar ingressos ao montar o componente
    useEffect(() => {
        listarIngressos();
    }, []);

    // Formulário para adicionar ou editar ingresso
    function Formulario() {
        return (
            <Container className="mt-5 mb-5 mx-auto">
                <h3>{ingresso?.id ? "Editar Ingresso" : "Adicionar Ingresso"}</h3>
                <Form onSubmit={(e) => { e.preventDefault(); salvarIngresso(ingresso); }}>
                    <div className="container mt-5 mb-5 mx-auto">
                        <FormGroup>
                            <Label for="nomeEvento">Nome do Evento</Label>
                            <Input
                                type="text"
                                id="nomeEvento"
                                name="nomeEvento"
                                value={ingresso?.nomeEvento || ""}
                                onChange={(e) => onChangeIngresso("nomeEvento", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="nomeParticipante">Nome do Participante</Label>
                            <Input
                                type="text"
                                id="nomeParticipante"
                                name="nomeParticipante"
                                value={ingresso?.nomeParticipante || ""}
                                onChange={(e) => onChangeIngresso("nomeParticipante", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dataEmissao">Data de Emissão</Label>
                            <Input
                                type="date"
                                id="dataEmissao"
                                name="dataEmissao"
                                value={ingresso?.dataEmissao || ""}
                                onChange={(e) => onChangeIngresso("dataEmissao", e.target.value)}
                            />
                        </FormGroup>

                        {/* Utilizando Row e Col para separar os botões corretamente */}
                        <div className="row mt-3">
                            <div className="col">
                                {/* Botão Salvar */}
                                <Button color="primary" type="submit" block>
                                    {ingresso?.id ? "Salvar Alterações" : "Adicionar Ingresso"}
                                </Button>
                            </div>
                            <div className="col">
                                {/* Botão Cancelar */}
                                <Button color="secondary" onClick={() => setIngresso(null)} block>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>

            </Container>
        );
    }

    // Listagem de ingressos
    function Lista() {
        return (
            <Container className="mt-5">
                <h3>Ingressos</h3>
                <Button color="success" className="mb-3 mr-3" onClick={() => setIngresso({})}>
                    Adicionar Ingresso
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Evento</th>
                            <th>Nome do Participante</th>
                            <th>Data de Emissão</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ingressos.map((ingresso) => (
                            <tr key={ingresso.id}>
                                <td>{ingresso.id}</td>
                                <td>{ingresso.nomeEvento}</td>
                                <td>{ingresso.nomeParticipante}</td>
                                <td>{new Date(ingresso.dataEmissao).toLocaleDateString()}</td>
                                <td>
                                    <Button color="warning" className="mr-3" onClick={() => editarIngresso(ingresso)}>
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" className="ml-3" onClick={() => excluirIngresso(ingresso.id)}>
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

    // Exibe o formulário de adicionar ou editar ou a lista de ingressos
    return ingresso ? Formulario() : Lista();
}

export default Ingressos;
