import { Skeleton } from "@/components/ui/skeleton";

export default function ProductDetailsSkeletons() {
  return (
    <div className="px-6 mx-auto max-w-[1110px]">
      <div className="md:flex md:flex-row md:items-center">
        <div className="md:p-0 pb-10">
          <Skeleton className="relative h-[327px] md:h-[490px] md:w-[281px] lg:h-[560px] lg:w-[540px]"></Skeleton>
        </div>

        <div className="md:py-[2.813rem] md:pl-[4.375rem] lg:pl-[7.813rem]">
          <div className="flex flex-col gap-y-4 pb-6 md:pb-8 lg:pb-8">
            <Skeleton className="max-w-[55%] h-[30px]"></Skeleton>
            <Skeleton className="max-w-[55%] h-[30px]"></Skeleton>
            <Skeleton className="max-w-[55%] h-[30px]"></Skeleton>
          </div>
          <Skeleton className="h-[150px] mb-6 md:mb-8"></Skeleton>
          <Skeleton className="h-[30px] w-[65px] mb-6 md:mb-8 lg:mb-12"></Skeleton>
          <div className="flex items-center gap-x-4">
            <Skeleton className="h-[40px] w-[95px]"></Skeleton>
            <Skeleton className="h-[40px] w-[160px]"></Skeleton>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row lg:items-start lg:justify-between lg:py-40 lg:gap-x-[7.813rem]">
        <div className="py-[5.5rem] md:py-[7.5rem] lg:p-0 lg:max-w-[635px] lg:flex-1">
          <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6 md:pb-8">
            Features
          </h2>
          <div className="flex flex-col gap-y-4">
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
          </div>
        </div>

        <div className="pb-24 md:pb-[7.5rem] md:flex md:flex-row md:items-start md:justify-between lg:block w-full lg:basis-1/3">
          <h2 className="uppercase text-[1.5rem] md:text-[2rem] font-bold leading-[2.25rem] tracking-[0.0535625em] pb-6 md:basis-3/4">
            In the box
          </h2>
          <div className="flex flex-col gap-y-4 w-full">
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
            <Skeleton className="h-[30px]"></Skeleton>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-6 md:flex-row md:gap-x-6">
        <div className="flex flex-col gap-y-6 md:basis-[30%]">
          <Skeleton className="relative h-[188px] md:w-[300px] lg:h-[310.5px] lg:w-[375px]"></Skeleton>
          <Skeleton className="relative h-[188px] md:w-[300px] lg:h-[310.5px] lg:w-[375px]"></Skeleton>
        </div>

        <Skeleton className="relative h-[400px] lg:h-[645px] md:basis-[60%] lg:basis-auto lg:flex-1"></Skeleton>
      </div>

      <div className="pb-[7.5rem] py-24 md:pb-[10.75rem]">
        <h2 className="uppercase text-[1.5rem] md:text-[2rem] text-center font-bold leading-[2.25rem] tracking-[0.0535625em] pb-10 lg:text-[2rem]">
          You may also like
        </h2>
        <div className="flex flex-col gap-y-14 md:flex-row md:items-center md:gap-x-[0.688rem] lg:gap-x-[1.875rem]">
          <div className="flex flex-col items-center justify-center text-center flex-1">
            <div className="bg-seashell rounded-lg w-full mb-8">
              <div className="bg-seashell rounded-lg md:py-[3.875rem] md:px-[2.313rem]">
                <Skeleton className="relative h-[130px] md:h-[225px] w-full"></Skeleton>
              </div>
            </div>
            <Skeleton className="mb-8 lg:mt-10 h-[30px] mx-auto w-[80%]"></Skeleton>
            <Skeleton className="h-[40px] w-[160px] mx-auto"></Skeleton>
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-1">
            <div className="bg-seashell rounded-lg w-full mb-8">
              <div className="bg-seashell rounded-lg md:py-[3.875rem] md:px-[2.313rem]">
                <Skeleton className="relative h-[130px] md:h-[225px] w-full"></Skeleton>
              </div>
            </div>
            <Skeleton className="mb-8 lg:mt-10 h-[30px] mx-auto w-[80%]"></Skeleton>
            <Skeleton className="h-[40px] w-[160px] mx-auto"></Skeleton>
          </div>

          <div className="flex flex-col items-center justify-center text-center flex-1">
            <div className="bg-seashell rounded-lg w-full mb-8">
              <div className="bg-seashell rounded-lg md:py-[3.875rem] md:px-[2.313rem]">
                <Skeleton className="relative h-[130px] md:h-[225px] w-full"></Skeleton>
              </div>
            </div>
            <Skeleton className="mb-8 lg:mt-10 h-[30px] mx-auto w-[80%]"></Skeleton>
            <Skeleton className="h-[40px] w-[160px] mx-auto"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
