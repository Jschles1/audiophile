export default function CategoryHeader({
  categoryName,
}: {
  categoryName: string;
}) {
  return (
    <h1 className="bg-black text-white uppercase text-center font-bold text-[1.75rem] md:text-[2.5rem] py-8 md:pt-[6.563rem] md:pb-[6.063rem]">
      {categoryName}
    </h1>
  );
}
