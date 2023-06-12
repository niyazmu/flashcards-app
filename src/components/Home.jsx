import Header from "./Header.jsx";
import Main from "./Main.jsx";

function Home({ decks, cards }) {
  return (
    <>
      <div className="container mx-auto">
        <Header decks={decks} />
        <Main decks={decks} cards={cards} />
      </div>
    </>
  );
}

export default Home;
