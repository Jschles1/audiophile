import { Skeleton } from "@/components/ui/skeleton";

export default function ProductListSkeletons() {
  return (
    <div className="max-w-[1110px] flex flex-col px-6 gap-y-[7.5rem] pb-[10.75rem] pt-16 md:pt-[7.5rem] mx-auto">
      <div className="lg:flex lg:flex-row lg:items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-start text-center lg:text-start">
          <div className="rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
            <Skeleton
              data-testid="skeleton"
              className="relative h-[275px] w-[300px] md:w-full mx-auto lg:h-[540px] lg:w-[530px]"
            ></Skeleton>
          </div>
        </div>
        <div className="lg:py-[6.75rem] lg:basis-1/2 lg:pl-[7.813rem]">
          <div className="md:mx-auto md:max-w-[572px] px-6 lg:max-w-none">
            <Skeleton className="py-6 mb-6 text-[1.75rem] md:text-[2.5rem] font-bold leading-[normal] tracking-[0.0625em] uppercase"></Skeleton>
            <Skeleton className="py-6 h-[150px] text-black text-opacity-50 text-[0.938rem] leading-[1.563rem]"></Skeleton>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row-reverse lg:items-center">
        <div className="flex flex-col lg:flex-rowitems-center justify-center lg:justify-between lg:items-start text-center lg:text-start">
          <div className="rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
            <Skeleton className="relative h-[275px] w-[300px] md:w-full mx-auto lg:h-[540px] lg:w-[530px]"></Skeleton>
          </div>
        </div>
        <div className="lg:py-[6.75rem] lg:basis-1/2 lg:pr-[7.813rem]">
          <div className="md:mx-auto md:max-w-[572px] px-6 lg:max-w-none">
            <Skeleton className="py-6 mb-6 text-[1.75rem] md:text-[2.5rem] font-bold leading-[normal] tracking-[0.0625em] uppercase"></Skeleton>
            <Skeleton className="py-6 h-[150px] text-black text-opacity-50 text-[0.938rem] leading-[1.563rem]"></Skeleton>
          </div>
        </div>
      </div>

      <div className="lg:flex lg:flex-row lg:items-center">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between lg:items-start text-center lg:text-start">
          <div className="rounded-lg w-full mb-8 lg:mb-0 lg:h-full lg:basis-1/2">
            <Skeleton className="relative h-[275px] w-[300px] md:w-full mx-auto lg:h-[540px] lg:w-[530px]"></Skeleton>
          </div>
        </div>
        <div className="lg:py-[6.75rem] lg:basis-1/2 lg:pl-[7.813rem]">
          <div className="md:mx-auto md:max-w-[572px] px-6 lg:max-w-none">
            <Skeleton className="py-6 mb-6 text-[1.75rem] md:text-[2.5rem] font-bold leading-[normal] tracking-[0.0625em] uppercase"></Skeleton>
            <Skeleton className="py-6 h-[150px] text-black text-opacity-50 text-[0.938rem] leading-[1.563rem]"></Skeleton>
          </div>
        </div>
      </div>
    </div>
  );
}
