// @ts-check

builderState.load();

renderCards();
renderBuilder();
syncAddButtons();
updateNavCounts();
renderFilterGroups();
applyFilters();

if (builderState.items.length > 0) {
  openBuilder();
}
