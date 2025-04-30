import { Skeleton } from "@/components/ui/skeleton"

export function PhotoLoader() {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Skeleton className="aspect-square h-52 rounded-xl" />
      <Skeleton className="aspect-square h-52 rounded-xl" />
      <Skeleton className="aspect-square h-52 rounded-xl" />
      <Skeleton className="aspect-square h-52 rounded-xl" />
    </div>
  )
}
