import PropTypes from 'prop-types';
import { useQuery } from 'react-apollo-hooks';

import allPathsQuery from '../lib/queries/paths-query';
import allPowersQuery from '../lib/queries/powers-query';
import allCardsQuery from '../lib/queries/all-cards-query';
import { convertImportToDeck } from '../lib/import-utils';
import { addCardToDeck } from '../lib/deck-utils';
import ErrorMessage from './error-message.js';

const handleImport = (
  mainDeckInput,
  currentMainDeck,
  updateImportedDeck,
  allCards,
  allPaths,
  allPowers
) => {
  const importedDeck = convertImportToDeck(
    mainDeckInput,
    '',
    allCards,
    allPaths,
    allPowers
  );

  // Upsert the previous cards to deck
  Object.values(currentMainDeck).forEach(card => {
    importedDeck.mainDeck = addCardToDeck(importedDeck.mainDeck, card);
  });

  updateImportedDeck(importedDeck);
};

export default function ImportDeck({
  mainDeckInput,
  currentMainDeck,
  handleInputChange,
  updateImportedDeck
}) {
  const {
    loading: cardsLoading,
    error: cardsError,
    data: cardsData
  } = useQuery(allCardsQuery);
  const { loading: pathLoading, error: pathError, data: pathData } = useQuery(
    allPathsQuery
  );
  const {
    loading: powerLoading,
    error: powerError,
    data: powerData
  } = useQuery(allPowersQuery);

  const error = cardsError || pathError || powerError;
  if (error) return <ErrorMessage message={error.message} />;

  if (cardsLoading || pathLoading || powerLoading) return <div>Loading</div>;

  const cards = cardsData && cardsData.cards && cardsData.cards.nodes;
  const paths = pathData && pathData.paths && pathData.paths.nodes;
  const powers = powerData && powerData.powers && powerData.powers.nodes;

  if (!cards) return <div>No cards in our database</div>;
  if (!paths) return <div>No paths in our database</div>;
  if (!powers) return <div>No powers in our database</div>;

  return (
    <div className="import-deck-container">
      <style jsx>{`
        .import-deck-container {
          margin-bottom: 10px;
        }
        .import-deck-textarea {
          margin-top: 10px;
          margin-bottom: 10px;
          max-width: 100%;
        }
      `}</style>
      <textarea
        className="import-deck-textarea"
        data-cy="importDeckTextarea"
        cols="39"
        rows="2"
        value={mainDeckInput}
        name="mainDeckInput"
        onChange={handleInputChange}
        placeholder="Paste deck from Mythgard..."
      />
      <button
        onClick={() =>
          handleImport(
            mainDeckInput,
            currentMainDeck,
            updateImportedDeck,
            cards,
            paths,
            powers
          )
        }
        data-cy="importDeckButton"
      >
        Import
      </button>
    </div>
  );
}

ImportDeck.defaultProps = {
  mainDeckInput: '',
  handleInputChange: () => {},
  updateImportedDeck: () => {}
};

ImportDeck.propTypes = {
  mainDeckInput: PropTypes.string,
  currentMainDeck: PropTypes.shape({
    quantity: PropTypes.number,
    card: PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string
    })
  }),
  handleInputChange: PropTypes.func,
  updateImportedDeck: PropTypes.func
};
