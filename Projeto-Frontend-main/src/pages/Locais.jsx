import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Table, Form, FormGroup, Label, Input, Container } from "reactstrap";

function Locais() {
    const [local, setLocal] = useState(null); // Controla o local selecionado para edição
    const [locais, setLocais] = useState([]);

    // Função para salvar ou adicionar local
    async function salvarLocal(local) {
        try {
            // Se o local tem id, estamos editando
            if (local.id) {
                await axios.put(`http://localhost:3006/locais/${local.id}`, local);
                alert("Local atualizado com sucesso!");
            } else {
                await axios.post("http://localhost:3006/locais", local);
                alert("Local adicionado com sucesso!");
            }
            listarLocais();
            setLocal(null); // Limpa o estado após salvar
        } catch (error) {
            alert("Erro ao salvar o local. Tente novamente.");
            console.error(error);
        }
    }

    // Função para listar todos os locais
    function listarLocais() {
        axios.get("http://localhost:3006/locais").then((resposta) => {
            setLocais(resposta.data);
        });
    }

    // Função para excluir local
    function excluirLocal(id) {
        axios.delete(`http://localhost:3006/locais/${id}`)
            .then(() => {
                listarLocais();
                alert("Local excluído com sucesso!");
            })
            .catch((error) => {
                alert("Erro ao deletar, tente novamente.");
                console.error(error);
            });
    }

    // Função para editar local
    function editarLocal(local) {
        setLocal({
            id: local.id,
            nomeLocal: local.nomeLocal,
            enderecoLocal: local.enderecoLocal,
            capacidadeLocal: local.capacidadeLocal,
        });
    }

    // Atualizar valores dos campos do local
    function onChangeLocal(campo, valor) {
        setLocal((prevLocal) => ({
            ...prevLocal,
            [campo]: valor,
        }));
    }

    // useEffect para listar locais ao montar o componente
    useEffect(() => {
        listarLocais();
    }, []);

    // Formulário para adicionar ou editar local
    function Formulario() {
        return (
            <Container className="mt-5 mb-5 mx-auto">
                <h3>{local?.id ? "Editar Local" : "Adicionar Local"}</h3>
                <Form onSubmit={(e) => { e.preventDefault(); salvarLocal(local); }}>
                    <div className="container mt-5 mb-5 mx-auto">
                        <FormGroup>
                            <Label for="nomeLocal">Nome do Local</Label>
                            <Input
                                type="text"
                                id="nomeLocal"
                                name="nomeLocal"
                                value={local?.nomeLocal || ""}
                                onChange={(e) => onChangeLocal("nomeLocal", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="enderecoLocal">Endereço do Local</Label>
                            <Input
                                type="text"
                                id="enderecoLocal"
                                name="enderecoLocal"
                                value={local?.enderecoLocal || ""}
                                onChange={(e) => onChangeLocal("enderecoLocal", e.target.value)}
                            />
                        </FormGroup>
                        <FormGroup>
                            <Label for="capacidadeLocal">Capacidade do Local</Label>
                            <Input
                                type="number"
                                id="capacidadeLocal"
                                name="capacidadeLocal"
                                value={local?.capacidadeLocal || ""}
                                onChange={(e) => onChangeLocal("capacidadeLocal", e.target.value)}
                            />
                        </FormGroup>

                        <div className="row mt-3">
                            <div className="col">
                                <Button color="primary" type="submit" block>
                                    {local?.id ? "Salvar Alterações" : "Adicionar Local"}
                                </Button>
                            </div>
                            <div className="col">
                                <Button color="secondary" onClick={() => setLocal(null)} block>
                                    Cancelar
                                </Button>
                            </div>
                        </div>
                    </div>
                </Form>
            </Container>
        );
    }

    // Listagem de locais
    function Lista() {
        return (
            <Container className="mt-5">
                <h3>Locais</h3>
                <Button color="success" className="mb-3 mr-3" onClick={() => setLocal({})}>
                    Adicionar Local
                </Button>
                <Table striped>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome do Local</th>
                            <th>Endereço do Local</th>
                            <th>Capacidade do Local</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locais.map((local) => (
                            <tr key={local.id}>
                                <td>{local.id}</td>
                                <td>{local.nomeLocal}</td>
                                <td>{local.enderecoLocal}</td>
                                <td>{local.capacidadeLocal}</td>
                                <td>
                                    <Button color="warning" className="mr-3" onClick={() => editarLocal(local)}>
                                        Editar
                                    </Button>{" "}
                                    <Button color="danger" className="ml-3" onClick={() => excluirLocal(local.id)}>
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

    // Exibe o formulário de adicionar ou editar ou a lista de locais
    return local ? Formulario() : Lista();
}

export default Locais;
