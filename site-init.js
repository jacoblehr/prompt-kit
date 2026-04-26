// @ts-check

builderState.load();

renderCards();
renderBuilder();
syncAddButtons();
updateNavCounts();
renderFilterGroups();
applyFilters();
renderRecentItems();

if (builderState.items.length > 0) {
  openBuilder();
}

document.getElementById("sidebar-filter-toggle")?.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  const btn = document.getElementById("sidebar-filter-toggle");
  const open = sidebar?.classList.toggle("filters-open");
  btn?.setAttribute("aria-expanded", String(!!open));
});
