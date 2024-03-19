import Accordion from "@/components/accordion/Accordion";
import StayInformed from "./StayInformed";

export default function FrequentlyQuestion() {
  const fAQ = [
    {
      title: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente",
      body: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea voluptatem quia a quia quia sed ipsum dolor sit amet. ",
    },
    {
      title: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente",
      body: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea voluptatem quia a quia quia sed ipsum dolor sit amet. ",
    },
    {
      title: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente",
      body: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea voluptatem quia a quia quia sed ipsum dolor sit amet. ",
    },
    {
      title: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente",
      body: "Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea voluptatem quia a quia quia sed ipsum dolor sit amet. ",
    },
  ];
  return (
    <div className="pt-6 border-t border-odtheme/10">
      <div className="space-y-7">
        <h2 className="text-4xl font-bold">Frequently asked questions</h2>
        <p className="max-w-3xl">
          Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui
          distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea
          voluptatem quia a quia quia sed
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 mt-12 md:grid-cols-2">
        {fAQ.map((item) => (
          <div key={item.title}>
            <Accordion title={item.title} body={item.body} />
          </div>
        ))}
      </div>

      <StayInformed />
    </div>
  );
}
