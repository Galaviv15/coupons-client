import "./not-found.css"

function NotFound(){



    return(
        <div className="not-found">
            <h1>Oops! Seems You have got to the wrong place...</h1>
            <h2>Please go back <a href="/">Home!</a></h2>
            <img className="error-img" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQB8iY6iWFll0nL3hZZxqvL9Djzg-uDXV3W8Vv9NxS4QTCi5ccdsAL95x_szDBj-wyVaFo&usqp=CAU" alt="" />

        </div>
    );
}


export default NotFound;