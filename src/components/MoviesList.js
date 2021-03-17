import React from "react";
import {Avatar, Button, Card, Col, Comment, Descriptions, Modal, Row, Form, Input} from "antd";

const MoviesList = ({ movies }) => {
    const [modal1Visible, setModal1Visible] = React.useState(false);
    const [modal2Visible, setModal2Visible] = React.useState(false);
    const [omdbId, setOmdbId] = React.useState([]);
    const [movie, setMovie] = React.useState([]);

    React.useEffect(() => {
        const getData = async () => {
                const data = await fetch(
                    `http://www.omdbapi.com/?apikey=d2355bc&i=${omdbId}`
                );
                const response = await data.json();
                setMovie(response);
        };

        getData();
    }, [omdbId]);

    const handleClose = () => {
        setModal1Visible(false);
        setModal2Visible(false);
    };

    const handleViewMore = (movieId) => {
        console.log("movieId", movieId);
        setOmdbId(movieId);
        setModal1Visible(true);
    };

    const handleAddComment = () => {
        setModal2Visible(true);
    }

    return (
        <>
            <Row style={{ margin: "0 10%" }}>
                {movies.map((movie) => (
                    <Col span={8}>
                        <Card
                            hoverable
                            style={{ width: 280 }}
                            cover={<img alt="Imagen no encontrada" src={movie.Poster} />}
                            actions={[
                                <Button
                                    type="link"
                                    onClick={() => handleViewMore(movie.imdbID)}
                                >
                                    Ver más
                                </Button>, <Button
                                    type="link"
                                    onClick={handleAddComment}
                                >
                                    Añadir comentario
                                </Button>
                            ]}
                        >
                            <Card.Meta title={movie.Title} description={movie.Year} />
                        </Card>
                    </Col>
                ))}
            </Row>

            <Modal
                title="Información de la película"
                visible={modal1Visible}
                footer={[
                    <Button key="close" type="primary" onClick={handleClose}>
                        Cerrar
                    </Button>,
                ]}
            >
                {movie && (
                    <Descriptions bordered>
                        <Descriptions.Item label="Título:">
                            {movie.Title}
                        </Descriptions.Item>
                        <Descriptions.Item label="Año:">
                            {movie.Year}
                        </Descriptions.Item>
                        <br/>
                        <Descriptions.Item label="Comentarios:">
                            <Comment
                                actions={[<span key="comment-nested-reply-to">Responder</span>]}
                                author={<a>Andres</a>}
                                avatar={
                                    <Avatar
                                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                        alt="Andres"
                                    />
                                }
                                content={
                                    <p>
                                        Muy buena la película
                                    </p>
                                }
                            />
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>

            <Modal
                title="Comentario"
                visible={modal2Visible}
                footer={[
                    <Button key="submit" type="primary" onClick={handleClose}>
                        Enviar
                    </Button>, <Button key="close" type="primary" onClick={handleClose}>
                        Cerrar
                    </Button>,
                ]}
            >
                <Comment
                    avatar={
                        <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Andres"
                        />
                    }
                />
                <Form.Item>
                    <Input.TextArea id="change" rows={4}/>
                </Form.Item>
            </Modal>
        </>
    );
};
export default MoviesList;