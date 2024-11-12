import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form, FormGroup, Label, Input, Container } from "reactstrap";

function Eventos() {
    const [evento, setEvento] = useState(null); // Controla o evento selecionado para edição
    const [eventos, setEventos] = useState([]);
    const header = ['ID', 'Nome do Evento', 'Local do Evento', "Data do Evento", "Ações"]

    // Função para salvar ou adicionar evento
    async function salvarEvento(evento) {
        try {
            // Se o evento tem id, estamos editando
            if (evento.id) {
                await axios.put(`http://localhost:3006/eventos/${evento.id}`, evento);
                alert("Evento atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3006/eventos", evento);
                alert("Evento adicionado com sucesso!");
            }
            listarEventos();
            setEvento(null); // Limpa o estado após salvar
        } catch (error) {
            alert("Erro ao salvar o evento. Tente novamente.");
            console.error(error);
        }
    }

    // Função para listar todos os eventos
    function listarEventos() {
        axios.get("http://localhost:3006/eventos").then((response) => {
            setEventos(response.data);
        });
    }

    // Função para excluir evento
    function excluirEvento(id) {
        axios.delete(`http://localhost:3006/eventos/${id}`)
            .then(() => {
                listarEventos();
                alert("Evento excluído com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao deletar, tente novamente.");
                console.error(error);
            });
    }

    // Função para editar evento
    function editarEvento(evento) {
        setEvento({
            id: evento.id,
            nomeEvento: evento.nomeEvento,
            localEvento: evento.localEvento,
            dataEvento: evento.dataEvento,
        });
    }

    // Atualizar valores dos campos do evento
    function onChangeEvento(campo, valor) {
        setEvento((prevIngresso) => ({
            ...prevIngresso,
            [campo]: valor,
        }));
    }

    // useEffect para listar eventos ao montar o componente
    useEffect(() => {
        listarEventos();
    }, []);

    // Formulário para adicionar ou editar evento
    function Formulario() {
        return (
            <Container className="mt-5 mb-5 mx-auto">
                <h3>{evento?.id ? "Editar Evento" : "Adicionar Evento"}</h3>
                <Form onSubmit={(e) => { e.preventDefault(); salvarEvento(evento); }}>
                    <div className="container mt-5 mb-5 mx-auto">
                        <FormGroup>
                            <Label for="nomeEvento">Nome do Evento</Label>
                            <Input
                                type="text"
                                id="nomeEvento"
                                name="nomeEvento"
                                value={evento?.nomeEvento || ""}
                                onChange={(e) => onChangeEvento("nomeEvento", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="localEvento">Local do Evento</Label>
                            <Input
                                type="text"
                                id="localEvento"
                                name="localEvento"
                                value={evento?.localEvento || ""}
                                onChange={(e) => onChangeEvento("localEvento", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="dataEvento">Data do Evento</Label>
                            <Input
                                type="date"
                                id="dataEvento"
                                name="dataEvento"
                                value={evento?.dataEvento || ""}
                                onChange={(e) => onChangeEvento("dataEvento", e.target.value)}
                            />
                        </FormGroup>

                        {/* Utilizando Row e Col para separar os botões corretamente */}
                        <div className="row mt-3">
                            <div className="col">
                                {/* Botão Salvar */}
                                <Button color="primary" type="submit" block>
                                    {evento?.id ? "Salvar Alterações" : "Adicionar Evento"}
                                </Button>
                            </div>
                            <div className="col">
                                {/* Botão Cancelar */}
                                <Button color="secondary" onClick={() => setEvento(null)} block>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }

    // Listagem de eventos
    function Lista() {
        return (
            <Container className="mt-5">
                <h3>Eventos</h3>
                <Button color="success" className="mb-3 mr-3" onClick={() => setEvento({})}>
                    Adicionar Evento
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
                        {eventos.map((evento) => (
                            <tr key={evento.id}>
                                <td>{evento.id}</td>
                                <td>{evento.nomeEvento}</td>
                                <td>{evento.localEvento}</td>
                                <td>{new Date(evento.dataEvento).toLocaleDateString()}</td>
                                <td>
                                    <Button color="warning" className="mr-3" onClick={() => editarEvento(evento)}>
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" className="ml-3" onClick={() => excluirEvento(evento.id)}>
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

    // Exibe o formulário de adicionar ou editar ou a lista de eventos
    return evento ? Formulario() : Lista();
}

export default Eventos;
