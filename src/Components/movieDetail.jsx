
import { useParams, Link } from "react-router-dom";
import useFetch from "./useFetch";
import Footer from "./footer";

const MovieDetail = () => {

    let trailerKey = "";
    let genreString = "";
    let picString = "";

    const { id } = useParams();
    const { data: movie, error, isPending } = useFetch(`https://api.themoviedb.org/3/movie/${id}?api_key=b48ee67edfa90490c5c00809b96d895b&language=en-US`)

    const { data: trailer } = useFetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=b48ee67edfa90490c5c00809b96d895b&language=de-DE`)


    movie && (movie.genres.map((genreName) => {
        return (
            genreString += genreName.name + ", "
        )
    }))

    trailer && (
        trailer.results.length > 0 ? trailerKey = trailer.results[0].key : trailerKey = ""
    )

    movie && (
        movie.poster_path === null ? picString = "/img/not_avaible.png" : picString = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    )

    return (
        <div className="movie">

            <header>
                <h1><Link to="/"><b>.</b>MOV</Link></h1>
                <div className="searchbar">
                    {/* <button type="submit"><i className="fa-solid fa-magnifying-glass"></i></button>
                    <input type="text" placeholder='search something here' onKeyPress={(e) => e.key === 'Enter' && navigate('/', { state: "terminator" },)} /> */}
                    {/* <input type="text" placeholder='search something here' onKeyPress={(e) => e.key === 'Enter' && <Link to="/" state={{ from: "test" }}></Link>} /> */}

                </div>
            </header>

            {isPending && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {
                movie && (
                    < main >
                        <section>
                            <article>
                                <h2>{movie.title}</h2>

                                <div className="details" key={movie.id}>

                                    <div className="poster">
                                        <img src={picString} alt="bild" />
                                    </div>

                                    <div className="infos">

                                        <div className="hlDetails">Release Date</div>
                                        <div className="infoDetails">{movie.release_date}</div>

                                        <div className="hlDetails">Genres</div>
                                        <div className="infoDetails">{(genreString.substring(0, genreString.length - 2))}</div>

                                        <div className="hlDetails">Overview</div>
                                        <div className="infoDetails">{movie.overview}</div>

                                        <div className="hlDetails">Average Voting</div>
                                        <div className="infoDetails">{movie.vote_average}</div>

                                        <div className="trailer">
                                            <p>Watch Trailer</p>

                                            <iframe src={`https://www.youtube.com/embed/${trailerKey}`} title=".MOV Videoplayer" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen></iframe>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </main >
                )
            }
            <Footer />
        </div >
    );
}

export default MovieDetail;
