interface PropsSkeleton {
  isActive?: boolean
  repeat?: number
  space?: number
  slim?: boolean
}

export function Skeleton({
  isActive,
  repeat = 1,
  space = 0,
  slim = false,
}: PropsSkeleton) {
  if (!isActive) {
    return null
  }

  const skeletons = []
  for (let i = 0; i < repeat; i += 1) {
    skeletons.push(i)
  }

  let htmls: JSX.Element[] = []

  if (slim) {
    htmls = skeletons.map((sk) => (
      <div key={sk} className="mx-auto mb-4 w-full">
        <div className="flex animate-pulse flex-col">
          <div className="col-span-2 mb-2 h-3 w-full rounded bg-white opacity-60"></div>
          <div className="col-span-1 h-3 w-full rounded bg-white opacity-60"></div>
        </div>
      </div>
    ))

    return htmls
  }

  htmls = skeletons.map((sk) => (
    <div key={sk} className="mx-auto mb-8 w-full">
      <div className="flex animate-pulse space-x-4">
        <div className="h-10 w-10 rounded-md bg-slate-500"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-3 rounded bg-slate-500"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 h-3 rounded bg-slate-500"></div>
              <div className="col-span-1 h-3 rounded bg-slate-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))

  if (space && space > 0) {
    return <div className={`p-${space}`}>{htmls}</div>
  }

  return <>{htmls}</>
}
