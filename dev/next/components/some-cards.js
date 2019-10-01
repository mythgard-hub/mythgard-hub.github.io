import PropTypes from 'prop-types';
import AllCards from './all-cards';
import FilteredCards from './filtered-cards';

export default function SomeCards(props) {
  const { filters, onCardClick } = props;

  let hasFilters = filters;
  if (hasFilters) {
    const {
      factions,
      text,
      rarities,
      manaCosts,
      supertypes,
      strengths,
      defenses
    } = filters;
    hasFilters =
      (factions && factions.length) ||
      (rarities && rarities.length) ||
      (manaCosts && manaCosts.length) ||
      (supertypes && supertypes.length) ||
      (strengths && strengths.length) ||
      (defenses && defenses.length) ||
      text;
  }

  if (!hasFilters) {
    return <AllCards onCardClick={onCardClick} />;
  } else {
    return <FilteredCards filters={filters} onCardClick={onCardClick} />;
  }
}

SomeCards.propTypes = {
  onCardClick: PropTypes.func,
  filters: PropTypes.shape({
    factions: PropTypes.array,
    text: PropTypes.string,
    rarities: PropTypes.array,
    manaCosts: PropTypes.array,
    strengths: PropTypes.array,
    supertypes: PropTypes.array,
    defenses: PropTypes.array
  })
};
