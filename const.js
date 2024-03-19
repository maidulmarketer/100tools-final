// header text
export const headerText = (
  <div>
    {/* desktop */}
    <div className="hidden md:flex flex-col gap-4">
      <p>
        Discover{" "}
        <span className="font-bold text-odtheme/80">Latest AI tools</span>
      </p>
      <p>in various categories</p>
    </div>
    {/* mobile */}
    <p className="block md:hidden">
      Discover <br />
      <span className="font-bold text-odtheme/80">
        Latest AI tools <br />
      </span>
      in various categories
    </p>
  </div>
);

export const categoryHeaderText = (
  <p className="text-xl md:text-[28px]">Category</p>
);

export const categorySubHeader = (
  <p className="text-xs md:text-base">
    Lorem ipsum dolor sit amet. Et nihil amet quo sapiente excepturi qui
    distinctio doloremque non nemo fugiat? Ea velit iste est velit quod ea
    voluptatem quia a quia quia sed
  </p>
);
