import { Skeleton } from "@/components/ui/skeleton"

export default function AboutLoading() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Skeleton className="h-12 w-64 mx-auto mb-6" />
          <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          <Skeleton className="h-4 w-full max-w-lg mx-auto mt-2" />
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <Skeleton className="h-6 w-24 mb-4" />
            <Skeleton className="h-8 w-full max-w-md mb-6" />
            <div className="space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <Skeleton className="h-10 w-32 mt-6" />
          </div>
          <Skeleton className="h-[400px] w-full rounded-lg" />
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-24 mx-auto mb-4" />
            <Skeleton className="h-8 w-48 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="flex flex-col items-center">
                  <Skeleton className="h-14 w-14 rounded-full mb-4" />
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full mt-1" />
                  <Skeleton className="h-4 w-2/3 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-24 mx-auto mb-4" />
            <Skeleton className="h-8 w-80 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="h-64 w-full" />
                <div className="p-4">
                  <Skeleton className="h-5 w-32 mb-1" />
                  <Skeleton className="h-4 w-24 mb-2" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="h-3 w-full mt-1" />
                  <Skeleton className="h-3 w-3/4 mt-1" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <Skeleton className="h-6 w-24 mx-auto mb-4" />
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-full max-w-xl mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="border rounded-lg p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Skeleton key={j} className="h-4 w-4 rounded-full mr-1" />
                  ))}
                </div>
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-4" />
                <Skeleton className="h-5 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <Skeleton className="h-48 w-full rounded-lg" />
      </div>
    </div>
  )
}
