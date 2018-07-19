import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import { Input, SearchBtn } from "../../components/SearchForm";
import { List, ListItem } from "../../components/Results";
import SaveBtn from "../../components/SaveBtn";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";

class Articles extends Component {
    state = {
        articles: [],
        savedarticles: [],
        topic: "",
        startYear: "",
        endYear: ""
    };

    componentDidMount() {
        this.loadArticles();
    }

    loadArticles = () => {
        API.getArticles()
            .then(res =>
                this.setState({ savedarticles: res.data })
            )
            .catch(err => console.log(err));
    };

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSearch = event => {
        event.preventDefault();
        if (this.state.topic && this.state.startYear && this.state.endYear) {
            API.getArticlesAPI(
                this.state.topic,
                this.state.startYear,
                this.state.endYear
            )
                .then((res) => {
                    this.setState({ articles: res.data.response.docs });
                    console.log("this.state.articles: ", this.state.articles);
                });
        }
    };

    clickImage = (topic,url) => {

        console.log("topic", topic);
        console.log("url", url);

        API.saveArticle({
                topic: topic,
                date: Date.now,
                url: url
            })
                .then(res => this.loadArticles())
                .catch(err => console.log(err));

    }

    deleteArticle = id => {
        API.deleteArticle(id)
            .then(res => this.loadArticles())
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <Container fluid>
                    <Jumbotron>
                        <h1>New York Times Article  Scrubber</h1>
                    </Jumbotron>
                </Container>
                <Container >
                    <Row>
                        <Col size="md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">Panel heading without title</div>
                                <div class="panel-body">
                                    <form>
                                        <Input name="topic" value={this.state.topic} onChange={this.handleInputChange} placeholder="Topic (required)" />
                                        <Input name="startYear" value={this.state.stardate} onChange={this.handleInputChange} placeholder="Start Year (required)" />
                                        <Input name="endYear" value={this.state.enddate} onChange={this.handleInputChange} placeholder="End Year (required)" />
                                        <SearchBtn onClick={this.handleFormSearch}>Search</SearchBtn>
                                    </form>
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col size="md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">Panel heading without title</div>
                                <div class="panel-body">
                                    {this.state.articles.length ? (
                                        <List>
                                            {this.state.articles.map(article => {
                                                return (
                                                    <ListItem key={article._id}>
                                                        <h2>
                                                            <strong>
                                                                {article.snippet}
                                                            </strong>
                                                        </h2>
                                                        <h4>{article.web_url}</h4>
                                                        <SaveBtn topic={article.snippet} url={article.web_url} clickImage={this.clickImage}  />
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    ) : (
                                            <h3>No Results to Display</h3>
                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>

                    <Row>
                        <Col size="md-12">
                            <div class="panel panel-default">
                                <div class="panel-heading">Panel heading without title</div>
                                <div class="panel-body">
                                    {this.state.savedarticles.length ? (
                                        <List>
                                            {this.state.savedarticles.map(article => {
                                                return (
                                                    <ListItem key={article._id}>
                                                        <a href={"/books/" + article._id}>
                                                            <strong>
                                                                {article.topic} by {article.startdate}
                                                            </strong>
                                                        </a>
                                                        <DeleteBtn onClick={() => this.deleteArticle(article._id)} />
                                                    </ListItem>
                                                );
                                            })}
                                        </List>
                                    ) : (
                                            <h3>No Results Saved</h3>
                                        )}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div >
        );
    }
}

export default Articles;