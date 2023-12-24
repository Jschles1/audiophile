export default function CategoryHeader({
  categoryName,
}: {
  categoryName: string;
}) {
  return (
    <h1 className="bg-black text-white uppercase text-center font-bold text-[1.75rem] py-8">
      {categoryName}
    </h1>
  );
}
