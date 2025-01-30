import { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import axios from "axios";


const Books= () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading]= useState(true);

    useEffect(() => {
        axios.get("https://private-universal-cylinder.glitch.me/books")
        .then((response) => {
            setBooks(response.data);
            setLoading(false);
        })
        .catch((error) => {
            console.error("Error fetching books", error);
            setLoading(false);
        });
    }, []);

    if(loading) return <p> Loading...</p>;
    return(
        <div>
            <h2>Book List</h2>
            {books.map((book) => (
                <div key={book.id}>
                    <Link to="/books/${book.id}">
                    <h3>{book.name}</h3>
                     </Link>
                     <p>Category:{book.category}</p>
                     </div>
            ))}
        </div>
    );
};

export default Books;
