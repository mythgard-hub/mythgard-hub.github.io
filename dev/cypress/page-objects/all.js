const pagingTotal = '[data-cy="pagingControlsTotal"]';
const getPagingTotalAsInt = () => {
  return cy.get(pagingTotal).then(el => {
    return el && el.length ? parseInt(el[0].innerText, 10) : 0;
  });
};

export default {
  cardListCard: '[data-cy="cardListCard"]',
  cardList: '[data-cy="cardList"]',
  header: '[data-cy="header"]',
  factionFilter: '[data-cy="factionFilter"]',
  cardSearch: '[data-cy="cardSearch"]',
  cardSelectionItem: '[data-cy="cardSelectionItem"]',
  deckPreview: '[data-cy="deckPreview"]',

  pagingTotal,
  getPagingTotalAsInt,

  // deck builder page
  deckBuilderCollection: '[data-cy="deckBuilderCollection"]',
  deckInProgress: '[data-cy="deckInProgress"]',
  deckCardRow: '[data-cy="deckCardRow"]',
  clearButton: '[data-cy="searchForm_clearButton"]',

  cardSearchText: '[data-cy="cardSearchText"]',
  cardSearchSubmit: '[data-cy="cardSearchSubmit"]',

  superTypePicker: '[data-cy="cardSearch_supertype"]',
  superTypePickerBtn:
    '[data-cy="cardSearch_supertype"] [data-cy="imgFilterBtn"]',
  manaPicker: '[data-cy="cardSearch_manaCost"]',
  strengthPicker: '[data-cy="cardSearch_strength"]',
  defensePicker: '[data-cy="cardSearch_defense"]',
  defensePickerBtn: '[data-cy="cardSearch_defense"] [data-cy="numFilterBtn"]',
  rarityPicker: '[data-cy="cardSearch_rarity"]',
  rarityPickerBtn: '[data-cy="cardSearch_rarity"] [data-cy="imgFilterBtn"]',

  // decks page
  deckFactionsPicker: '[data-cy="deckFactionsCell"] img',
  deckEssencePicker: '[data-cy="deckEssenceCell"]',

  // deck page
  deckName: '[data-cy="deckName"]',

  // slider
  leftSlider: '[data-cy="leftSlider"]',
  rightSlider: '[data-cy="rightSlider"]'
};
