// @ts-check

const app = window.PromptKit;

app.builderState.load();

app.renderCards();
app.renderBuilder();
app.syncAddButtons();
app.updateNavCounts();
app.renderFilterGroups();
app.applyFilters();
app.renderRecentItems();

if (app.builderState.items.length > 0) {
  app.openBuilder();
}

document.getElementById("sidebar-filter-toggle")?.addEventListener("click", () => {
  const sidebar = document.querySelector(".sidebar");
  const btn = document.getElementById("sidebar-filter-toggle");
  const open = sidebar?.classList.toggle("filters-open");
  btn?.setAttribute("aria-expanded", String(!!open));
});
