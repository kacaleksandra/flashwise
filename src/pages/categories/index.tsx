import Breadcrumb from "../../components/breadcrumb";
import CategoryTabs from "../../components/tabs";

export default function Categories() {
  const categories = [
    {
      label: "język angielski",
      values: ["zwierzęta", "nazwy krajów", "czasowniki nieregularne"],
    },
    {
      label: "język niemiecki",
      values: ["jedzenie", "zwierzęta", "Unit 1"],
    },
    { label: "informatyka", values: ["C++", "protokoły sieciowe"] },
    { label: "medycyna", values: ["części ciała", "nazwy antybiotyków"] },
    { label: "język polski", values: ["części mowy"] },
  ];

  return (
    <>
      <div>
        <Breadcrumb name="Kategorie" />
      </div>
      <div className="mx-1 px-0">
        <CategoryTabs categories={categories} />
      </div>
    </>
  );
}
