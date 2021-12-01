class Site {
    constructor() {
        this.boards = [];
    }

    addBoard(board) {
        const boardName = board.name;
        const exsitingBoard = this.boards.find((el) => el.name === boardName);
        if (exsitingBoard) throw new Error();
        board.addedToSite = true;
        return this.boards.push(board);
    }

    findBoardByName(boardName) {
        return this.boards.find((board) => board.name === String(boardName));
    }
}

class Board {
    constructor(name) {
        if (name === '' || name === null) throw new Error();
        this.name = name;
        this.articles = [];
        this.addedToSite = false;
    }

    publish(article) {
        if (!this.addedToSite) throw new Error();
        article.id = `${this.name}-${Math.random()}`;
        article.createdDate = new Date().toISOString();
        article.addedToBoard = true;
        this.articles.push(article);
    }

    getAllArticles() {
        return [...this.articles];
    }
}

class Article {
    constructor({ ...args }) {
        if (args['subject'] === '' || args['subject'] === null) throw new Error();
        if (args['content'] === '' || args['content'] === null) throw new Error();
        if (args['author'] === '' || args['author'] === null) throw new Error();
        this.subject = args['subject'];
        this.content = args['content'];
        this.author = args['author'];
        this.comments = [];
        this.addedToBoard = false;
    }

    reply(comment) {
        if (comment.content === '' || comment.content === null) throw new Error();
        if (comment.author === '' || comment.author === null) throw new Error();
        if (!this.addedToBoard) throw new Error();

        comment.createdDate = new Date().toISOString();
        this.comments.push(comment);
    }

    getAllComments() {
        return [...this.comments];
    }
}

class Comment {
    constructor({ content, author }) {
        this.content = content;
        this.author = author;
    }
}

module.exports = {
    Site,
    Board,
    Article,
    Comment,
};
